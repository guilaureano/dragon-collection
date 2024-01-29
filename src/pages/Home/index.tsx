import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Modal, Skeleton, TableDragon, Text } from 'components';
import { useDragon } from 'hooks';
import './home.scss';

export const Home = () => {
  const { data, getList, handleDeleteDragon, hasError, loading } = useDragon();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [idToExclude, setIDToExclude] = useState<string | null>('');

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id: string) => {
    setIDToExclude(id);
    setModalOpen(true);
  };

  const onConfirmDelete = async () => {
    if (idToExclude) {
      await handleDeleteDragon(idToExclude);
      setModalOpen(false);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/dragon/edit/${id}`);
  };

  if (!data.length) {
    if (loading) {
      return (
        <div className='home'>
          <Text.Title className='home-title'>Lista de Dragões</Text.Title>
          <Skeleton width='75svw' height='75svh' />
        </div>
      );
    }
    if (hasError) {
      return (
        <div className='home'>
          <Text.Title className='home-title'>Lista de Dragões</Text.Title>
          <Text.Subtitle>
            Opa, parece que estamos enfrentando problemas com o servidor,
            verifique sua conexão com a internet e tente novamente.
          </Text.Subtitle>
        </div>
      );
    }
  }

  return (
    <div className='home'>
      <Text.Title className='home-title'>Lista de Dragões</Text.Title>
      <TableDragon data={data} onDelete={handleDelete} onEdit={handleEdit} />
      <div className='home'>
        <Button onClick={() => navigate('dragon/new')}>
          Adicionar novo dragão
        </Button>
      </div>
      {modalOpen && (
        <Modal
          describe='Você tem certeza que deseja deletar esse Dragão?'
          onCancel={() => setModalOpen(false)}
          onConfirm={onConfirmDelete}
          title='Deletar Dragão'
        />
      )}
    </div>
  );
};
