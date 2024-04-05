import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import { Colors } from 'components/Colors';
import './PokeCard.scss';
import SearchBar from 'components/UI/SearchBar/SearchBar';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTA1MDg1Njg2MDQiLCJpYXQiOjE3MTE5NTQxNzAsImV4cCI6MTcxMjgxODE3MH0.8KEnnzw-uN76fXEA098JqwFCabyzCSMSSw59zmaZN6w';

axios.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
function PokeCard() {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, _] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:5000/v3/pokemon?page=${currentPage}&q=${searchQuery}&type=`
      )
      .then((response) => {
        if (currentPage === 1) {
          setPokemonData(response.data.data);
        } else {
          setPokemonData((prevData) => [...prevData, ...response.data.data]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [currentPage, searchQuery]);

  const handleMore = () => {
    if (!isLoading && hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className='poke-card-outer'>
      <SearchBar onSearch={handleSearch} />

      <div className='poke-card'>
        <section className='pokebox'>
          {pokemonData.map((pokemon) => (
            <div
              key={pokemon.id}
              className='poke_card__inner'
              style={{ backgroundColor: Colors[pokemon.type[0]] }}
            >
              <p className='poke_card__inner__id'>#00{pokemon.id}</p>

              <div className='poke_card__inner__details'>
                <p
                  className='poke_card__inner__details__poke_name'
                  style={{ color: Colors[pokemon.type[0]] }}
                >
                  {pokemon.name.english}
                </p>

                <div className='poke_card__inner__details--types'>
                  <p
                    className='poke_card__inner__details--types__type'
                    style={{ backgroundColor: Colors[pokemon.type[0]] }}
                  >
                    {pokemon.type[0]}
                  </p>

                  <p
                    className='poke_card__inner__details--types__type'
                    style={{ backgroundColor: Colors[pokemon.type[1]] }}
                  >
                    {pokemon.type[1]}
                  </p>
                </div>
              </div>

              <img
                className='poke_card__inner__pokemon'
                src={pokemon.image.hires}
              />
            </div>
          ))}
        </section>

        {isLoading ? (
          <p>Loading...</p>
        ) : hasMore && pokemonData.length >= 8 ? (
          <button
            className='loadmore_btn'
            onClick={handleMore}
          >
            Load More
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default PokeCard;
