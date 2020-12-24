import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from './components/Header';
import Entradas from './components/Entradas';
import NuevaEntrada from './components/NuevaEntrada';
import EditarEntrada from './components/EditarEntrada';

// Redux
import { Provider } from "react-redux";
import store from './store';

function App() {
  return (
    <Router>
    <Provider store={store} >
      <Header />
      <div className="container mt-5" >
        <Switch>
          <Route exact path="/" component={Entradas} />
          <Route exact path="/entradas/nueva" component={NuevaEntrada} />
          <Route exact path="/entradas/editar/:id" component={EditarEntrada} />
        </Switch>
      </div>
    </Provider>    
    </Router>
  );
}

export default App;
