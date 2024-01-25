import React from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import styles from './RegisterPage.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const RegisterPage = () => {
  const { registerUser } = useAuth();

  const schema = yup.object().shape({
    username: yup.string().required('Username é obrigatório'),
    telefone: yup.string().required('Telefone é obrigatório'),
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
      await registerUser(
        data.username,
        data.telefone,
        data.email,
        data.password,
      );
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  };

  return (
    <section className={styles.content}>
      <div className="container">
        <div className={styles.cadastro}>
          <div>
            <h1 className="title">Cadastrar Usuário</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.form}>
                <div>
                  <Input
                    label="Username"
                    type="text"
                    {...register('username')}
                  />
                  {errors.username && (
                    <p className="error">{errors.username.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    label="Telefone"
                    type="tel"
                    {...register('telefone')}
                  />
                  {errors.telefone && (
                    <p className="error">{errors.telefone.message}</p>
                  )}
                </div>
                <div>
                  <Input label="Email" type="email" {...register('email')} />
                  {errors.email && (
                    <p className="error">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    label="Senha"
                    type="password"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="error">{errors.password.message}</p>
                  )}
                </div>

              </div>
              <div className={styles.btn}>
                <Button type="submit">Cadastrar</Button>
              </div>
              
            </form>
          </div>
          <div className={styles.login}>
          <p className={styles.text}>
            Já possui conta?{' '}
            <Link className={styles.link} to="/login">
              Login
            </Link>
          </p>
        </div>
        </div>
      </div>
    </section>
  );
};
