import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LoginValidator } from 'components/ValidationSchema';
import { inputFieldLogin } from 'components/constants/InputFields';
import InputControl from 'components/InputControl/InputControl';
import USE_LOCAL_STORAGE from 'components/constants/USE_LOCAL_STORAGE';
import '../Login/Login.scss';

const Login = () => {
  const router = useRouter();
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const [loginErrors, setLoginErrors] = useState({});
  const [_, setStoredToken] = USE_LOCAL_STORAGE('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginvalidationError = LoginValidator(loginFormData);

    setLoginErrors(loginvalidationError);

    if (Object.keys(loginvalidationError).length === 0) {
      try {
        const response = await axios.post(
          'http://localhost:5000/v3/user/login',
          loginFormData
        );

        const { token } = response.data;
        setStoredToken(token);

        setTimeout(() => {
          router.push('/pokemon');
        }, 2000);
      } catch (error) {
        alert('Email Or Password Not Match');
        console.error('Data not Found', error);
      }
    }
  };

  return (
    <section className='login_section'>
      <form
        className='form'
        onSubmit={handleSubmit}
      >
        <p className='login_header'>Login to Pokedex</p>
        <div className='input_and_btn'>
          {inputFieldLogin.map((field) => {
            return (
              <InputControl
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={loginFormData[field.name]}
                errors={loginErrors}
                onChange={handleChange}
              />
            );
          })}
          <button
            type='submit'
            className='login-button'
          >
            Login
          </button>
        </div>
        <div className='new-user-container'>
          Don't have an account?
          <Link href='/signup'>
            <p>Create new</p>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
