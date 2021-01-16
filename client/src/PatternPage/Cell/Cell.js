import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Cell.module.css';

const CellState = {
    Empty: 0,
    HalfCrossed: 1,
    FullyCrossed: 2,
};

function getCrossStyle(cellState) {
    switch (cellState) {
        case CellState.HalfCrossed:
            return styles.halfCrossed;
        case CellState.FullyCrossed:
            return styles.fullyCrossed;
        default:
            return '';
    }
}

export const Cell = ({ cell }) => {
    const [cellState, setCellState] = useState(CellState.Empty);

    if (!cell.text) {
        return <td className={cx(styles.cell, styles.empty)} />;
    }

    return (
        <td className={styles.cell}>
            <button
                className={cx(styles.button, getCrossStyle(cellState), {
                    [styles.pressable]: cell.text,
                })}
                onClick={() => setCellState((cellState + 1) % 3)}
                style={{
                    backgroundColor: cell.color,
                }}
            >
                {cell.text}
            </button>
        </td>
    );
};

Cell.propTypes = {
    cell: PropTypes.shape({ color: PropTypes.string, text: PropTypes.string }),
};
