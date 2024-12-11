const { collection, getDocs, query, where, setDoc, doc } = require('firebase/firestore');
const db = require('./db/firebase'); // Ajuste o caminho se necessário

const produtosSeed = [
    { nome_produto: "Arroz", preco: 5.99 },
    { nome_produto: "Feijão", preco: 7.49 },
    { nome_produto: "Açúcar", preco: 3.89 },
    { nome_produto: "Sal", preco: 1.99 },
    { nome_produto: "Óleo", preco: 8.5 },
    { nome_produto: "Café", preco: 10.5 },
    { nome_produto: "Farinha", preco: 4.75 },
    { nome_produto: "Macarrão", preco: 2.5 },
    { nome_produto: "Leite", preco: 4.99 },
    { nome_produto: "Pão", preco: 3.99 }
];

async function upsertProdutos() {
    const produtosCollection = collection(db, 'Produtos');

    for (const produto of produtosSeed) {
        const q = query(produtosCollection, where("nome_produto", "==", produto.nome_produto));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            // Produto não existe, então insere
            await setDoc(doc(produtosCollection), produto);
            console.log(`Produto ${produto.nome_produto} adicionado.`);
        } else {
            // Produto já existe, então atualiza
            const existingDoc = snapshot.docs[0].ref;
            await setDoc(existingDoc, produto, { merge: true });
            console.log(`Produto ${produto.nome_produto} atualizado.`);
        }
    }
}

module.exports = { upsertProdutos };