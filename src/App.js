import React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Container from "./components/Container";
import Store from './store/ConfigureStore';

const App = () => (
  <Provider store={Store}>
    <Router>
      <div>
        <Header/>
        <Container/>
      </div>
    </Router>
  </Provider>
);

export default App;