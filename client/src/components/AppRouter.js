import React, {useContext} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {publicRoutes} from '../routes';
import {Context} from '../index';
import {BOOKS_ROUTE} from '../utils/consts';

const AppRouter = () => {
  return (
    <Routes>
    {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={<Component/>} exact/>
      )}
      <Route path="*" element={<Navigate to={BOOKS_ROUTE} />} />
    </Routes>
  );
};

export default AppRouter;
