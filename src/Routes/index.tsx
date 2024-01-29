import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAuth } from 'hooks';
import { Home } from 'pages/Home';
import { Signin } from 'pages/Signin';
import { Signup } from 'pages/Signup';
import { DragonDetails } from 'pages/DragonDetails';
import { DragonEdit } from 'pages/DragonEdit';
import { DragonRegister } from 'pages/DragonRegister';

const Private = ({ Item }: { Item: FC }) => {
  const auth = useAuth();

  return auth?.email ? <Item /> : <Signin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Private Item={Home} />} />
        <Route path='/dragon/:id' element={<Private Item={DragonDetails} />} />
        <Route path='/dragon/new' element={<Private Item={DragonRegister} />} />
        <Route
          path='/dragon/edit/:id'
          element={<Private Item={DragonEdit} />}
        />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
