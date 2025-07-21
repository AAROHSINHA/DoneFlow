import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReturnHome from '../ProfilePage/components/ReturnHome';
import { useNavigate } from 'react-router-dom';
import { changePasswordError } from '../error_handler';
import * as Sentry from "@sentry/react";

const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [rawToken, setRawToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gotToken, setGotToken] = useState(false);
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleGenerateResend = async () => {
    try{
        const res = await axios.post("http://localhost:5000/users/send-email",
            {email: email},
            {withCredentials: true}
        )
        setRawToken(res.data.rawToken);
        setMessage('');
        setSuccessMessage(`Raw Token sent at email - ${email}. (EXPIRES IN 10 MINUTES!)`);
    }catch(error: any){
        Sentry.captureException(error);
        setMessage("Error Generating Token! Try again in some time...");
    }
    setGotToken(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token !== rawToken){
      setMessage("Invalid Token Entered!");
      return;
    };
    if (newPassword !== confirmPassword) {
      setMessage("Confirmed Password does not match the password entered");
      return;
    }
    if (!(newPassword.length >= 5 && newPassword.length <= 32)) {
      setMessage("Invalid Password Length! Must be between 5-32");
      return;
    }

    try {
      await axios.patch(
        "http://localhost:5000/users/change-password",
        { new_password: newPassword, email },
        { withCredentials: true }
      );
      setMessage('');
      setSuccessMessage("Password Changed Succesfully");
      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error: any) {
      try{
        const error_response_data = error.response.data;
        const type: 'server' | 'credentials' | 'other' = error_response_data.type;
        if(changePasswordError[type]) setMessage(changePasswordError[type]);
        else setMessage("Unexpected error. Please try again later...");
      }catch(e){
        setMessage("Unexpected error. Please try again later...");
      }
    }

  };

  return (
    <div className="min-h-screen bg-white flex justify-center pt-20 px-6">
        <ReturnHome />
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md h-fit border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
          {gotToken ? <p className="text-gray-600 text-sm">
             A token has been sent to your email. Enter it.
          </p> : <p className="text-gray-600 text-sm">
            Click 'Send Token' to generate a token
          </p>}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
           {/* Email Input */}
           {/* Email Input */}
            <div>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            />
            </div>

            {/* Resend Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleGenerateResend}
              className="text-pink-400 hover:cursor-pointer hover:text-pink-500 text-sm font-medium underline"
            >
              {gotToken ? <p>Resend Token</p> : <p>Generate Token</p>}  
            </button>
          </div>

          {/* Token Input */}
          <div>
            <input
              type="text"
              placeholder="Enter token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            />
          </div>

          

          {/* New Password Input */}
          <div>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            />
          </div>
             <p className="font-['Inter'] text-center text-red-600 font-thin text-xl uppercase tracking-wide animate-pulse">{message}</p>
             <p className="font-['Inter'] text-center text-green-600 font-thin text-xl uppercase tracking-wide animate-pulse">{successMessage}</p>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-400 text-white py-3 px-6 rounded-xl font-semibold hover:bg-pink-500 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Submit
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-gray-500 hover:text-pink-400 text-sm transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;