import reactDom from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster} from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';

reactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>
);