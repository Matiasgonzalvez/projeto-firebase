import {useEffect, useMemo, useState} from "react";
import {GetData} from "../Utils/GetData";
import TableComponent from "../Components/TableComponent";
import ListButtons from "../Components/ListButtons";

const ProdutosPage = () => {
    const endpoint = 'produtos';
    const [produtos, setProdutos] = useState([]);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [showForm, setShowForm] = useState(false); // Controle do modal de adição
    const [nomeProduto, setNomeProduto] = useState(""); // Estado para nome do Produto
    const [preco, setPreco] = useState(""); // Estado para preço do Produto
    const [produtoEditando, setProdutoEditando] = useState(null); // Estado para armazenar o produto sendo editado

    useEffect(() => {
        GetData(endpoint, setProdutos);
    }, [deleteTrigger]);

    const handleDelete = (id) => {
        setProdutos(prevProdutos => prevProdutos.filter(produto => produto.id !== id));
        setDeleteTrigger(prev => !prev); // Alterna o valor para disparar o useEffect
    };

    const handleAddProduto = async () => {
        if (!nomeProduto || !preco) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            console.log('Dados enviados:', {nome_produto: nomeProduto, preco});

            const response = await fetch('http://localhost:8080/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({nome_produto: nomeProduto, preco}),
            });

            console.log('Resposta recebida, status:', response.status);

            if (response.ok) {
                const newProduto = await response.json();
                console.log('Produto criado com sucesso:', newProduto);
                setProdutos(prevProdutos => [...prevProdutos, newProduto]);
                setShowForm(false);
                setNomeProduto("");
                setPreco("");
            } else {
                const errorText = await response.text();
                console.error('Erro do servidor:', errorText);
                alert(`Erro ao adicionar Produto: ${errorText}`);
            }
        } catch (error) {
            setShowForm(false);
            setNomeProduto("");
        }
    };

    const handleEditProduto = async () => {
        if (!nomeProduto || !preco) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            console.log('Dados enviados para edição:', {nome_produto: nomeProduto, preco});

            const response = await fetch(`http://localhost:8080/produtos/${produtoEditando.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({nome_produto: nomeProduto, preco}),
            });

            console.log('Resposta recebida, status:', response.status);

            if (response.ok) {
                const updatedProduto = await response.json();
                console.log('Produto editado com sucesso:', updatedProduto);

                setProdutos(prevProdutos =>
                    prevProdutos.map(produto =>
                        produto.id === produtoEditando.id ? updatedProduto : produto
                    )
                );
                setShowForm(false);
                setNomeProduto("");
                setPreco("");
                setProdutoEditando(null); // Limpa o estado após a edição
            } else {
                const errorText = await response.text();
                console.error('Erro do servidor:', errorText);
                alert(`Erro ao editar Produto: ${errorText}`);
            }
        } catch (error) {
            setShowForm(false);
            setNomeProduto("");
            setProdutoEditando(null);
        }
    };

    const handleEditButtonClick = (produto) => {
        setProdutoEditando(produto); // Define o produto que está sendo editado
        setNomeProduto(produto.nome_produto); // Preenche o nome do produto no formulário
        setPreco(produto.preco); // Preenche o preço do produto no formulário
        setShowForm(true); // Exibe o formulário de edição
    };

    const columns = useMemo(
        () => [
            {
                Header: "Nome",
                accessor: "nome_produto",
            },
            {
                Header: "Preço",
                accessor: "preco",
                Cell: ({value}) => `R$ ${parseFloat(value).toFixed(2)}`,
            },
            {
                Header: "Ações",
                Cell: ({row}) => (
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button style={{backgroundColor: 'green', color: 'white'}} onClick={() => handleEditButtonClick(row.original)}>Editar</button>
                        <ListButtons endpoint={endpoint} data={row.original} onDelete={handleDelete}/>
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <div>
            <div className="header-table">
                <h1>Produtos</h1>
                <button onClick={() => setShowForm(true)}>+ Novo Produto</button>
            </div>
            {showForm && (
                <div className="form-modal">
                    <div className="form-content">
                        <h2>{produtoEditando ? "Editar Produto" : "Adicionar Novo Produto"}</h2>
                        <label>
                            Nome do Produto:
                            <input
                                type="text"
                                value={nomeProduto}
                                onChange={(e) => setNomeProduto(e.target.value)}
                                placeholder="Digite o nome"
                            />
                        </label>
                        <label>
                            Preço:
                            <input
                                type="text"
                                value={preco}
                                onChange={(e) => setPreco(e.target.value)}
                                placeholder="Digite o preço"
                            />
                        </label>
                        <div className="form-actions">
                            <button onClick={produtoEditando ? handleEditProduto : handleAddProduto}>
                                {produtoEditando ? "Salvar Alterações" : "Adicionar Produto"}
                            </button>
                            <button onClick={() => setShowForm(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
            <TableComponent columns={columns} data={produtos}/>
        </div>
    );
};

export default ProdutosPage;
