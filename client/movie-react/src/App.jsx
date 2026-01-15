import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="/tasks" element={<TaskPage />} />

        
        <Route
          path="/"
          element={
            <div className="p-6 text-center text-xl font-bold ">
              Welcome to Task Manager
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

