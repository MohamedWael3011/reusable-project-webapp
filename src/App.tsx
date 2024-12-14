import { Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Login } from "./views/Login";
import { Signup } from "./views/Signup";
import { HomeView } from "./views/HomeView";
import AddThemePage from "./views/AddTheme_admin";
import UpdateTheme from "./views/UpdateTheme_admin";
import { AdminMainView } from "./views/AdminMainView";
import AdminAssignRefereeView from "./views/AdminAssignRefereeView"
import { UserMainView } from "./views/UserMainView";
// import ReportsUpload from "./views/ReportsUpload";
// import SubmitProposal from "./views/proposalsubmission";
// import DeleteTheme from "./views/DeleteTheme_admin";
// import SendReportref from "./views/Send_Report_Referee";
import RememberRoute from "./route/Remember.route";
// import Referee from "./views/Referee";
// import DetailedProposalView from "./views/detProp";
// import DetailedReportsView from "./views/detRep";
import UpdateProposal from "./views/UpdateProposal";

const App = () => {
  return (
    <Routes>
      {/* Define your routes */}
      <Route path="/" element={<HomeView />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<RememberRoute />}>
        <Route path="/home" element={<HomeView />} />
        <Route path="/AddTheme" element={<AddThemePage />} />
        <Route path="/UpdateTheme" element={<UpdateTheme />} />
        <Route path="/admin" element={<AdminMainView />} />
        <Route path="/admin/addTheme" element={<AddThemePage />} />
        <Route path="/admin/AdminAssignRefereeView" element={<AdminAssignRefereeView />} />
        <Route path="/user" element={<UserMainView />} />
      </Route>
      <Route path="/updateproposal" element={<UpdateProposal/>} /> 

      {/* Redirect unmatched routes to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;