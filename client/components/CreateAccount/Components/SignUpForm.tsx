import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import OAuth2Buttons from "./OAuth2Buttons.tsx";
import SignUpPageText from "./SignupPageText.tsx";
import Divider from "./Divider.tsx";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { localSignInError } from '../../error_handler.ts';
import * as Sentry from "@sentry/react";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
     await axios.post(
      
      "https://doneflow.onrender.com/users/create-local-account",
      formData
    );
    navigate("/login");
  } catch (error: any) {
    if(typeof error == "object"){
      const error_body = error.response?.data;
      const error_type: string = (error_body) ? error_body.type : "other";
      if(typeof localSignInError == "object"){
          if(error_type === "validation"){
            const validation_error_type: 'firstname' | 'lastname' | 'password' | 'email' | 'other' = (error_body) ? error_body.error[0].msg : "other";
            const validation_errors = localSignInError[error_type];
            setMessage(validation_errors[validation_error_type]);
          }else if(error_type == "server"){
            setMessage(localSignInError.server);
            Sentry.captureException(error);
          }else{
            Sentry.captureException(error);
            setMessage(localSignInError.other);
          }
      }
    }else{
      Sentry.captureException(error);
      setMessage(localSignInError.other);
    }
  }
};


  return (
    <div className="w-full max-w-md mx-auto">
      <SignUpPageText />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
              required
            />
          </div>
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
            required
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="rounded hover:cursor-pointer"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{' '}
            <a href="#" className="text-pink-400 hover:text-pink-700">
              Terms & Conditions
            </a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-400 hover:cursor-pointer text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          disabled={!formData.agreeToTerms}
        >
          Create account
        </button>

        <p className="font-['Inter'] text-center text-red-600 font-thin text-xl uppercase tracking-wide animate-pulse">{message}</p>


        <Divider />
        <OAuth2Buttons />
      </form>
    </div>
  );
};

export default SignUpForm;
