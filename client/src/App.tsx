import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateAccount from "../components/CreateAccount/CreateAccount.tsx"
import HomePage from "../components/homepage/HomePage.tsx"
import Login from "../components/Login/Login.tsx";

const App = () => {
  return (
    <BrowserRouter>

    {/* ROUTES*/}
    <Routes >
      <Route path="/" element={<HomePage />}/>
      <Route path="tasks"/>   
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
