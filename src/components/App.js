import SignUp from "../components/authentication/SignUp";
import SignIn from "../components/authentication/SignIn";
import ForgotPassword from "../components/authentication/ForgotPassword";
import UpdateProfile from "../components/authentication/UpdateProfile";
import { AuthProvider } from "../contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
import Profile from "./authentication/Profile";
import Dashboard from "./google-drive/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignIn></SignIn>} />
        <Route path="/dashboard" element={<Dashboard></Dashboard>} />
        <Route path="/user" element={<Profile></Profile>} />
        <Route
          path="/updateprofile"
          element={<UpdateProfile></UpdateProfile>}
        />
        <Route path="/signup" element={<SignUp></SignUp>} />
        <Route
          path="/forgotpassword"
          element={<ForgotPassword></ForgotPassword>}
        />
        <Route
          path="/folder/:folderId"
          element={<Dashboard></Dashboard>}
        ></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
