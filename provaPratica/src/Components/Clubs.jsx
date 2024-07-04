import React, { useState, useEffect } from 'react';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://api.cartola.globo.com/clubes')
      .then(response => response.json())
      .then(data => {
        const clubsArray = Object.values(data);
        setClubs(clubsArray);
      })
      .catch(error => console.error('Error fetching clubs:', error));
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredClubs = clubs.filter(
    club =>
      club.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.apelido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="clubs-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar times..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="clubs-list">
        {filteredClubs.map(club => (
          <div key={club.id} className="club-card">
            <img
              src={club.escudos['60x60']}
              alt={club.nome}
              className="club-logo"
            />
            <h2>{club.nome}</h2>
            <p>{club.apelido}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
