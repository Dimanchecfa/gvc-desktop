import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './utilities/context/authContext';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from './routers/renderRouter';
import { ToastContainer } from 'react-toastify';
import { routes } from './routers/routes';
import { AppProvider } from "./utilities/context/appContext";
import MainLoadable from "./components/loadable";

function App() {
  return (
    <AppProvider>
            <AuthProvider>
                
                    <BrowserRouter>
                        <MainLoadable>
                            {renderRoutes(routes)}
                            <ToastContainer />
                        </MainLoadable>
                    </BrowserRouter>
                
            </AuthProvider>
        </AppProvider>
  );
}

export default App;
