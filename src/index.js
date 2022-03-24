import React from 'react';
import ReactDOM from 'react-dom';
import Upload from './components/Upload';
import GetLogin from './components/GetLogin';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate}>
        <GetLogin />
        <Upload />
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


