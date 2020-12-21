import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Footer from './components/Footer'
import Header from './components/Header'
import Enquiry from "./components/Enquiry"
import {BrowserRouter, Route,Router, Link} from 'react-router-dom'


ReactDOM.render(
  <BrowserRouter>
                <div className="container">
                
                <header>
                    <Header></Header>
                </header>
                    <Route exact path='/'component={App}></Route>
                    <Route path='/enquiries'component={Enquiry}></Route>
                <Footer/>
                </div>
            </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
