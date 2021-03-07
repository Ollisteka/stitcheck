import React, { FC } from 'react';

import styles from './Row.module.css';

export const Row: FC = ({ children }) => <tr className={styles.row}>{children}</tr>;
