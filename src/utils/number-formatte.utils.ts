export const numberFormat = (value: number) => {
    return `Gs. ${new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(value)}`;
};

export const ebanNumberParser = (value: string) => {
    return parseInt(value.replace('.', ''));
};
