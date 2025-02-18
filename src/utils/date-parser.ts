export function parseCustomDate(dateString: string) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}T00:00:00`);
}

export function parseCustomDateTime(dateTimeString) {
    const [datePart, timePart] = dateTimeString.split(' ');
    const [day, month, year] = datePart.split('/');

    let hours = '00',
        minutes = '00',
        seconds = '00';

    if (timePart) {
        [hours, minutes, seconds] = timePart.split(':').map((num) => num.padStart(2, '0'));
    }

    return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours}:${minutes}:${seconds}`);
}
