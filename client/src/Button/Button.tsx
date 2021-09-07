import React, { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';

import styles from './Button.module.scss';

export type ButtonProps = {
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    className?: string;
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({ className, loading, disabled, onClick, children }) => {
    return (
        <button
            className={cx(styles.button, className, { [styles.loading]: loading })}
            onClick={onClick}
            disabled={disabled || loading}>
            {children}
        </button>
    );
};
