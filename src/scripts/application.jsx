import React from 'react'
import {render} from 'react-dom'
import {Router, Route, Link, hashHistory } from 'react-router'
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Guest from './pages/guest.jsx';


render(
    <Router history={hashHistory}>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}/>


    </Router>,
    document.getElementById('root')
);