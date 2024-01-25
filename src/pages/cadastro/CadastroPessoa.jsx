import React from 'react';
import styles from './CadastroPessoa.module.css';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuth } from '../../providers/auth';
import { useNavigate } from 'react-router-dom';
import { registerPeople } from '../../services/Peoples';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const CadastroPessoa = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    lastname: yup.string().required('Sobrenome é obrigatório'),
    date: yup.string().required('Data de nascimento é obrigatório'),
    email: yup
      .string()
      .email('Digite um e-mail válido')
      .required('E-mail é obrigatório'),
    cpf: yup
      .string()
      .min(11, 'Número insuficiente de caracteres')
      .required('CPF é obrigatório'),
    rg: yup
      .string()
      .min(7, 'Número insuficiente de caracteres')
      .required('RG é obrigatório'),
    address: yup.string().required('Logradouro é obrigatório'),
    number: yup.string().required('Número é obrigatório'),
    cep: yup.string().required('CEP é obrigatório'),
    city: yup.string().required('Cidade é obrigatório'),
    state: yup.string().required('Estado é obrigatório'),
    nameContact: yup.string().required('Nome é obrigatório'),
    telContact: yup.string().required('Telefone é obrigatório'),
    emailContact: yup.string().required('E-mail é obrigatório'),
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
      await registerPeople(userId, data);
      navigate('/');
    } catch (error) {
      console.log('Erro no cadastro:', error);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <section className={styles.content}>
      <div className="container">
        <div className="header">
          <h1 className="title">Cadastrar pessoa Física</h1>
          <Button type="button" onClick={handleBack}>
            Voltar
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.subtitle}>Dados Pessoais</h2>
          <div className={styles.peopleData}>
            <div>
              <Input
                label="Nome"
                type="text"
                placeholder="Nome"
                {...register('name')}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>
            <div>
              <Input
                label="Sobrenome"
                type="text"
                placeholder="Sobrenome"
                {...register('lastname')}
              />
              {errors.lastname && (
                <p className="error">{errors.lastname.message}</p>
              )}
            </div>
            <div>
              <Input
                label="Data de Nascimento"
                type="date"
                {...register('date')}
              />
              {errors.date && <p className="error">{errors.date.message}</p>}
            </div>
            <div>
              <Input
                label="E-mail"
                type="email"
                placeholder="E-mail"
                {...register('email')}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div>
              <Input
                label="CPF"
                type="text"
                placeholder="CPF"
                {...register('cpf')}
              />
              {errors.cpf && <p className="error">{errors.cpf.message}</p>}
            </div>
            <div>
              <Input
                label="RG"
                type="text"
                placeholder="RG"
                {...register('rg')}
              />
              {errors.rg && <p className="error">{errors.rg.message}</p>}
            </div>
          </div>
          <hr className={styles.divider} />
          <h2 className={styles.subtitle}>Endereço</h2>
          <div className={styles.dadosResidencia}>
            <div>
              <Input
                label="Logradouro"
                type="text"
                placeholder="Rua Sem Nome"
                {...register('address')}
              />
              {errors.address && (
                <p className="error">{errors.address.message}</p>
              )}
            </div>
            <div>
              <Input
                label="Número"
                type="text"
                placeholder="99999"
                {...register('number')}
              />
              {errors.number && (
                <p className="error">{errors.number.message}</p>
              )}
            </div>
            <div>
              <Input
                label="CEP"
                type="text"
                placeholder="99999-99"
                {...register('cep')}
              />
              {errors.cep && <p className="error">{errors.cep.message}</p>}
            </div>
            <Input
              label="Complemento"
              type="text"
              name="complement"
              placeholder="Casa 9999"
            />
            <div>
              <Input
                label="Cidade"
                type="text"
                placeholder="Cidade"
                {...register('city')}
              />
              {errors.city && <p className="error">{errors.city.message}</p>}
            </div>
            <div>
              <Input
                label="Estado"
                type="text"
                placeholder="Estado"
                {...register('state')}
              />
              {errors.state && <p className="error">{errors.state.message}</p>}
            </div>
          </div>
          <hr className={styles.divider} />
          <h2 className={styles.subtitle}>Contato</h2>
          <div className={styles.contact}>
            <div>
              <Input
                label="Nome"
                type="text"
                placeholder="Nome contato"
                {...register('nameContact')}
              />
              {errors.nameContact && (
                <p className="error">{errors.nameContact.message}</p>
              )}
            </div>
            <div>
              <Input
                label="Contato"
                type="text"
                placeholder="Telefone"
                {...register('telContact')}
              />
              {errors.telContact && (
                <p className="error">{errors.telContact.message}</p>
              )}
            </div>
            <div>
              <Input
                label="E-mail"
                type="select"
                placeholder="E-mail"
                {...register('emailContact')}
              />
              {errors.emailContact && (
                <p className="error">{errors.emailContact.message}</p>
              )}
            </div>
          </div>
          <hr className={styles.divider} />
          <Button type="submit">Salvar</Button>
        </form>
      </div>
    </section>
  );
};
