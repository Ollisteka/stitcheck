import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Cell.module.css';

export const Cell = ({ cell }) => {
    if (!cell.text) {
        return <td className={cx(styles.cell, styles.empty)} />;
    }

    return (
        <td className={styles.cell}>
            <button
                className={cx(styles.button, { [styles.pressable]: cell.text })}
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
