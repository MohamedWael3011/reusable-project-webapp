import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { HomeView } from "./views/HomeView";

const App = () => {
  return (
    <Routes>
      {/* Define your routes */}
      <Route path="/" element={<HomeView />} />
      <Route path="/signin" element={<>Sign In</>} />
      <Route path="/signup" element={<>Sign up</>} />

      {/* Redirect unmatched routes to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
