import { CheckSquare, Timer, BarChart3, Clock, LayoutDashboard } from 'lucide-react';

const FeatureCards = () => {
  const features = [
    {
      icon: CheckSquare,
      title: "Detailed Task Planning",
      description: "Add titles, tags, priorities, deadlines, and time estimates for total clarity in your work."
    },
    {
      icon: Timer,
      title: "Stay in Deep Focus",
      description: "Start a task and enter a distraction-free space with a built-in timer to boost concentration."
    },
    {
      icon: BarChart3,
      title: "See Your Progress",
      description: "Track your productivity with insightful charts and metrics to improve over time."
    },
    {
      icon: Clock,
      title: "Track Time Accurately",
      description: "Log estimated and actual time spent on tasks to plan better and stay accountable."
    },
    {
      icon: LayoutDashboard,
      title: "Customizable Dashboard",
      description: "Tailor your workspace to fit your personal workflow and focus on what matters most."
    }
  ];

  return (
    <div className="py-16 px-4 max-w-[82vw] mx-auto bg-[#FDFDFD]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={index}
              className="rounded-2xl py-8 px-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group hover:cursor-pointer"
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center group-hover:bg-pink-100 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-pink-400" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureCards;
