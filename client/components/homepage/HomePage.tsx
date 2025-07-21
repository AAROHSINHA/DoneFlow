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

function HomePage() {
  const [login, setLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const scrollComponent = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
  const checkLogin = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users/check-login", {
        withCredentials: true,
      });

      if (res.data.loggedIn) {
        const userEmail = res.data.user.email;
        setLogin(true);
        setEmail(userEmail);
        setName(res.data.user.name);
        await setToday(userEmail); // 👈 call only on success
      } else {
        setLogin(false);
      }
    } catch (error) {
      Sentry.captureException(error);
      setLogin(false);
    }
  };

  const setToday = async (email: string) => {
    try {
      await axios.post(
        "http://localhost:5000/stats/update-daily",
        { email },
        { withCredentials: true }
      );
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  checkLogin();
}, []);

  return (
    <div className="overflow-x-hidden">
      <LoginContext.Provider value={{loggedIn: login, email: email, scrollTo: scrollComponent, name: name}}>
      <NavbarMain  />
      <HomepageTop />
      <HomePageMid  />
       <FeatureCards />
       <GetStartedCta />
      <FeedbackForm />
      <Footer />

      </LoginContext.Provider>
    </div>
  )
}

export default HomePage
