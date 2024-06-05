import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import ToastContainerComponent from './components/helpers/ToastContainerComponent.jsx';
import { store, persistor } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { SkeletonTheme } from 'react-loading-skeleton';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
      <SkeletonTheme baseColor="#E0E0E0" enableAnimation={true} highlightColor="#F5F5F5">
        <BrowserRouter> {/* Wrap the entire component tree */}
          <App />
          <ToastContainerComponent />
        </BrowserRouter>
        </SkeletonTheme>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
