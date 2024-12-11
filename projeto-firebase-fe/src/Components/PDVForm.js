import {useState} from "react";

const PDVForm = () => {
    const [produtos, setProdutos] = useState([]); // IDs dos produtos
    const [produtoId, setProdutoId] = useState(""); // ID do produto em edição
    const [clienteId, setClienteId] = useState(""); // ID do cliente
    const [valorPago, setValorPago] = useState(""); // Valor pago pelo cliente
    const [showModal, setShowModal] = useState(false); // Controle do modal
    const [response, setResponse] = useState(null); // Resposta do servidor

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (produtos.length === 0 || !clienteId || !valorPago) {
            alert("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/pdv", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    produtos, // array de IDs de produtos
                    clienteId,
                    valorPago: parseFloat(valorPago),
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setResponse(data); // Exibe o cupom gerado
                alert("Venda registrada com sucesso!");
                setShowModal(false);
                setProdutos([]);
                setClienteId("");
                setValorPago("");
                setProdutoId("");
            } else {
                const errorText = await response.text();
                alert(`Erro: ${errorText}`);
            }
        } catch (error) {
            console.error("Erro ao registrar venda:", error);
            alert("Erro ao registrar venda. Verifique o console para mais detalhes.");
        }
    };

    const handleAddProduto = () => {
        if (produtoId) {
            setProdutos([...produtos, produtoId]);
            setProdutoId("");
        } else {
            alert("Digite o ID do produto antes de adicionar.");
        }
    };

    return (
        <div>
            <h1>Registrar Venda (PDV)</h1>
            <button onClick={() => setShowModal(true)}>+ Registrar Venda</button>

            {showModal && (
                <div className="form-modal">
                    <div className="form-content">
                        <h2>Registrar Venda</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                IDs dos Produtos:
                                <input
                                    type="text"
                                    value={produtoId}
                                    onChange={(e) => setProdutoId(e.target.value)}
                                    placeholder="Digite o ID do produto"
                                />
                                <button type="button" onClick={handleAddProduto}>
                                    Adicionar Produto
                                </button>
                            </label>
                            <ul>
                                {produtos.map((id, index) => (
                                    <li key={index}>{id}</li>
                                ))}
                            </ul>
                            <label>
                                ID do Cliente:
                                <input
                                    type="text"
                                    value={clienteId}
                                    onChange={(e) => setClienteId(e.target.value)}
                                    placeholder="Digite o ID do cliente"
                                    required
                                />
                            </label>
                            <label>
                                Valor Pago:
                                <input
                                    type="number"
                                    value={valorPago}
                                    onChange={(e) => setValorPago(e.target.value)}
                                    placeholder="Digite o valor pago"
                                    required
                                />
                            </label>
                            <div className="form-actions">
                                <button type="submit">Registrar</button>
                                <button type="button" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {response && (
                <div>
                    <h2>Cupom Fiscal</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default PDVForm;
