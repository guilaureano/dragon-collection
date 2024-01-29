import { FC } from 'react';

import './skeleton.scss';
import { Text } from 'components';

interface ISkeleton {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export const Skeleton: FC<ISkeleton> = ({
  width = '75svw',
  height = '50svh',
  borderRadius = '0',
}) => {
  return (
    <div className='skeleton' style={{ width, height, borderRadius }}>
      <Text className='skeleton-text'>Carregando ...</Text>
    </div>
  );
};
