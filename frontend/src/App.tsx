import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import Indicators from "./pages/Indicators";
import { Comparison } from "./pages/Comparison";

import IndicatorsAdmin from "./pages/admin/Indicators";

import { AuthProvider } from "./context/AuthContext";
import { FilterProvider } from "./context/FilterContext";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <FilterProvider>

        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
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

      </FilterProvider>
    </AuthProvider>
  );
}

export default App;
