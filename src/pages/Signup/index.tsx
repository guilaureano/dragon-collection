import { ChangeEvent, FormEvent, useState } from 'react';

import { useAuth, useToast } from 'hooks';
import { ICustomError } from 'global-types';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Text } from 'components';
import { errorMessage } from 'assets/common-texts';
import { ISignupData } from './types';
import '../../assets/global.scss';

export const Signup = () => {
  const auth = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ISignupData>({
    email: '',
    emailConfirmation: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await auth.handleSignup(formData.email, formData.password);
      showToast({ message: 'Usuário cadastrado com sucesso!' });
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

  return (
    <div className='sign-wrap'>
      <div className='sign'>
        <Text.Title className='sign-title'>Dragon Collection</Text.Title>
        <form className='sign-form' onSubmit={onSubmit}>
          <Text.Subtitle className='sign-subtitle'>
            Cadastrar Novo Usuário
          </Text.Subtitle>
          <Text className='sign-text'>E-mail</Text>
          <Input
            name='email'
            onChange={handleChange}
            type='email'
            value={formData.email}
            placeholder='Digite seu e-mail'
          />
          <Text className='sign-text'>Confirme seu e-mail</Text>
          <Input
            name='emailConfirmation'
            onChange={handleChange}
            type='email'
            value={formData.emailConfirmation}
            placeholder='Confirme seu e-mail'
          />
          <Text className='sign-text'>Senha</Text>
          <Input
            name='password'
            onChange={handleChange}
            type='password'
            value={formData.password}
            placeholder='Digite sua senha'
          />
          <Button className='sign-btn' type='submit'>
            Criar conta
          </Button>
        </form>
      </div>
    </div>
  );
};
