import Api from "./Api";

export const UpdateData = async (endpoint, setter) => {
    try {
        const response = await Api.put(endpoint);
        console.log(response.data);
    } catch (error) {
        console.error('Erro na requisição:', error.message);
    }
};