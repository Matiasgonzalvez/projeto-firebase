import {useEffect, useState, useMemo} from "react";
import {GetData} from "../Utils/GetData";
import TableComponent from "../Components/TableComponent";
import ListButtons from "../Components/ListButtons";

const ClientesPage = () => {
    const endpoint = 'clientes';
    const [clientes, setClientes] = useState([]);
    const [deleteTrigger, setDeleteTrigger] = useState(false);

    useEffect(() => {
        GetData(endpoint, setClientes);
    }, []);

    const handleDelete = (id) => {
        setClientes(prevProdutos => prevProdutos.filter(produto => produto.id !== id));

        setDeleteTrigger(prev => !prev);  // Alterna o valor para disparar o useEffect
    };


    const columns = useMemo(
        () => [
            {
                Header: "CPF",
                accessor: "cpf",
            },
            {
                Header: "Nome",
                accessor: "nome",
            },
            {
                Header: "Ações",
                Cell: ({row}) => (
                    <ListButtons endpoint={endpoint} data={row.original} onDelete={handleDelete}/>
                )
            }
        ],
        []
    );

    return (
        <div>
            <h1>Clientes</h1>
            <TableComponent columns={columns} data={clientes}/>
        </div>
    );
};

export default ClientesPage;
