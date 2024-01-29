import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'components';
import { IDragon } from 'hooks/useDragon/types';
import './table-dragon.scss';

interface ITableProps {
  data: IDragon[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const TableDragon: FC<ITableProps> = ({ data, onDelete, onEdit }) => {
  const navigate = useNavigate();
  return (
    <div className='table-wrapper'>
      <Button className='table-add' onClick={() => navigate('dragon/new')}>
        Adicionar novo dragão
      </Button>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>História</th>
            <th>Criação</th>
            <th colSpan={3}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className='ids'>{item.id}</td>
              <td className='name'>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.histories}</td>
              <td>{item.createdAt}</td>
              <td>
                <Button onClick={() => navigate(`/dragon/${item.id}`)}>
                  Ver mais
                </Button>
              </td>
              <td className='actions'>
                <Button onClick={() => onEdit(item.id)}>Editar</Button>
              </td>
              <td className='actions'>
                <Button onClick={() => onDelete(item.id)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
