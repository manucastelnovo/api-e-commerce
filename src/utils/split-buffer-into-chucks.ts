export function splitBufferIntoChunks(buffer: Buffer, chunkSize: number): Buffer[] {
    const chunks = [];
    for (let start = 0; start < buffer.length; start += chunkSize) {
        const end = Math.min(start + chunkSize, buffer.length);
        chunks.push(buffer.slice(start, end));
    }
    return chunks;
}
