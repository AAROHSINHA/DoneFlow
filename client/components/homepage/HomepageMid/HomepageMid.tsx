import snippet1 from "./images/msnippet1.webp";
import snippet2 from "./images/msnippet4.webp";
import snippet3 from "./images/msnippet3.webp";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context";



const HomePageMid = () => {
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();
  const handleClick = (route: string) => {
    if(loginContext?.loggedIn) navigate(route);
    else navigate("/login");
  }
  const services = [
    {
  id: 1,
  title: "Smart Task Manager",
  description: "Master your day with powerful task boxes packed with titles, tags, priorities, progress bars, deadlines, and time tracking — everything you need to plan and conquer your to-dos.",
  image: snippet1,
  linkText: "Explore Task Manager",
  route: "/workspace"
},
{
  id: 2,
  title: "Deep Focus Timer",
  description: "Stay in the zone and beat distractions. The Focus Timer helps you track estimates, monitor time spent, and build deep focus sessions that shape your most productive workdays.",
  image: snippet2,
  linkText: "Try the Focus Timer",
  route: "/workspace"
},
{
  id: 3,
  title: "Productivity Dashboard",
  description: "Turn insights into action. Visualize your productivity with detailed charts, track progress over time, and discover powerful stats that help you work smarter every single day.",
  image: snippet3,
  linkText: "See the Dashboard",
  route: "/dashboard"
}

  ];

  return (
    <section className="font-['Inter'] py-20 px-6 bg-[#fdfdfd]">
      <div className="max-w-7xl mx-auto" ref={loginContext?.scrollTo}>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            SERVICES
          </h2>
          <div className="w-20 h-1 bg-pink-400 mx-auto"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {services.map((service) => (
            <div key={service.id} className="group hover:cursor-pointer">
              {/* Image Container */}
              <div className="relative overflow-hidden mb-8 bg-gray-100 aspect-[4/3] rounded-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:cursor-pointer"
                />
                <div className="absolute inset-0 bg-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-xl md:text-3xl font-bold text-gray-800 leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
                <div className="font-['Inter'] font-bold tracking-[2px] flex justify-start">
                    <p className="text-pink-400 hover:tracking-[3px] transition-all hover:cursor-pointer" onClick={() => handleClick(service.route)}>{service.linkText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageMid;
