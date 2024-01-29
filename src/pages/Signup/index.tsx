import { ChangeEvent, FormEvent, useState } from 'react';

import { useAuth, useToast } from 'hooks';
import { ICustomError } from 'global-types';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Text } from 'components';
import { errorMessage } from 'assets/common-texts';
import { ISignupData } from './types';
import '../../assets/global.scss';
import { validateEmail } from 'utils';

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
    setFormData({ ...formData, [name]: value });
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

  const validEmail = !!formData.email && validateEmail(formData.email);
  const validEmailConfirmation =
    !!formData.emailConfirmation &&
    !!formData.email &&
    formData.emailConfirmation === formData.email;
  const validPassword = !!formData.password && formData.password.length >= 4;
  const enabledButton = validEmail && validEmailConfirmation && validPassword;

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
            isInvalid={!!formData.email && !validEmail}
            name='email'
            onChange={handleChange}
            placeholder='Digite seu e-mail'
            type='email'
            value={formData.email}
          />
          <Text className='sign-text'>Confirme seu e-mail</Text>
          <Input
            isInvalid={!!formData.emailConfirmation && !validEmailConfirmation}
            name='emailConfirmation'
            onChange={handleChange}
            placeholder='Confirme seu e-mail'
            type='email'
            value={formData.emailConfirmation}
          />
          <Text className='sign-text'>Senha</Text>
          <Input
            isInvalid={!!formData.password && !validPassword}
            name='password'
            onChange={handleChange}
            placeholder='Digite sua senha'
            type='password'
            value={formData.password}
          />
          <Button disabled={!enabledButton} className='sign-btn' type='submit'>
            Criar conta
          </Button>
        </form>
      </div>
    </div>
  );
};
