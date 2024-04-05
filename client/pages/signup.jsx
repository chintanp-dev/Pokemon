import React from 'react';
import Pokeball from '../components/Images/Pokeball.png';
import SignUp from 'components/SignUp/SignUp';
import './index.scss';

const SignUpPage = () => {
  return (
    <>
      <header className='header'>
        <div className='logo_header'>
          <img src={Pokeball.src}></img>
          <p>Pokédex</p>
        </div>
      </header>
      <div className='signup__outer'>
        <SignUp />
      </div>
    </>
  );
};

export default SignUpPage;
