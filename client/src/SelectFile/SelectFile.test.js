import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as api from '../api';
import { SelectFile } from './SelectFile';
import userEvent from '@testing-library/user-event';

const convertFileMock = jest.fn().mockResolvedValue();
// eslint-disable-next-line no-import-assign
api.convertFile = convertFileMock;

const validFile = new File(['123'], 'file.xlsx', {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
});

const onFileUploadMock = jest.fn();

const getConvertButton = () => screen.getByRole('button', { name: /Convert/ });
const getFileInput = (container) =>
    container.querySelector('input[type="file"]');

function renderAndUploadFile(file) {
    const { container } = render(
        <SelectFile onFileUpload={onFileUploadMock} />
    );
    userEvent.upload(getFileInput(container), file);

    return { container };
}

describe('SelectFile component', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('can not submit form when no file uploaded', () => {
        render(<SelectFile onFileUpload={onFileUploadMock} />);

        expect(getConvertButton()).toBeDisabled();
    });

    test('disables submit and input after submit', () => {
        const { container } = renderAndUploadFile(validFile);

        userEvent.click(getConvertButton());

        expect(getFileInput(container)).toBeDisabled();
        expect(getConvertButton()).toBeDisabled();
    });

    test('can submit again on error', async () => {
        const { container } = renderAndUploadFile(validFile);
        convertFileMock.mockRejectedValue('error!');

        userEvent.click(getConvertButton());

        await waitFor(() => expect(getConvertButton()).toBeEnabled());
        expect(getFileInput(container)).toBeEnabled();
    });
});
