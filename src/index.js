import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {StateProvider} from "./components/ContextAPI/StateProvider";
import reducer,{initialState} from "./components/ContextAPI/Reducer";
import axios from 'axios';

// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');


ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
    <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
