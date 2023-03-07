import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux"
import App from './App';
import { store } from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppNavigation } from './navigation';
import '../src/styles/_global.scss'
import { SnackbarProvider } from 'notistack';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'top' }} autoHideDuration={3000}>
        <Router>
          <AppNavigation />
        </Router>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
