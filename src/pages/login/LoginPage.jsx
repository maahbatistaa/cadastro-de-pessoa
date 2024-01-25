import React from 'react';
import styles from './LoginPage.module.css';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const LoginPage = () => {
  const { login } = useAuth();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Digite um e-mail válido')
      .required('E-mail é obrigatório'),
    password: yup
      .string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .required('Senha é obrigatória'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <section className="shero">
      <div className={`${styles.box}`}>
        <div className={styles.right}>
          <div className={styles.principal}>
            <h1 className="title">Login de Usuário</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <Input label="Email" type="email" {...register('email')} />
              {errors.email && <p className="error">{errors.email.message}</p>}
              <Input label="Senha" type="password" {...register('password')} />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
              <Button type="submit">Login</Button>
            </form>
          </div>
          <div className={styles.cadastrar}>
            <p className={styles.text}>
              Ainda não possui conta?{' '}
              <Link className={styles.link} to="/register">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
