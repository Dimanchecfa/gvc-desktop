import logo from "./logo.svg";
import "./App.css";
import { AuthProvider } from "./utilities/context/authContext";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "./routers/renderRouter";
import { ToastContainer } from "react-toastify";
import { routes } from "./routers/routes";
import { AppProvider } from "./utilities/context/appContext";
import MainLoadable from "./components/loadable";
import { store } from "./app/store";
import { Provider } from "react-redux";
import {  QueryClient, QueryClientProvider } from "react-query";


function App() {
  const queryClient = new QueryClient();
  return (
    <AppProvider>
      <AuthProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}/>
          <BrowserRouter>
            <MainLoadable>
              {renderRoutes(routes)}
              <ToastContainer />
            </MainLoadable>
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
