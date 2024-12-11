import { DeleteData } from "../Utils/DeleteData";
import { UpdateData } from "../Utils/UpdateData";

const ListButtons = ({ endpoint, data, onDelete }) => {

    const handleEdit = () => {
        console.log("Editar item:", data);
    };

    const handleDelete = async () => {
        await DeleteData(`${endpoint}/${data?.id}`);
        console.log("Excluir item com ID:", data?.id);
        onDelete(data?.id);
    };

    return (
        <div>
            <button onClick={handleEdit}>Editar</button>
            <button onClick={handleDelete}>Excluir</button>
        </div>
    );
};

export default ListButtons;
