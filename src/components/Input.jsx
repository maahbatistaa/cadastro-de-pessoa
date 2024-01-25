import React, { forwardRef } from 'react';
import styles from './Input.module.css';

export const Input = forwardRef(({ label, type, name, ...rest }, ref) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        ref={ref}
        {...rest}
        className={styles.input}
      />
    </div>
  );
});
