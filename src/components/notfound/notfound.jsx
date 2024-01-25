import React from 'react';
import styles from './NotFound.module.css'

export const NotFound = () => {
  return (
    <section className={styles.s_hero_not}>
          <div className={`${styles.ajuste} container` }>
        <h1 className='title'>Erro: 404</h1>
        <p className={styles.not}>Página não encontrada</p>
    </div>
    </section>

  );
};
