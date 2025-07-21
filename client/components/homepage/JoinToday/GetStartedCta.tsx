import { useContext } from "react";
import { LoginContext } from "../Context";
import { useNavigate } from "react-router-dom";

export default function GetStartedCta() {
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if(loginContext?.loggedIn){
      navigate("/dashboard");
    }else{
      navigate("/create-account");
    }
  }
  return (
    <section className="w-full relative bg-[url('https://images.pexels.com/photos/313690/pexels-photo-313690.jpeg')] bg-cover bg-center py-20 md:py-24 flex items-center justify-center min-h-[300px] max-h-[80vh] px-4 text-center mt-[3em]">
      <div className="absolute inset-0 bg-pink-400/70 opacity-70"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
          Start your productivity journey today.
        </h2>
        <p className="text-white text-lg md:text-xl lg:text-2xl mb-8">
          Join Doneflow and turn your tasks into progress.
        </p>
        <p

          className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-sm text-pink-500 bg-white hover:bg-pink-100 hover:text-pink-600 transition-colors duration-300 hover:cursor-pointer"
          onClick={handleClick}
        >
          {loginContext?.loggedIn ? "View Your Dashboard" : "Create Account For Free!"}
        </p>
      </div>
    </section>
  )
}
