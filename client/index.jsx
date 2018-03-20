import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './App';
import configureStore from './store/configureStore';
import { BrowserRouter } from 'react-router-dom'

const store = configureStore();
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Component store={store}/>
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root'),
  );
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js').catch(() => {
      });
    });
  }
};

render(App);
if (module.hot) {
  module.hot.accept();
}
