import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Modal, Skeleton, TableDragon, Text } from 'components';
import { useAuth, useDragon } from 'hooks';

export const Home = () => {
  const { data, getList, handleDeleteDragon, hasError, loading } = useDragon();
  const { handleLogout } = useAuth();
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
        <div className='page'>
          <Text.Title className='page-title'>Lista de Dragões</Text.Title>
          <Skeleton />
        </div>
      );
    }
    if (hasError) {
      return (
        <div className='page'>
          <div className='page-panel'>
            <Text.Title className='page-title'>Lista de Dragões</Text.Title>
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
      <div className='page-title'>
        <Text.Title>Lista de Dragões</Text.Title>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <TableDragon data={data} onDelete={handleDelete} onEdit={handleEdit} />
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
