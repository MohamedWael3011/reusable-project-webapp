import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// import { HomeView } from "./views/HomeView";
import UserMainView from "./views/UserMainView";
import {Login} from "./views/Login"

const App = () => {
  return (
    <Routes>
      {/* Define your routes */}
      <Route path="/" element={<UserMainView />} />
      <Route path="/signin" element={<Login/>} />
      <Route path="/signup" element={<>Sign up</>} />

      {/* Redirect unmatched routes to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;


