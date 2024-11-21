import Api from "./Api";

export const GetData = async (endpoint, setter) => {
    try {
        const response = await Api.get(endpoint);
        setter(response.data);
    } catch (error) {
        console.error('Erro na requisição:', error.message);
    }
};