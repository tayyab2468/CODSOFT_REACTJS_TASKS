import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react'; // Ensure you have imported Auth0Provider if it's not already
import CartContextProvider from './Components/CartContextProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-31hjixaozhgrrcz4.us.auth0.com"
    clientId="hEs5F3twozHC8mugwppwuQ3hSl9cy5UB"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
