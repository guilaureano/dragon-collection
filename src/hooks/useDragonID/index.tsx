import { IDragon } from 'hooks/useDragon/types';
import { useState } from 'react';

import { dragonService } from 'services/dragon';

interface IDragonByID {
  data: IDragon | null;
  hasError: boolean;
  loading: boolean;
}

export const useDragonID = () => {
  const [list, setList] = useState<IDragonByID>({
    data: null,
    hasError: false,
    loading: true,
  });

  const getDragonByID = async (id: string) => {
    await dragonService
      .getById(id)
      .then(response => {
        setList({ ...list, data: response.data, loading: false });
      })
      .catch(error => {
        console.log('useDragonID ~ getDragonByID ~ error:', error);
        setList({ ...list, hasError: true, loading: false });
      });
  };

  return {
    getDragonByID,
    data: list.data,
    loading: list.loading,
    hasError: list.hasError,
  };
};
