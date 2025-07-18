import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import OAuth2Buttons from './components/OAuth2Buttons.tsx';
import Divider from "./components/Divider.tsx";
import LoginTopText from "./components/LoginTopText.tsx";
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReturnHome from '../ProfilePage/components/ReturnHome.tsx';
import { useNavigate } from 'react-router-dom';
import { localLoginError } from '../error_handler.ts';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
  const res = await axios.post("http://localhost:5000/users/local-login", 
    formData,
    { withCredentials: true }
  );
  console.log(res.data);
  navigate("/");
} catch(error: any) {
  try {
    const error_response_data = error.response.data;
    const type = error_response_data.type;
    if (type === "validation") {
      setMessage(localLoginError[type][error_response_data.error[0].msg]);
    } else if (localLoginError[type]) {
      setMessage(localLoginError[type]);
    } else {
      setMessage("Something unexpected happened.");
    }
  } catch (e) {
    setMessage("Unexpected error. Please try again.");
  }
}

  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <ReturnHome />
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <LoginTopText />

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              required
              value={formData.email}
              name='email'
              // onChange={(e) => setEmail(e.target.value)}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all"
              placeholder="Email"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              name='password'
              // onChange={(e) => setPassword(e.target.value)}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all pr-12"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="text-right">
            <Link to={"/reset-password"}>
            <p className="text-pink-400 hover:text-pink-500 font-medium text-sm">
              Forgot password?
            </p></Link>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors hover:cursor-pointer duration-200"
          >
            Sign in
          </button>
        </form>

        <p className="font-['Inter'] text-center text-red-600 font-thin text-xl uppercase tracking-wide animate-pulse">{message}</p>
        <Divider />
        <OAuth2Buttons />
      </div>
    </div>
  );
};

export default Login;

/*
//   const checkSession = async () => {
//   const res = await axios.get("http://localhost:5000/users/me", {
//     withCredentials: true
//   });
//   console.log(res.data);
// }

If things go wrong add this below navigate in handleSubmit
*/