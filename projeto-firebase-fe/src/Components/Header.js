import { Link } from "react-router-dom";

const Header = (props) => {
    return(
        <header>
            <h1 style={{color: "white"}}>{props.children}</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/clientes">Clientes</Link>
                <Link to="/produtos">Produtos</Link>
                <Link to="/ponto-de-venda">Ponto de Venda</Link>
            </nav>
        </header>
    )
}

export default Header;