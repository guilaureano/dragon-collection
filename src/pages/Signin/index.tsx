import { ChangeEvent, FormEvent, useState } from 'react';

import { useAuth, useToast } from 'hooks';
import { ICustomError } from 'global-types';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Text } from 'components';
import { errorMessage } from 'assets/common-texts';
import { ISigninData } from './types';
import './signin.scss';
import { validateEmail } from 'utils';

export const Signin = () => {
  const auth = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ISigninData>({
    email: '',
    password: '',
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await auth.handleSignin(formData.email, formData.password);
      navigate('/');
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null) {
        const customError = error as ICustomError;
        showToast({ message: customError?.message || errorMessage });
      } else {
        showToast({ message: errorMessage });
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValid = validateEmail(formData.email);

  return (
    <div className='signin'>
      <Text.Title className='signin-title'>Dragon Collection</Text.Title>
      <form className='signin-form' onSubmit={onSubmit}>
        <Text className='signin-text'>Usuário</Text>
        <Input
          autoComplete='email'
          name='email'
          onChange={handleChange}
          type='email'
          value={formData.email}
          placeholder='digite seu e-mail'
          isInvalid={!isValid}
        />
        <Text className='signin-text'>Senha</Text>
        <Input
          autoComplete='password'
          name='password'
          onChange={handleChange}
          type='password'
          value={formData.password}
          placeholder='digite sua senha'
        />
        <Button className='signin-btn' type='submit'>
          Entrar
        </Button>
      </form>
      <Button onClick={() => navigate('/signup')}>Criar conta</Button>
    </div>
  );
};
