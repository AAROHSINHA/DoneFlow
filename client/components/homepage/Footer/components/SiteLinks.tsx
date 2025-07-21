import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { LoginContext } from "../../Context";

function SiteLinks() {
    const navigate = useNavigate();
    const loginContext = useContext(LoginContext);

    const handleClick = (route: string) => {
        if(!route){
            loginContext?.scrollTo.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
    })
    return;
        }
        if(loginContext?.loggedIn) navigate(route);
        else navigate("/login");
    }

  return (
    <div>
              <h4 className="font-semibold text-lg mb-4">Site Links</h4>
              <ul className="space-y-2">
                <li>
                 <p onClick={() => handleClick("")}>
                  ABOUT
                 </p>
                    
                 
                </li>
                <li>
                  
                 <p onClick={() => handleClick("/workspace")}>
                  WORKSPACE
                 </p>
                  
                    
                 
                </li>
                <li>
                  
                   <p onClick={() => handleClick("/dashboard")}>
                  DASHBOARD
                 </p>
                  
                   
                 
                </li>
              </ul>
            </div>
  )
}

export default SiteLinks
