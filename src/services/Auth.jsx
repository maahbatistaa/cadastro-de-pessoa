import { instance } from './Instance';

async function login(email, password) {
  try {
    const response = await instance.get(`/users?email=${email}`);

    if (response.data.lenght === 0) {
      throw new Error('Usuário não encontrado');
    }

    const user = response.data[0];

    if (user.password !== password) {
      throw new Error('Senha incorreta');
    }

    return user;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function register(username, telefone, email, password) {
  try {
    const userExistsResponse = await instance.get(`/users?email=${email}`);

    if (userExistsResponse.data.length > 0) {
      throw new Error('Usuário já cadastrado');
    }

    const response = await instance.post('/users', {
      username,
      telefone,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error('Erro no registro:', error.message);
    throw error; 
  }
}

export const authService = {
  login,
  register,
  instance,
};
