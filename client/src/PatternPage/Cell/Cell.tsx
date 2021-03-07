import React, { FC, useState } from 'react';
import cx from 'classnames';

import styles from './Cell.module.css';
import { CellDto } from '../../serverTypes';

enum CellState {
    Empty,
    HalfCrossed,
    FullyCrossed,
}

function getCrossStyle(cellState: CellState) {
    switch (cellState) {
        case CellState.HalfCrossed:
            return styles.halfCrossed;
        case CellState.FullyCrossed:
            return styles.fullyCrossed;
        default:
            return '';
    }
}

interface CellProps {
    cell: CellDto;
}

export const Cell: FC<CellProps> = ({ cell }) => {
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
