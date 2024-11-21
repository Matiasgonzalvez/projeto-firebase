import {useEffect, useMemo, useState} from "react";
import {GetData} from "../Utils/GetData";
import TableComponent from "../Components/TableComponent";
import ListButtons from "../Components/ListButtons";

const ProdutosPage = () => {
    const endpoint = 'produtos';
    const [produtos, setProdutos] = useState([]);
    const [deleteTrigger, setDeleteTrigger] = useState(false);

    useEffect(() => {
        GetData(endpoint, setProdutos);
    }, [deleteTrigger]);

    const handleDelete = (id) => {
        setProdutos(prevProdutos => prevProdutos.filter(produto => produto.id !== id));

        setDeleteTrigger(prev => !prev);  // Alterna o valor para disparar o useEffect
    };

    const columns = useMemo(
        () => [
            {
                Header: "Nome",
                accessor: "Nome",
            },
            {
                Header: "Preço",
                accessor: "Preco",
                Cell: ({value}) => `R$ ${parseFloat(value).toFixed(2)}`
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
            <h1>Produtos</h1>
            <TableComponent columns={columns} data={produtos}/>
        </div>
    );
};

export default ProdutosPage;
