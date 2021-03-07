import React, { FC, useCallback, useState } from 'react';
import { convertFile } from '../api';

import styles from './SelectFile.module.css';
import { CellDto } from '../serverTypes';

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
    return (
        <>
            <section className={styles.instructions}>
                <header>What to do:</header>
                <ol>
                    <li>Convert PDF file with your pattern to .xlsx format</li>
                    <li>Open it in Excel-like program</li>
                    <li>
                        Remove all extra symbols like rows and columns numbers
                    </li>
                    <li>Save</li>
                    <li>Upload the result on this page</li>
                    <li>Enjoy your pattern in an interactive form :)</li>
                </ol>
            </section>
            <form encType={'multipart/form-data'} onSubmit={onSubmit}>
                <label htmlFor={'excelFileInput'} className={styles.label}>
                    Select Excel file with your pattern:
                </label>
                <br />
                <input
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
                />

                <br />
                <button
                    className={styles.convertButton}
                    type={'submit'}
                    disabled={
                        formState === State.Loading || formState === State.None
                    }
                >
                    Convert!
                </button>
                {formState === State.Error && (
                    <div className={styles.error}>
                        Something went wrong, please, try again
                    </div>
                )}
            </form>
        </>
    );
};
