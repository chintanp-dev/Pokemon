// SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SignUpValidator } from 'components/ValidationSchema';
import { inputFieldSignup } from 'components/constants/InputFields';
import InputControl from 'components/InputControl/InputControl';
import './SignUp.scss';
import USE_LOCAL_STORAGE from 'components/constants/USE_LOCAL_STORAGE';

const SignUp = () => {
  const router = useRouter();
  const [signupFormData, setSignupFormData] = useState({
    fullname: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [_, setStoredToken] = USE_LOCAL_STORAGE('token'); // Using custom hook to set token

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({
      ...signupFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = SignUpValidator(signupFormData);
    setErrors(validationError);

    if (Object.keys(validationError).length === 0) {
      try {
        const { confirmPassword, ...dataTOSend } = signupFormData;

        const response = await axios.post(
          'http://localhost:5000/v3/user/register',
          dataTOSend
        );

        const { token } = response.data;
        setStoredToken(token);

        router.push('/');
      } catch (error) {
        alert('User Already Registered');
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <>
      <div className='signup_section'>
        <form
          className='form'
          onSubmit={handleSubmit}
        >
          <p className='signup_header'>Signup to Pokedex</p>
          <div className='input_and_btn'>
            {inputFieldSignup.map((Field) => {
              return (
                <InputControl
                  key={Field.name}
                  type={Field.type}
                  name={Field.name}
                  placeholder={Field.placeholder}
                  value={signupFormData[Field.name]}
                  errors={errors}
                  onChange={handleChange}
                />
              );
            })}
            <button
              type='submit'
              className='signup-button'
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
