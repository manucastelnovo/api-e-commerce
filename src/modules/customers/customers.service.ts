import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parseCustomDate, parseCustomDateTime } from 'src/utils/date-parser';
import { fetchImageAsFile } from 'src/utils/fetch-images';
import { informconfExtractor } from 'src/utils/informconf-extractor';
import { ebanNumberParser } from 'src/utils/number-formatte.utils';
import { Repository } from 'typeorm';

import { FilesService } from '../files/files.service';
import { EbanOperationDto } from './dto/eban-operation.dto';
import { Addresses } from './entities/addresses.entity';
import { Customers } from './entities/customers.entity';
import { EbanCustomerStatus } from './entities/eban-customers-status.entity';
import { OperationCharges } from './entities/operation-charges.entity';
import { OperationComments } from './entities/operation-comments.entity';
import { OperationDocuments } from './entities/operation-documents.entity';
import { OperationDocumentsType } from './entities/operation-documents-type.entity';
import { OperationInformconf } from './entities/operation-informconf.entity';
import { OperationItems } from './entities/operation-items.entity';
import { OperationJobReference } from './entities/operation-job-reference.entity';
import { OperationPersonalReference } from './entities/operation-personal-reference.entity';
import { OperationsResult } from './entities/operations-result.entity';
import { Spouse } from './entities/spouse.entity';
import { CustomersGenderEnum } from './enums/customers-gender.enum';
import { OperationChargeOrigin } from './enums/operation-charge-origin.enum';

@Injectable()
export class CustomersService {
    constructor(
        private readonly filesService: FilesService,
        @InjectRepository(Customers)
        private readonly customersRepository: Repository<Customers>,
        @InjectRepository(OperationCharges)
        private readonly operationChargesRepository: Repository<OperationCharges>,
    ) {}
    logger = new Logger('CustomersService');

    async ebanAddEntry(ebanDto: EbanOperationDto) {
        try {
            const existingOC = await this.operationChargesRepository.findOneBy({ externalId: ebanDto['Nro OC'] });
            if (existingOC) {
                throw new ConflictException('OC ya existente');
            }

            let filesFailed = 0;

            let customer = await this.customersRepository.findOneBy({ dni: parseInt(ebanDto.CI) });

            if (!customer) {
                const newCustomer = new Customers();
                newCustomer.firstName = ebanDto.Nombre;
                newCustomer.lastName = ebanDto.Apellido;
                newCustomer.dni = parseInt(ebanDto.CI);
                newCustomer.ebanExternalId = parseInt(ebanDto['Cod Cli']);
                newCustomer.gender = ebanDto.generalData.generalData.sexo.search('F')
                    ? CustomersGenderEnum.FEMENINO
                    : CustomersGenderEnum.MASCULINO;
                newCustomer.maritalStatus = ebanDto.generalData.generalData.estadoCivil;
                newCustomer.birthDate = parseCustomDate(ebanDto.generalData.generalData.fechaNacimiento);
                newCustomer.phoneNumber = ebanDto.generalData.generalData.celular;
                newCustomer.nationality = ebanDto.generalData.generalData.nacionalidad;
                newCustomer.email = ebanDto.generalData.generalData.email;
                newCustomer.children = parseInt(ebanDto.generalData.dependientesData.hijos);
                customer = await newCustomer.save();
            }

            const newAddress = new Addresses();
            newAddress.departament = ebanDto.generalData.generalData.departamento;
            newAddress.city = ebanDto.generalData.generalData.ciudad;
            newAddress.neighborhood = ebanDto.generalData.generalData.barrio;
            newAddress.address = ebanDto.generalData.generalData.direccion;
            newAddress.reference = ebanDto.generalData.generalData.referenciaDomicilio;
            newAddress.customer = customer;
            await newAddress.save();

            if (ebanDto.generalData.conyugeData.ci && ebanDto.generalData.conyugeData.nombre) {
                const newSpouse = new Spouse();
                newSpouse.fullName = ebanDto.generalData.conyugeData.nombre;
                newSpouse.profession = ebanDto.generalData.conyugeData.profesion;
                newSpouse.jobAddress = ebanDto.generalData.conyugeData.lugarTrabajo;
                newSpouse.phoneNumber = ebanDto.generalData.conyugeData.telefonoLaboral;
                await newSpouse.save();
            }

            const newOperationCharge = new OperationCharges();
            newOperationCharge.externalId = ebanDto['Nro OC'];
            newOperationCharge.origin = OperationChargeOrigin.EBAN;
            newOperationCharge.seller = ebanDto.Vendedor;
            newOperationCharge.warehouse = ebanDto.Sucursal;
            newOperationCharge.assignedUser = ebanDto['Usuario Asignado'];
            newOperationCharge.type = ebanDto.Formalidad;
            newOperationCharge.referenceStatus = ebanDto['Carga Referencias'];
            newOperationCharge.referenceVerification = ebanDto['Referencias Verificadas'];
            newOperationCharge.customerContacted = ebanDto['Contacto Cliente'];
            newOperationCharge.operationStatus = ebanDto['Estado Operación'];
            newOperationCharge.invoiceNumber = ebanDto.NroFactura;
            newOperationCharge.customerCategory = ebanDto['Categoria Cliente'];
            const operationCharge = await newOperationCharge.save();

            const newEbanCustomerStatus = new EbanCustomerStatus();
            newEbanCustomerStatus.ruc = ebanDto.operationStatus.clientData.razonSocial;
            newEbanCustomerStatus.category = ebanDto.operationStatus.clientData.categoria;
            newEbanCustomerStatus.delayDays = parseInt(ebanDto.operationStatus.clientData.diasAtrasoPromedio);
            newEbanCustomerStatus.currentDebt = ebanNumberParser(ebanDto.operationStatus.clientData.saldoActual);
            newEbanCustomerStatus.scoreInformconf = ebanDto.operationStatus.clientData.scoreInformconf;
            newEbanCustomerStatus.delinquentStatus = ebanDto.operationStatus.clientData.estadoMorosidad;
            newEbanCustomerStatus.activity = ebanDto.operationStatus.clientData.actividad;
            newEbanCustomerStatus.familyEarning = ebanNumberParser(ebanDto.operationStatus.clientData.ingresoFamiliar);
            newEbanCustomerStatus.currentCuota = ebanNumberParser(ebanDto.operationStatus.clientData.cuotaVigente);
            newEbanCustomerStatus.externalCuota = ebanNumberParser(
                ebanDto.operationStatus.clientData.cuotaOtrasInstituciones,
            );
            newEbanCustomerStatus.newCuota = ebanNumberParser(ebanDto.operationStatus.clientData.nuevaCuota);
            newEbanCustomerStatus.scoreIndebtedness = parseFloat(
                ebanDto.operationStatus.clientData.nivelEndeudamientoElectroban,
            );
            newEbanCustomerStatus.scoreIndebtednessTotal = parseFloat(
                ebanDto.operationStatus.clientData.nivelEndeudamientoTotal,
            );
            newEbanCustomerStatus.customer = customer;
            newEbanCustomerStatus.operationCharges = operationCharge;
            await newEbanCustomerStatus.save();

            for (const comment of ebanDto.operationStatus.comentarios) {
                const newOperationComment = new OperationComments();
                newOperationComment.type = comment.tipo;
                newOperationComment.comment = comment.comentario;
                newOperationComment.user = comment.usuario;
                newOperationComment.date = parseCustomDateTime(comment.fecha);
                newOperationComment.operationCharge = operationCharge;
                await newOperationComment.save();
            }

            for (const product of ebanDto.operationStatus.productos) {
                if (product.codigo && product.descripcion) {
                    const newOperationProducts = new OperationItems();
                    newOperationProducts.quantity = parseInt(product.cantidad);
                    newOperationProducts.externalItemId = product.codigo;
                    newOperationProducts.name = product.descripcion;
                    newOperationProducts.unitPrice = ebanNumberParser(product.precioUnitario);
                    newOperationProducts.cuotaPrice = parseInt(product.nroCuotas);
                    newOperationProducts.totalPrice = ebanNumberParser(product.total);
                    newOperationProducts.operationCharge = operationCharge;
                    await newOperationProducts.save();
                }
            }

            for (const jobReference of ebanDto.personalReference.laboralReferences) {
                const newJobReference = new OperationJobReference();
                newJobReference.profession = jobReference.Profesion;
                newJobReference.activity = jobReference.Actividad;
                newJobReference.employer = jobReference.Empleador;
                newJobReference.phoneNumber = jobReference['Tel.'];
                newJobReference.timeNumber = parseInt(jobReference['Antiguedad (Cant.)']);
                newJobReference.timeType = jobReference['Antiguedad (Desc.)'];
                newJobReference.operationCharge = operationCharge;
                await newJobReference.save();
            }

            for (const personalReference of ebanDto.personalReference.personalReferences) {
                const newPersonalReference = new OperationPersonalReference();
                newPersonalReference.name = personalReference.Nombre;
                newPersonalReference.phoneNumber = personalReference['Tel.'];
                newPersonalReference.relation = personalReference['Relación'];
                newPersonalReference.operationCharge = operationCharge;
                await newPersonalReference.save();
            }

            const newOcResult = new OperationsResult();
            newOcResult.result = ebanDto.operationStatus.resultadoAprobacion.resultado;
            newOcResult.rejectReason = ebanDto.operationStatus.resultadoAprobacion.tipoDesistidoRechazado;
            newOcResult.date = parseCustomDateTime(ebanDto.operationStatus.resultadoAprobacion.fecha);
            newOcResult.user = ebanDto.operationStatus.resultadoAprobacion.usuario;
            const ocResult = await newOcResult.save();

            const newOcInformconf = new OperationInformconf();
            const informconfDataExtracted = informconfExtractor(ebanDto.Informconf.informconfData);
            newOcInformconf.date = parseCustomDateTime(informconfDataExtracted.verificadoEl);
            newOcInformconf.verificationTime = parseInt(informconfDataExtracted.tiempoVerificacion);
            newOcInformconf.qualification = informconfDataExtracted.calificacion;
            const ocInformconf = await newOcInformconf.save();

            operationCharge.operationResult = ocResult;
            operationCharge.inforconfData = ocInformconf;
            await operationCharge.save();

            for (const position of Object.keys(ebanDto.documents)) {
                if (ebanDto.documents[position].children.length > 0) {
                    const newDocumentType = new OperationDocumentsType();
                    newDocumentType.documentType = ebanDto.documents[position].name;
                    newDocumentType.operationCharge = operationCharge;
                    const documentType = await newDocumentType.save();

                    for (const childItem of ebanDto.documents[position].children) {
                        try {
                            const newDocumentChild = new OperationDocuments();
                            newDocumentChild.name = childItem.name;
                            const donwloadedFile = await fetchImageAsFile(childItem.href);
                            const file = await this.filesService.uploadImage(donwloadedFile, 'eban');
                            newDocumentChild.file = file;
                            newDocumentChild.operationDocumentType = documentType;
                            await newDocumentChild.save();
                        } catch (error) {
                            this.logger.error(
                                `Error en descarga de archivo en EBAN #${ebanDto['Nro OC']} - ${childItem.href}`,
                            );

                            filesFailed++;
                            continue;
                        }
                    }
                }
            }

            const result = await this.operationChargesRepository.findOneBy({ id: operationCharge.id });

            return {
                failedFiles: filesFailed > 0,
                failedFilesTotal: filesFailed,
                result,
            };
        } catch (error) {
            this.logger.error(error);

            throw error;
        }
    }
}
