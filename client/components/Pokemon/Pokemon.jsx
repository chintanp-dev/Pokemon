import React from 'react';
import Pokeball from '../Images/Pokeball.png';
import PokeCard from 'components/Pokemon/PokeCard/PokeCard';
import './Pokemon.scss';

function Pokemon() {
  return (
    <>
      <header>
        <div className='logo_header'>
          <img src={Pokeball.src} />
          <p>Pokédex</p>
        </div>

        <img src={Pokeball.src} />
      </header>

      <div className='home_page'>
        <PokeCard />
      </div>
    </>
  );
}

export default Pokemon;
