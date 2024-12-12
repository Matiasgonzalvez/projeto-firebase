import React from 'react';
import './Home.css'; // Arquivo CSS para estilizar a página

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bem-vindo ao Nosso Projeto!</h1>
        <p>Desenvolvido com paixão e dedicação pelos alunos Rafael Leivas, Matias Gonzalvez e Felipe Loche.</p>
      </header>

      <section className="home-about">
        <h2>Sobre o Projeto</h2>
        <p>
          Este é um trabalho acadêmico cujo objetivo é desenvolver o frontend de uma aplicação web, utilizando os endpoints fornecidos pelo professor. 
          Nosso foco está em criar uma interface intuitiva e funcional que se conecta perfeitamente ao backend.
        </p>
      </section>

      <section className="home-features">
        <h2>Funcionalidades</h2>
        <ul>
          <li>Integração com APIs fornecidas pelo professor</li>
          <li>Design responsivo e amigável</li>
          <li>Componentes reutilizáveis e organizados</li>
          <li>Desempenho otimizado</li>
        </ul>
      </section>

      <section className="home-team">
        <h2>Equipe de Desenvolvimento</h2>
        <div className="team-cards">
          <div className="team-card">
            <h3>Rafael Leivas</h3>
            <p>Frontend Developer apaixonado por React e UI Design.</p>
          </div>
          <div className="team-card">
            <h3>Matias Gonzalvez</h3>
            <p>Backend Expert com foco em APIs e arquitetura.</p>
          </div>
          <div className="team-card">
            <h3>Felipe Loche</h3>
            <p>Fullstack Developer com habilidades em DevOps.</p>
          </div>
        </div>
      </section>

      <section className="home-gpt-story">
        <h2>Histórias do Chat GPT</h2>
        <div className="story-card">
          <h3>O Sonho do Código Perfeito</h3>
          <p>
            Era uma vez um jovem chamado Lucas, que tinha um sonho ambicioso: ver seu código de programação funcionar de primeira. 
            Desde pequeno, Lucas era fascinado por computadores e pela magia de transformar linhas de texto em algo funcional.
          </p>
          <p>
            Certo dia, após noites de café e debugging, Lucas decidiu tentar algo novo. Ele escreveu um pequeno script, simples, mas poderoso. 
            Com os dedos cruzados e o coração acelerado, ele pressionou "Enter"... e, para sua surpresa, o código funcionou sem nenhum erro! 
            Lucas pulou de alegria, mal acreditando no que acabara de acontecer.
          </p>
          <p>
            A história de Lucas nos ensina que, mesmo nos momentos de maior dúvida, a persistência pode nos levar ao inesperado. Continue sonhando e codando!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
