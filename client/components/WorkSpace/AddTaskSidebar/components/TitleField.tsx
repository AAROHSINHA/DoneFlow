import {Plus} from "lucide-react";
import { useRef, useEffect, useContext } from "react";
import {SidebarContext} from "../../SidebarContext.ts";

interface TitleFieldInterface {
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>
    reload: boolean
}


const TitleField:React.FC<TitleFieldInterface> = ({title, setTitle, reload}) => {
  const sidebarcontext = useContext(SidebarContext);
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
      setTitle(""); 
    }, [reload])
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Task Title</label>
            <input
              ref={ref}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
            />
          </div>
    )
}

export default TitleField;
