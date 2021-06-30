import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import LoginForm from "./components/Page/LoginForm";
import "@material-tailwind/react/tailwind.css";
import "./App.css";
import AuthService from "./services/AuthService";
import MainPage from "./components/Page/MainPage";
import StaffsListPage from "././components/Page/Staff/StaffsManager";
import DepositPage from "./components/Page/DepositPage";
import WithdrawPage from "./components/Page/WithdrawPage";
import CheckTransactionPage from "./components/Page/CheckTransactionPage";
import NewStaffForm from "./components/Page/Staff/NewStaffForm";
import Modal from "./components/partials/Modal";
import EditStaffForm from "./components/Page/Staff/EditStaffPage";
import ProfileStaff from "./components/Page/Staff/ProfilesStaffPage";
import RecoverStaff from "./components/Page/Staff/RecoverStaffPage";
import DepositAndWithdrawPage from "./components/Page/DepositAndWithdrawPage";
import StaffActivityPage from "./components/Page/StaffActivityPage";
import ShowStaffActivityPage from "./components/Page/ShowStaffActivityPage";
import UserManage from "./components/Page/User/UserManagePage";
import UserProfile from "./components/Page/User/UserProfilePage";
import RecoverUser from "./components/Page/User/RecoverUserPage";
import ProfileDisableStaff from "./components/Page/Staff/ProfiledisableStaffPage";
import UserRecoverProfile from "./components/Page/User/UserRecoverProfilePage";
import EditUserPage from "./components/Page/User/EditUserPage";
import SearchUserPage from "./components/Page/User/SearchUserPage";
import ViewTransactionPage from "./components/Page/ViewTransactionPage";

const App = () => {
  const [username, setUsername] = useState<string | null>(null);
  const history = useHistory();
  useEffect(() => {
    setUsername(AuthService.getUsername());
  }, []);
  const handleuserLogin = () => {
    setUsername(AuthService.getUsername());
  };
  const logout = () => {
    AuthService.logoutUser();
    setUsername(null);
  };

  if (AuthService.getAccessToken() === undefined) {
    return (
      <Router>
        <Route path="/">
          <LoginForm loginCallback={handleuserLogin} />
        </Route>
      </Router>
    );
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/Modal">
            <Modal />
          </Route>
          <Route path="/StaffProfile">
            <ProfileStaff />
          </Route>
          <Route path="/SearchUserPage">
            <SearchUserPage />
          </Route>
          <Route path="/UserProfile">
            <UserProfile />
          </Route>
          <Route path="/Deposit">
            <DepositPage />
          </Route>
          <Route path="/CheckTransaction">
            <CheckTransactionPage />
          </Route>
          <Route path="/StaffActivityPage">
            <StaffActivityPage />
          </Route>
          <Route path="/ViewTransaction">
            <ViewTransactionPage />
          </Route>
          <Route path="/UserManage">
            <UserManage />
          </Route>
          <Route path="/RecoverUser">
            <RecoverUser />
          </Route>
          <Route path="/UserRecoverProfile">
            <UserRecoverProfile />
          </Route>
          <Route path="/DepositandWithdraw">
            <DepositAndWithdrawPage />
          </Route>
          <Route path="/ProfileDisableStaff">
            <ProfileDisableStaff />
          </Route>
          <Route path="/ShowStaffActivityPage">
            <ShowStaffActivityPage />
          </Route>
          <Route path="/EditUserPage">
            <EditUserPage />
          </Route>
          <Route path="/EditStaff">
            <EditStaffForm />
          </Route>
          <Route path="/NewStaffForm">
            <NewStaffForm />
          </Route>
          <Route path="/RecoverStaff">
            <RecoverStaff />
          </Route>
          <Route path="/Withdraw">
            <WithdrawPage />
          </Route>
          <Route path="/Staffs">
            <StaffsListPage />
          </Route>
          <Route path="/Mainpage">
            <MainPage />
          </Route>
          <Route path="/">
            <LoginForm loginCallback={handleuserLogin} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
