import React from 'react';
import { Link } from 'react-router-dom';
import LogoHeader from '../assets/logoRegistro1.png';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/">
        <img
          className={styles.logo}
          src={LogoHeader}
          alt="Logo 10 anos da Resoluti"
        />
      </Link>
    </div>
  );
};
