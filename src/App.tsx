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
import DeleteTheme from "./views/DeleteTheme_admin";
// import ReportsUpload from "./views/ReportsUpload";
// import SubmitProposal from "./views/proposalsubmission";
// import DeleteTheme from "./views/DeleteTheme_admin";
// import SendReportref from "./views/Send_Report_Referee";
import SendReportref from "./views/Send_Report_Referee";
import RememberRoute from "./route/Remember.route";
// import Referee from "./views/Referee";
import DetailedProposalView from "./views/detProp";
import DetailedReportsView from "./views/detRep";
import UpdateProposal from "./views/UpdateProposal";
import UserDeleteView from "./views/UserDeleteView";
import SubmitProposal from "./views/proposalsubmission";
import ReportsUpload from "./views/ReportsUpload";
import Referee from "./views/Referee";

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
        <Route path="/admin" element={<AdminMainView />} />
        <Route path="/admin/addTheme" element={<AddThemePage />} />
        <Route path="/admin/UpdateTheme" element={<UpdateTheme />}/>
        <Route path="/admin/DeleteTheme" element={<DeleteTheme />}/>
        <Route path="/admin/assignreferee" element={<AdminAssignRefereeView />} />
        <Route path="/admin/sendfinalreports" element={<SendReportref/>} />
        <Route path="/user" element={<UserMainView />} />
        <Route path="/user/updateproposal" element={<UpdateProposal/>} />
      <Route path="/user/deleteproposal" element={<UserDeleteView/>} /> 
      <Route path="/user/submitproposal" element={<SubmitProposal/>} />
      <Route path="/user/submitreport" element={<ReportsUpload/>} />
      <Route path="/referee" element={<Referee/>} />
      <Route path="/referee/DetailedProposalView" element={<DetailedProposalView/>} />
      <Route path="/referee/DetailedReportsView" element={<DetailedReportsView/>} />

      </Route>
      {/* Redirect unmatched routes to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;