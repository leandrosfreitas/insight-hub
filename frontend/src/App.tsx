import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import Indicators from "./pages/Indicators";
import { Comparison } from "./pages/Comparison";

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

          <Route
            path="/indicators"
            element={
              <PrivateRoute>
                <Indicators />
              </PrivateRoute>
            }
          />

          <Route
            path="/comparison"
            element={
              <PrivateRoute>
                <Comparison />
              </PrivateRoute>
            }
          />

        </Routes>
        
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
