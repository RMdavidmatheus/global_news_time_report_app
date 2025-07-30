import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import AppLayout from "./layouts/AppLayout";
import Activities from "./pages/activities";
import { ProtectedRoute } from "./protected_route/protected_route";
import TaskExpiryWatcher from "./components/expiry_toast/task_expiry_watcher";

function App() {
  return (
    <Router>
      <TaskExpiryWatcher isLogged={sessionStorage.getItem("auth") === "true"} />
      <Routes>
        {/*Navbar Layout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/*No Navbar Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <Activities />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
