interface OperationData {
    selectedPaymentOption: string;
    articles: {
        Cantidad: string;
        'Cod Articulo': string;
        Articulo: string;
        'Nro. Cuotas': string;
        EI: string;
        PU: string;
        MontoCuota: string;
        MontoTotal: string;
    }[];
}

interface PersonalReference {
    personalReferences: {
        Cedula: string;
        Nombre: string;
        'Tel.': string;
        Relación: string;
        Usuario: string;
        Fecha: string;
    }[];
    laboralReferences: {
        Profesion: string;
        Actividad: string;
        Empleador: string;
        'Tel.': string;
        'Antiguedad (Cant.)': string;
        'Antiguedad (Desc.)': string;
        Cargo: string;
        Jefe: string;
        Usuario: string;
        Fecha: string;
    }[];
}

interface GeneralData {
    generalData: {
        tieneCIP: boolean;
        sexo: string;
        estadoCivil: string;
        nacionalidad: string;
        fechaNacimiento: string;
        telefono: string;
        celular: string;
        email: string;
        direccion: string;
        referenciaDomicilio: string;
        departamento: string;
        ciudad: string;
        barrio: string;
        lugarCobranzaDomicilio: string;
        usuarioDireccion: string;
        fechaDireccion: string;
    };
    laboralData: {
        telefonoLaboral: string;
        celularLaboral: string;
        direccionLaboral: string;
        referenciaLaboral: string;
        departamentoLaboral: string;
        ciudadLaboral: string;
        barrioLaboral: string;
        lugarCobranzaLaboral: string;
    };
    conyugeData: {
        ci: string;
        nombre: string;
        profesion: string;
        lugarTrabajo: string;
        telefonoLaboral: string;
        nombreJefe: string;
    };
    dependientesData: {
        hijos: string;
    };
    clienteData: {
        esClienteElectroban: string;
    };
}

interface OperationStatus {
    clientData: {
        razonSocial: string;
        categoria: string;
        diasAtrasoPromedio: string;
        saldoActual: string;
        scoreInformconf: string;
        estadoMorosidad: string;
        politicaCredito: string;
        codigoCliente: string;
        actividad: string;
        ci: string;
        telefono: string;
        direccion: string;
        sucursal: string;
        ingresoFamiliar: string;
        edad: string;
        cuotaVigente: string;
        antiguedad: string;
        cuotaOtrasInstituciones: string;
        vendedor: string;
        nuevaCuota: string;
        nivelEndeudamientoElectroban: string;
        nivelEndeudamientoTotal: string;
        montoComprado: string;
    };
    productos: {
        codigo: string;
        descripcion: string;
        entrega: string;
        nroCuotas: string;
        cantidad: string;
        precioUnitario: string;
        total: string;
    }[];
    comentarios: {
        tipo: string;
        comentario: string;
        usuario: string;
        fecha: string;
    }[];
    resultadoAprobacion: {
        resultado: string;
        tipoDesistidoRechazado: string;
        fecha: string;
        usuario: string;
    };
}

interface DocumentChild {
    name: string;
    id: string;
    href: string;
}

interface DocumentItem {
    name: string;
    children: DocumentChild[];
}

interface Documents {
    [key: string]: DocumentItem;
}

export interface EbanOperationDto {
    'Nro OC': string;
    'Cod Cli': string;
    CI: string;
    Nombre: string;
    Apellido: string;
    Vendedor: string;
    Sucursal: string;
    'Usuario Asignado': string;
    'Total Operacion': string;
    'Canal Venta': string;
    Formalidad: string;
    Informconf: {
        informconfData: string;
    };
    'Carga Referencias': string;
    'Referencias Verificadas': string;
    'Contacto Cliente': string;
    'Solicitud Credito': string;
    'Documentos Axentria': string;
    'Estado Operación': string;
    NroFactura: string;
    'Entrega Mercadería': string;
    'Regla Credito': string;
    'Agregar Codeudor': string;
    'Cambiar Tipo Operacion': string;
    'Categoria Cliente': string;
    'Score Informconf': string;
    ProcesoAnulacionFactura: string;
    ConfirmacionAnulacionFactura: string;
    Imprimir: string;
    Consolidacion: string;
    operationData: OperationData;
    personalReference: PersonalReference;
    generalData: GeneralData;
    operationStatus: OperationStatus;
    documents: Documents;
}
