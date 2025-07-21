import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateAccount from "../components/CreateAccount/CreateAccount.tsx";
import HomePage from "../components/homepage/HomePage.tsx";
import Login from "../components/Login/Login.tsx";
import Profile from "../components/ProfilePage/Profile.tsx";
import ResetPassword from "../components/ResetPassword/ResetPassword.tsx";
import WorkSpace from '../components/WorkSpace/WorkSpace.jsx';
import Dashboard from '../components/Dashboard/Dashboard.jsx';
import Error404 from "../components/Error/Error404.jsx";
import ServerError from "../components/Error/ServerError.tsx";
import ErrorPage from '../components/Error/ErrorPage.tsx';
import ErrorBoundary from '../components/Error/ErrorBoundary.tsx'; // ✅ Import this
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      {/* TOASTER */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            margin: "2em",
            padding: "1em",
            borderRadius: '12px',
            fontSize: '14px',
          },
        }}
      />

      {/* ✅ Wrap routes in ErrorBoundary */}
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="tasks" />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/workspace" element={<WorkSpace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="/500" element={<ServerError />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
