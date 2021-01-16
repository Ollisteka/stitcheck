import React from 'react';
import PropTypes from 'prop-types';

import styles from './Row.module.css';

export const Row = ({ children }) => <tr className={styles.row}>{children}</tr>;

Row.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};
