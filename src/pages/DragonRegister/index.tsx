import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToast } from 'hooks';
import { ICustomError } from 'global-types';
import { Button, Input, Text } from 'components';
import { errorMessage } from 'assets/common-texts';
import { dragonService } from 'services/dragon';
import './dragon-register.scss';
import { getDate } from 'utils';

interface IRegister {
  histories: string;
  name: string;
  type: string;
}

export const DragonRegister = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IRegister>({
    histories: '',
    name: '',
    type: '',
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
      const createdAt = getDate();
      await dragonService.register({ ...formData, createdAt });
      showToast({ message: 'Dragão cadastrado com sucesso!' });
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
    <div className='page'>
      <div className='page-panel'>
        <Text.Title className='page-title'>Cadastrar novo Dragão</Text.Title>
        <form className='register-form' onSubmit={onSubmit}>
          <Text className='register-text'>Qual o nome do Dragão?</Text>
          <Input
            name='name'
            onChange={handleChange}
            type='text'
            value={formData.name}
            placeholder='Digite o nome do Dragão'
          />
          <Text className='register-text'>Qual o tipo do Dragão?</Text>
          <Input
            name='type'
            onChange={handleChange}
            type='text'
            value={formData.type}
            placeholder='Digite o tipo do Dragão'
          />
          <Text className='register-text'>Qual a história do Dragão?</Text>
          <Input
            name='histories'
            onChange={handleChange}
            type='text'
            value={formData.histories}
            placeholder='Era uma vez...'
          />
          <div className='register-action'>
            <Button className='register-btn' type='submit'>
              Cadastrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
