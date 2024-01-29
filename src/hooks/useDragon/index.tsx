import { useState } from 'react';

import { IDragon, IDragonList } from './types';
import { dragonService } from 'services/dragon';
import { useToast } from 'hooks';
import { sortData } from 'utils';

export const useDragon = () => {
  const { showToast } = useToast();
  const [list, setList] = useState<IDragonList>({
    data: [],
    hasError: false,
    loading: false,
  });

  const getList = async () => {
    setList({ ...list, loading: true });

    await dragonService
      .list()
      .then(response => {
        if (response?.data) {
          const sortList = sortData<IDragon>(response.data, 'name');
          setList({ ...list, data: sortList, loading: false });
        }
      })
      .catch(error => {
        console.log('useDragon ~ list ~ error:', error);
        setList({ ...list, hasError: true, loading: false });
      });
  };

  const handleDeleteDragon = async (id: string) => {
    await dragonService
      .delete(id)
      .then(() => {
        showToast({ message: 'Dragão deletado com sucesso!' });
        getList();
      })
      .catch(error => {
        console.log('useDragon ~ list ~ error:', error);
        showToast({
          message: 'Opa! Ocorreu um erro ao tentar deletar o Dragão.',
        });
      });
  };

  return {
    getList,
    data: list.data,
    loading: list.loading,
    handleDeleteDragon,
    hasError: list.hasError,
  };
};
