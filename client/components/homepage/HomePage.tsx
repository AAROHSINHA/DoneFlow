import NavbarMain from "./NavbarMain"
import HomepageTop from "./HomepageTop/HomepageTop.tsx";
import HomePageMid from "./HomepageMid/HomepageMid.tsx";
import Footer from "./Footer/Footer.tsx";
import FeedbackForm from "./FEEDBACK/FeedbackForm.tsx";
import FeatureCards from "./FeatureCards/FeatureCards.tsx";
import GetStartedCta from "./JoinToday/GetStartedCta.tsx";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {LoginContext} from "./Context.ts";
import * as Sentry from "@sentry/react";
import LoadingOverlay from "../Loading/LoadingOverlay.tsx";

function HomePage() {
  const [login, setLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const scrollComponent = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true); // <-- Step 1: Add this
  const [navbarLoaded, setNavbarLoaded] = useState(true);
  const [loadingOverlay, setLoadingOverlay] = useState(true);

useEffect(() => {
  const checkLogin = async () => {
    try {
      const res = await axios.get("https://doneflow.onrender.com/users/check-login", {
        withCredentials: true,
      });
      if (res.data.loggedIn) {
        const userEmail = res.data.user.email;
        setLogin(true);
        setEmail(userEmail);
        setName(res.data.user.name);
        await setToday(userEmail);
      } else {
        setLogin(false);
      }
    } catch (error) {
      Sentry.captureException(error);
      setLogin(false);
    } finally {
      setLoading(false); // <-- Step 2: Always end loading
    }
  };

  const setToday = async (email: string) => {
    try {
      await axios.post(
        "https://doneflow.onrender.com/stats/update-daily",
        { email },
        { withCredentials: true }
      );
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  checkLogin();
}, []);


  return  (
    <div className="overflow-x-hidden">
      <LoadingOverlay isVisible={navbarLoaded} />
      <LoginContext.Provider value={{ loggedIn: login, email: email, scrollTo: scrollComponent, name: name }}>
        <NavbarMain setNavbarLoaded={setNavbarLoaded} />
        <HomepageTop />
        <HomePageMid />
        <FeatureCards />
        <GetStartedCta />
        <FeedbackForm />
        <Footer />
      </LoginContext.Provider>
    </div>
    
);

}

export default HomePage
