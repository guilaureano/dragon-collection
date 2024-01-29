import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { errorMessage } from 'assets/common-texts';
import { Button, Input, Skeleton, Text } from 'components';
import { ICustomError } from 'global-types';
import { useDragonID, useToast } from 'hooks';
import { IDragon } from 'hooks/useDragon/types';
import { dragonService } from 'services/dragon';

export const DragonEdit = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { data, getDragonByID, hasError, loading } = useDragonID();
  const { pathname } = useLocation();
  const id = pathname.replace(/^\/dragon\/edit\//, '');
  const [formData, setFormData] = useState<IDragon>({} as IDragon);

  useEffect(() => {
    getDragonByID(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

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
      const values = {
        name: formData.name,
        type: formData.type,
        histories: formData.histories,
      };
      await dragonService.edit(id, values);
      showToast({ message: 'Dragão Editado com sucesso!' });
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

  if (!data?.name) {
    if (loading) {
      return (
        <div className='page'>
          <div className='page-panel'>
            <Text.Title className='page-title'>Alterar Dragão</Text.Title>
            <Skeleton />
          </div>
        </div>
      );
    }
    if (hasError) {
      return (
        <div className='page'>
          <div className='page-panel'>
            <Text.Title className='page-title'>Alterar Dragão</Text.Title>
            <Text.Subtitle className='page-subtitle'>
              Opa, parece que estamos enfrentando problemas com o servidor,
              verifique sua conexão com a internet e tente novamente.
            </Text.Subtitle>
          </div>
        </div>
      );
    }
  }

  return (
    <div className='page'>
      <div className='page-panel'>
        <Text.Title className='page-title'>Alterar Dragão</Text.Title>
        <form className='register-form' onSubmit={onSubmit}>
          <Text className='register-text'>Nome do Dragão</Text>
          <Input
            name='name'
            onChange={handleChange}
            type='text'
            value={formData.name}
            placeholder='Digite o nome do Dragão'
          />
          <Text className='register-text'>Tipo do Dragão</Text>
          <Input
            name='type'
            onChange={handleChange}
            type='text'
            value={formData.type}
            placeholder='Digite o tipo do Dragão'
          />
          <Text className='register-text'>História do Dragão</Text>
          <Input
            name='histories'
            onChange={handleChange}
            type='text'
            value={formData.histories}
            placeholder='Era uma vez...'
          />
          <div className='register-action'>
            <Button className='register-btn' type='submit'>
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
