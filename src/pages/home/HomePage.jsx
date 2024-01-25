import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/auth';
import styles from './HomePage.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from '../../components/Button';
import { deletePeople } from '../../services/Peoples';

export const HomePage = () => {
  const { userId } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const cadastrarPessoa = () => {
    navigate('/cadastro');
  };

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/peoples?userId=${userId}`,
      );
      const data = response.data;
      setData(data);
    } catch (error) {
      console.error('Erro ao recuperar dados:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleExcluirPessoa = async (peopleId) => {
    try {
      await deletePeople(userId, peopleId);
      await fetchData();
    } catch (error) {
      console.error('Erro ao excluir pessoa:', error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h1 className="title">Lista de Pessoas</h1>
          <Button type="button" onClick={logout}>
            Sair
          </Button>
        </div>
        <div className={styles.tabelaContainer}>
          <table className={styles.tabela}>
            <thead>
              <tr className={styles.tabelaHeader}>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Nascimento</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className={styles.tabelaItem}>{item.name}</td>
                  <td className={styles.tabelaItem}>{item.lastname}</td>
                  <td className={styles.tabelaItem}>{item.date}</td>
                  <td className={styles.tabelaItem}>{item.email}</td>

                  <td className={styles.tabelaItem}>
                    <button
                      className={styles.buttonDelete}
                      type="button"
                      onClick={() => handleExcluirPessoa(item.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button type="button" onClick={cadastrarPessoa}>
          Cadastrar Pessoa
        </Button>
      </div>
    </>
  );
};
