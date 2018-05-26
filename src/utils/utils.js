export const arrayIntoChunks = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0, j = array.length; i < j; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}