const {collection, doc, addDoc, getDocs, updateDoc, deleteDoc} = require("firebase/firestore");

const db = require("../db/firebase");

const clientesRoutes = (server) => {
    server.post("/clientes", async (req, res) => {
        try {
            const {nome_cliente, cpf} = req.body;

            if (!nome_cliente || cpf == null) {
                return res.status(400).send('Os campos "nome_cliente" e "cpf" são obrigatórios.');
            }

            const docRef = await addDoc(collection(db, "clientes"), {nome_cliente, cpf});

            res.status(201).send(`Cliente adicionado com o ID: ${docRef.id}`);
        } catch (error) {
            res.status(500).send(`Erro ao adicionar Cliente: ${error.message}`);
        }
    });

    server.get("/clientes", async (req, res) => {
        {
            try {
                const busca = await getDocs(collection(db, "clientes"));

                const clientes = busca.docs.map(doc => ({id: doc.id, ...doc.data()}));

                res.status(200).send(clientes);

            } catch (error) {
                res.status(500).send(`Erro ao buscar clientes: ${error.message}`);
            }
        }
    });

    server.put('/clientes/:id', async (req, res) => {
        try {
            const {id} = req.params;
            const {nome_cliente, cpf} = req.body;

            if (!nome_cliente || cpf == null) {
                return res.status(400).send('Os campos "nome_cliente" e "cpf" são obrigatórios.');
            }

            const docRef = doc(db, "clientes", id);

            await updateDoc(docRef, {nome_cliente, cpf});

            res.status(200).send(`Cliente atualizado com o ID: ${id}`);
        } catch (error) {
            res.status(500).send(`Erro ao atualizar o Cliente: ${error.message}`);
        }
    });

    server.delete('/clientes/:id', async (req, res) => {
        try {
            const {id} = req.params;
            const docRef = doc(db, "clientes", id);

            await deleteDoc(docRef);

            res.status(200).send(`Cliente excluído com o ID: ${id}`);

        } catch (error) {
            res.status(500).send(`Erro ao excluir o Cliente: ${error.message}`);
        }
    });
};


module.exports = clientesRoutes;
