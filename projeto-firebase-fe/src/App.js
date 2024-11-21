import './App.css';
import {Route, Routes} from 'react-router-dom'
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ClientesPage from "./Pages/ClientesPage";
import ProdutosPage from "./Pages/ProdutosPage";
import PontoDeVendaPage from "./Pages/PontoDeVendaPage";


function App() {
  return (
      <div className="App">
        <Header>PDV</Header>
        <Routes >
          <Route path="/" element={<div />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/ponto-de-venda" element={<PontoDeVendaPage />} />
        </Routes>
        <Footer>Todos os direitos reservados - Grupo MFR</Footer>
      </div>
  );
}

export default App;