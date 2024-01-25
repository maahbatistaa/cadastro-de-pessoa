import { instance } from './Instance';

async function registerPeople(userId, data) {
  try {
    const response = await instance.post('/peoples', {
      userId,
      ...data,
    });

    return response.data;
  } catch (error) {
    console.error('Erro no registro:', error.message);
    throw error; 
  }
}

async function deletePeople(userId, id) {
  try {
    
    const response = await instance.delete(`/peoples/${id}`, {
      params: {
        userId,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro na exclusão da pessoa:', error.message);
    throw error; 
  }
}

export { registerPeople, deletePeople };
