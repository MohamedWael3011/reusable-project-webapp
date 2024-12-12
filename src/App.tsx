import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { HomeView } from "./views/HomeView";

const App = () => {
  return (
    <Routes>
      {/* Define your routes */}
      <Route path="/" element={<HomeView />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/signup" element={<Signup />} /> */}

      {/* Redirect unmatched routes to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
