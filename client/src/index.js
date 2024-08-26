import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BookZone from './biblio/BookZone'

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    book: new BookZone(),
    author: new BookZone(),
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);


