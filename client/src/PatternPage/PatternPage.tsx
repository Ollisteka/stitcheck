import React, { FC } from 'react';

import { Row } from './Row';
import { Cell } from './Cell';
import styles from './PatternPage.module.css';
import { CellDto } from '../serverTypes';

interface PatternPageProps {
    pattern: Array<CellDto[]>;
}

export const PatternPage: FC<PatternPageProps> = ({ pattern }) => {
    return (
        <>
            <div className={styles.warning}>
                <em>
                    Please, note, that the cells you&apos;ll cross out here, are
                    not saved! Will do this in a future version :)
                </em>
            </div>
            <table>
                <tbody>
                    {pattern.map((row, rowIdx) => (
                        <Row key={rowIdx}>
                            {row.map((cell, columnIdx) => (
                                <Cell
                                    cell={cell}
                                    key={`${rowIdx}-${columnIdx}`}
                                />
                            ))}
                        </Row>
                    ))}
                </tbody>
            </table>
        </>
    );
};
