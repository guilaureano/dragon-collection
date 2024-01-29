import { FC } from 'react';

import { Button, Text } from 'components';
import './modal.scss';

interface IModalProps {
  title: string;
  describe: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const Modal: FC<IModalProps> = ({
  title,
  describe,
  onCancel,
  onConfirm,
}) => {
  return (
    <div className='modal-wrap'>
      <div className='modal'>
        <div className='modal-header'>
          <Text.Title>{title}</Text.Title>
          <Button className='close-button' onClick={onCancel}>
            X
          </Button>
        </div>
        <div className='modal-body'>
          <Text>{describe}</Text>
        </div>
        <div className='modal-footer'>
          <Button onClick={onCancel}>Cancelar</Button>
          <Button onClick={onConfirm}>Confirmar</Button>
        </div>
      </div>
    </div>
  );
};
