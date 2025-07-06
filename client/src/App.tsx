import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateAccount from "../components/CreateAccount/CreateAccount.tsx"
import HomePage from "../components/homepage/HomePage.tsx"
import Login from "../components/Login/Login.tsx";
import Profile from "../components/ProfilePage/Profile.tsx";
import ResetPassword from "../components/ResetPassword/ResetPassword.tsx";
import WorkSpace from '../components/WorkSpace/WorkSpace.jsx';

const App = () => {
  return (
    <BrowserRouter>
    {/* ROUTES*/}
    <Routes >
      <Route path="/" element={<HomePage />}/>
      <Route path="tasks"/>   
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path='/workspace' element={<WorkSpace />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
