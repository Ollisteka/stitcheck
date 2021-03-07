import { CellDto } from './serverTypes';

export async function convertFile(fileData: FormData): Promise<Array<CellDto[]>> {
    return fetch('/pattern/convert', {
        body: fileData,
        method: 'POST',
    }).then((resp) => resp.json());
}
