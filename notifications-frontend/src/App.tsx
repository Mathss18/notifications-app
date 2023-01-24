import { CssBaseline } from '@mui/material';
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from 'react-query';
import SelectedApplicationContextProvider from './context/SelectedApplicationContext';
import SideMenuContextProvider from './context/SideMenuContext';
import Router from "./routes/routes";

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <CssBaseline />
      <Toaster
        position="top-right"
        gutter={8}
        containerClassName="toast-container-all"
        containerStyle={{
          zIndex: 99999
        }}
        toastOptions={{
          style: {
            zIndex: 99999
          },
          // Define default options
          className: "toast-container",
          duration: 5000,
          // Default options for specific types
        }}
      />
      <QueryClientProvider client={queryClient}>
        <SelectedApplicationContextProvider>
          <SideMenuContextProvider>
            <Router />
          </SideMenuContextProvider>
        </SelectedApplicationContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;