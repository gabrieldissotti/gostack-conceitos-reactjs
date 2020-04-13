import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    fetchRepositories();
  }, [])

  async function fetchRepositories() {
    const {data: repositories } = await api.get(`/repositories`);

    setRepositories(repositories);
  }

  async function handleAddRepository() {
    const { data: repository } = await api.post('/repositories', {
      url: "https://github.com/gabrieldissotti/gostack-conceitos-reactjs",
      title: `Desafio ReactJS`,
      techs: ["React", "Node.js"],
    });

    setRepositories([...repositories, repository ])
  }

  function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(item => item.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.length > 0 && repositories.map(item => (
            <li key={item.id}>
              {item.title}  

              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
