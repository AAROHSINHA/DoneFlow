import { ChevronDownIcon, ChevronRightIcon } from "../icons.tsx";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SidebarContext } from "../../SidebarContext.ts";

interface TagProp {
  updateTags: boolean
}

const NavigationTags = ({updateTags}: TagProp) => {
  const sidebarcontext = useContext(SidebarContext);
    const [expandedItems, setExpandedItems] = useState<string[]>([])
    const toggleExpanded = (item: string) => {setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))}
    const [tags, setExistingTags] = useState<string[]>([]);
       useEffect(() => {
      const loadTags = async () => {
        try{
          const res = await axios.get("http://localhost:5000/tasks/get-tags",{
            withCredentials: true
          });
          if(res.data.tags){
           setExistingTags(prev => [
            ...new Set([...prev, ...res.data.tags.filter((tag: string) => tag.trim() !== "")])
          ]);

          }
        }catch(error){
          console.log(`Error loading tags ${error}`);
        }
      }

      loadTags();
    }, [sidebarcontext?.taskReload])
    return (
        <div>
                  <div
                    className="flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                    onClick={() => toggleExpanded("tags")}
                  >
                    <div className="flex items-center">
                      <div className="w-5 h-5 mr-3">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">Tags</span>
                    </div>
                    {expandedItems.includes("tags") ? <ChevronDownIcon /> : <ChevronRightIcon />}
                  </div>
        
                  {expandedItems.includes("tags") && (
                    <div className="ml-8 mt-2 mb-3">
                      <div className="grid grid-cols-2 gap-2">
                        {tags.map((tag, index) => (
                          <div
                            key={index}
                            className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm cursor-pointer hover:bg-pink-100 transition-colors"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
    )
}

export default NavigationTags;