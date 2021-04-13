import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import './index.css';
import store from './store/configureStore';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
