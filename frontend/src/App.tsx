import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import IndicatorsAdmin from "./pages/admin/Indicators";

import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Login />} />

          <Route
            path="/Dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/indicators"
            element={
              <PrivateRoute>
                <IndicatorsAdmin />
              </PrivateRoute>
            }
          />

        </Routes>
        
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
