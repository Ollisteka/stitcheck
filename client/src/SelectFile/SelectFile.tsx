import React, { FC, useCallback, useRef, useState } from 'react';
import { convertFile } from '../api';

import styles from './SelectFile.module.css';
import { CellDto } from '../serverTypes';
import { Button } from '../Button';

enum State {
    None,
    FileAdded,
    Loading,
    FileUploaded,
    Error,
}

interface SelectFileProps {
    onFileUpload: (data: Array<CellDto[]>) => void;
}

export const SelectFile: FC<SelectFileProps> = ({ onFileUpload }) => {
    const [file, setFile] = useState<File | null>(null);
    const [formState, setFormState] = useState<State>(State.None);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const onUploadButtonClick = useCallback(() => fileInputRef.current?.click?.(), []);

    const onSubmit = useCallback(
        async (event) => {
            event.preventDefault();

            if (!file) {
                setFormState(State.Error);
                return;
            }

            setFormState(State.Loading);
            const formData = new FormData();
            formData.append('excel', file);

            try {
                onFileUpload(await convertFile(formData));
            } catch (error) {
                setFormState(State.Error);
            }
        },
        [file, onFileUpload]
    );

    const fileName = file?.name;

    return (
        <section className={styles.container}>
            <section className={styles.instructions}>
                <header><h2>Prerequisites</h2></header>
                <ol>
                    <li>Convert PDF file with your pattern to&nbsp;.xlsx format</li>
                    <li>Open it in Excel-like program</li>
                    <li>
                        Remove all extra symbols, e.g. rows and columns numbers
                    </li>
                </ol>
            </section>
            <form encType={'multipart/form-data'} onSubmit={onSubmit}>
                <Button className={styles.uploadButton} onClick={onUploadButtonClick} disabled={formState === State.Loading}>
                    Choose XLSX
                </Button>
                {fileName && <div className={styles.fileName}>{fileName}</div>}
                <input
                    ref={fileInputRef}
                    id={'excelFileInput'}
                    name={'excel'}
                    type={'file'}
                    accept={'.xlsx'}
                    multiple={false}
                    disabled={formState === State.Loading}
                    onChange={(event) => {
                        const files = event.target.files;
                        if (files) {
                            setFile(files[0]);
                            setFormState(State.FileAdded);
                        }
                    }}
                    required
                    style={{ display: 'none' }}
                />
                <br/>
                <Button
                    className={styles.convertButton}
                    type={'submit'}
                    disabled={
                        formState === State.Loading || formState === State.None
                    }
                    loading={formState === State.Loading}
                >
                    Convert
                </Button>
                {formState === State.Error && (
                    <div className={styles.error}>
                        Something went wrong, please, try again
                    </div>
                )}
            </form>
        </section>
    );
};
