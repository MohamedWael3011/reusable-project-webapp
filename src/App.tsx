import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// import { HomeView } from "./views/HomeView";
import UserMainView from "./views/UserMainView";
import {Login} from "./views/Login"
import {Signup} from "./views/Signup"
import { HomeView } from "./views/HomeView";
import AddThemePage from "./views/AddTheme_admin";
import UpdateTheme from "./views/UpdateTheme_admin";


const App = () => {
  return (
    <Routes>
      {/* Define your routes */}
      <Route path="/" element={<UserMainView />} />
      <Route path="/signin" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/HomeView" element={<HomeView/>} />
      <Route path="/AddTheme" element={<AddThemePage/>} />
      <Route path="/UpdateTheme" element={<UpdateTheme/>} />
      {/* Redirect unmatched routes to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;


