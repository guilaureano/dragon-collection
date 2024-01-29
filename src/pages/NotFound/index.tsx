import { Button, Text } from 'components';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='page'>
      <div className='page-panel'>
        <Text.Title className='page-title'>Error 404</Text.Title>
        <Text.Subtitle>Página não encontrada</Text.Subtitle>
        <div className='page-action'>
          <Button onClick={() => navigate('/')}>Ir paga tela inicial</Button>
        </div>
      </div>
    </div>
  );
};
