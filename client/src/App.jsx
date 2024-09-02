import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./context/AuthProvider";
import HomePage from "./pages/HomePage";
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/home" element={ <ProtectedRoute> <HomePage /> </ProtectedRoute> }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
