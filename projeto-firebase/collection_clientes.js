const { collection, getDocs, query, where, setDoc, doc } = require('firebase/firestore');
const db = require('./db/firebase');

const clientesSeed = [
    { nome: "Alice Silva", cpf: "12345678901" },
    { nome: "Bruno Costa", cpf: "23456789012" },
    { nome: "Carla Souza", cpf: "34567890123" },
    { nome: "Daniel Santos", cpf: "45678901234" },
    { nome: "Elaine Pereira", cpf: "56789012345" },
    { nome: "Fernando Lima", cpf: "67890123456" },
    { nome: "Gustavo Nunes", cpf: "78901234567" },
    { nome: "Heloísa Alves", cpf: "89012345678" },
    { nome: "Igor Cardoso", cpf: "90123456789" },
    { nome: "Julia Ramos", cpf: "01234567890" }
];

async function upsertClientes() {
    const clientesCollection = collection(db, 'Clientes');

    for (const cliente of clientesSeed) {
        const q = query(clientesCollection, where("cpf", "==", cliente.cpf));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            await setDoc(doc(clientesCollection), cliente);
            console.log(`Cliente ${cliente.nome} adicionado.`);
        } else {
            const existingDoc = snapshot.docs[0].ref;
            await setDoc(existingDoc, cliente, { merge: true });
            console.log(`Cliente ${cliente.nome} atualizado.`);
        }
    }
}

module.exports = { upsertClientes };