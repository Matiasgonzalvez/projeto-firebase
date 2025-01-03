const {collection, doc, addDoc, getDocs, updateDoc, deleteDoc} = require("firebase/firestore");

const db = require("../db/firebase");

const produtsRoutes = (server) => {
    server.post("/produtos", async (req, res) => {
        try {
            const {nome_produto, preco} = req.body;

            if (!nome_produto || preco == null) {
                return res.status(400).send('Os campos "nome_produto" e "preco" são obrigatórios.');
            }

            const docRef = await addDoc(collection(db, "Produtos"), {nome_produto, preco});

            res.status(201).send(`Produto adicionado com o ID: ${docRef.id}`);
        } catch (error) {
            res.status(500).send(`Erro ao adicionar produto: ${error.message}`);
        }
    });

    server.get("/produtos", async (req, res) => {
        {
            try {
                const busca = await getDocs(collection(db, "Produtos"));

                const produtos = busca.docs.map(doc => ({id: doc.id, ...doc.data()}));

                res.status(200).send(produtos);

            } catch (error) {
                res.status(500).send(`Erro ao buscar produtos: ${error.message}`);
            }
        }
    });

    server.put('/produtos/:id', async (req, res) => {
        try {
            const {id} = req.params;
            const {nome_produto, preco} = req.body;

            if (!nome_produto || preco == null) {
                return res.status(400).send('Os campos "nome_produto" e "preco" são obrigatórios.');
            }

            const docRef = doc(db, "Produtos", id);

            await updateDoc(docRef, {nome_produto, preco});

            res.status(200).send(`Produto atualizado com o ID: ${id}`);
        } catch (error) {
            res.status(500).send(`Erro ao atualizar o produto: ${error.message}`);
        }
    });

    server.delete('/produtos/:id', async (req, res) => {
        try {
            const {id} = req.params;
            const docRef = doc(db, "Produtos", id);

            await deleteDoc(docRef);

            res.status(200).send(`Produto excluído com o ID: ${id}`);

        } catch (error) {
            res.status(500).send(`Erro ao excluir o produto: ${error.message}`);
        }
    });
};


module.exports = produtsRoutes;