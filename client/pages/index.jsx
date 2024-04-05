import Login from 'components/Login/Login';
import React from 'react';
import Pokeball from '../components/Images/Pokeball.png';
import './index.scss';

function LoginPage() {
  return (
    <div>
      <header className='header'>
        <div className='logo_header'>
          <img src={Pokeball.src}></img>
          <p>Pokédex</p>
        </div>
      </header>

      <Login />
    </div>
  );
}

export default LoginPage;
