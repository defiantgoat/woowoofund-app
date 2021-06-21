import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// Needed for Hot Module Replacement
// @ts-ignore
if (typeof(module.hot) !== 'undefined') {
  // @ts-ignore
  module.hot.accept(); // eslint-disable-line no-undef  
}
