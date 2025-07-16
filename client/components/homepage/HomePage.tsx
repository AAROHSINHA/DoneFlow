import NavbarMain from "./NavbarMain"
import HomepageTop from "./HomepageTop/HomepageTop.tsx";
import HomePageMid from "./HomepageMid/HomepageMid.tsx";
import Footer from "./Footer/Footer.tsx";
import FeedbackForm from "./FEEDBACK/FeedbackForm.tsx";
import HomepageMockup from "./HomepageMockup/HomepageMockup.tsx";
import FeatureCards from "./FeatureCards/FeatureCards.tsx";
import GetStartedCta from "./JoinToday/GetStartedCta.tsx";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {LoginContext} from "./Context.ts";


function HomePage() {
  const [login, setLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const scrollComponent = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const checkLogin = async () => {
      try{
        const res = await axios.get("http://localhost:5000/users/check-login", {
            withCredentials: true,
          });
        if(res.data.loggedIn){
          setLogin(true);
          setEmail(res.data.user.email);
        }else{
          setLogin(false);
        }
      }catch(error){
        alert("Some Error Occured");
      }
    }

    checkLogin();
  }, []);
  return (
    <div className="overflow-x-hidden">
      <LoginContext.Provider value={{loggedIn: login, email: email, scrollTo: scrollComponent}}>
      <NavbarMain  />
      <HomepageTop />
      <HomePageMid  />
       {/* <HomepageMockup />  */}
       <FeatureCards />
       <GetStartedCta />
      <FeedbackForm />
      <Footer />

      </LoginContext.Provider>
    </div>
  )
}

export default HomePage
