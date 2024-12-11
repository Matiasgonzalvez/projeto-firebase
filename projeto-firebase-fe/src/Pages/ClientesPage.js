import { useEffect, useState, useMemo } from "react";
import { GetData } from "../Utils/GetData";
import TableComponent from "../Components/TableComponent";
import ListButtons from "../Components/ListButtons";
import './Styles/ClientesPage.css';

const ClientesPage = () => {
    const endpoint = 'clientes';
    const [clientes, setClientes] = useState([]);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [showForm, setShowForm] = useState(false); // Controle do modal de adição
    const [nomeCliente, setNomeCliente] = useState(""); // Estado para nome do cliente
    const [cpf, setCpf] = useState(""); // Estado para CPF do cliente

    // Carrega os dados dos clientes
    useEffect(() => {
        GetData(endpoint, setClientes);
    }, [deleteTrigger]);

    const handleDelete = async (id) => {

        console.log('ID do cliente a ser excluído:', id);
        try {
            // Exclui o cliente localmente
            setClientes(prevClientes => prevClientes.filter(cliente => cliente.id !== id));
            // Excluir do backend (se necessário)
            // await deleteClient(endpoint, id);
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
        }
    };

    const handleAddCliente = async () => {
        if (!nomeCliente || !cpf) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
    
        try {
            console.log('Dados enviados:', { nome_cliente: nomeCliente, cpf });
    
            const response = await fetch('http://localhost:8080/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome_cliente: nomeCliente, cpf }),
            });
    
            console.log('Resposta recebida, status:', response.status);
    
            if (response.ok) {
                const newCliente = await response.json();
                console.log('Cliente criado com sucesso:', newCliente);
                setClientes(prevClientes => [...prevClientes, newCliente]);
                setShowForm(false);
                setNomeCliente("");
                setCpf("");
            } else {
                const errorText = await response.text();
                console.error('Erro do servidor:', errorText);
                alert(`Erro ao adicionar cliente: ${errorText}`);
            }
        } catch (error) {
            setShowForm(false);
            setNomeCliente("");

            // console.error('Erro ao tentar adicionar cliente:', error.message);
            // alert('Erro ao tentar adicionar cliente. Verifique a conexão e tente novamente.');
        }
    };
    

    const columns = useMemo(
        () => [
            {
                Header: "CPF",
                accessor: "cpf",
            },
            {
                Header: "Nome",
                accessor: "nome_cliente",
            },
            {
                Header: "Ações",
                Cell: ({ row }) => (
                    <ListButtons endpoint={endpoint} data={row.original} onDelete={handleDelete} />
                ),
            },
        ],
        []
    );

    return (
        <div>
            <div className="header-table">
                <h1>Clientes</h1>
                <button onClick={() => setShowForm(true)}>+ Novo Cliente</button>
            </div>

            {/* Formulário Modal */}
            {showForm && (
                <div className="form-modal">
                    <div className="form-content">
                        <h2>Adicionar Novo Cliente</h2>
                        <label>
                            Nome do Cliente:
                            <input
                                type="text"
                                value={nomeCliente}
                                onChange={(e) => setNomeCliente(e.target.value)}
                                placeholder="Digite o nome"
                            />
                        </label>
                        <label>
                            CPF:
                            <input
                                type="text"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                placeholder="Digite o CPF"
                            />
                        </label>
                        <div className="form-actions">
                            <button onClick={handleAddCliente}>Adicionar Cliente</button>
                            <button onClick={() => setShowForm(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabela de Clientes */}
            <TableComponent columns={columns} data={clientes} />
        </div>
    );
};

export default ClientesPage;
