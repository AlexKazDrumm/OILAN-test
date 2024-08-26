import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import JarvisUI from "./components/JarvisUI";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import './pages/style.css'

const App = observer(() => {
  return (
    <BrowserRouter>
      <JarvisUI />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
