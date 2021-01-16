import React from 'react';
import { PropTypes } from 'prop-types';

import { Row } from './Row';
import { Cell } from './Cell';
import styles from './PatternPage.module.css';

export const PatternPage = ({ pattern }) => {
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

PatternPage.propTypes = {
    pattern: PropTypes.any.isRequired,
};
