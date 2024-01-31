import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './app';
import { GlobalStyles } from '@musclemotion/styles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <GlobalStyles />
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
);
