import Api from "./Api";

export const PostData = async (endpoint, data) => {
    try {
        const response = await Api.post(endpoint, data);
        console.log('Resposta do POST:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro na requisição POST:', error.message);
        throw error;
    }
};
