import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Skeleton, Text } from 'components';
import { useDragonID } from 'hooks';
import './dragon-detail.scss';

export const DragonDetails = () => {
  const { data, getDragonByID, hasError, loading } = useDragonID();
  const { pathname } = useLocation();
  const id = pathname.replace(/^\/dragon\//, '');

  useEffect(() => {
    getDragonByID(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!data?.name) {
    if (loading) {
      return (
        <div className='page'>
          <Text.Title className='page-title'>Detalhes do Dragão</Text.Title>
          <Skeleton />
        </div>
      );
    }
    if (hasError) {
      return (
        <div className='page'>
          <div className='page-panel'>
            <Text.Title className='page-title'>Detalhes do Dragão</Text.Title>
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
      <Text.Title className='page-title'>Detalhes do Dragão</Text.Title>
      <div className='detail'>
        <div>
          <Text>Data de Criação</Text>
          <Text.Subtitle>{data?.createdAt}</Text.Subtitle>
        </div>
        <div>
          <Text>Nome</Text>
          <Text.Subtitle>{data?.name}</Text.Subtitle>
        </div>
        <div>
          <Text>Tipo</Text>
          <Text.Subtitle>{data?.type}</Text.Subtitle>
        </div>
      </div>
    </div>
  );
};
