import Api from "./Api";

export const DeleteData = async (endpoint,id) => {
    try {
        const response = await Api.delete(endpoint,id);
        console.log(response);
    } catch (error) {
        console.error('Erro na requisição:', error.message);
    }
};