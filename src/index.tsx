import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const { REACT_APP_AUTH0_DOMAIN:authDomain, REACT_APP_AUTH0_CLIENT_ID:clientId} = process.env;

root.render(
  <Auth0Provider
  domain={`${authDomain}`}
  clientId={`${clientId}`}
  authorizationParams={{
  redirect_uri: "http://localhost:3008/callback",
  }}>
    <BrowserRouter>
     <Provider store={store}>
      <App />
     </Provider>
   </BrowserRouter>
   </Auth0Provider>
);


