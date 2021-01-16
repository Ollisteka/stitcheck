export async function convertFile(fileData) {
    return fetch('/pattern/convert', {
        body: fileData,
        method: 'POST',
    }).then((resp) => resp.json());
}
