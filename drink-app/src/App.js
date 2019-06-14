import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from './components/navbar.component';
import Home from './components/home.component';

function App() {
  return (
    <Router>
        <Navbar />
        <Route name="home" exact path="/" component={Home} />
    </Router>
  );
}

export default App

