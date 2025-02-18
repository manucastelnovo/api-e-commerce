export function informconfExtractor(informconfData: string) {
    const regex = /Verificado el: (.*?) Tiempo de Verificacion: (.*?), usuario: (.*?) Calificacion: (.*)/;
    const match = informconfData.match(regex);

    if (match) {
        return {
            verificadoEl: match[1],
            tiempoVerificacion: match[2],
            usuario: match[3],
            calificacion: match[4],
        };
    }

    return null;
}
