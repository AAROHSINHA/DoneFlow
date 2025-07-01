import {ArrowLeft} from "lucide-react";
import { Link } from "react-router-dom";

function ReturnHome() {
  return (
    <div className="absolute top-6 left-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-100 transition-colors duration-200 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Return Home</span>
          </Link>
        </div>
  )
}

export default ReturnHome
