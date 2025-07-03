import {Tag} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface TagsInterface {
    selectedTags: string[],
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>
}

const Tags:React.FC<TagsInterface> = ({selectedTags, setSelectedTags}) => {
    const [existingTags, setExistingTags] = useState<string[]>([]);
    const [reloadTag, setRealoadTag] = useState(false);
    const [showAddTag, setShowAddTag] = useState(false);
    const [addTagInput, setAddTagInput] = useState("");

    const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
    }

    const addTagButton = () => {
          setShowAddTag(true);
          setRealoadTag(prev => !prev);
      };

    const addInputTagButton = () => {
      if(addTagInput && !existingTags.includes(addTagInput)) setExistingTags(prev => [...prev, addTagInput]);
      setShowAddTag(false);
    }


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
    }, [])


    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <Tag size={16} className="mr-2 text-gray-500" />
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {existingTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`hover:cursor-pointer px-3 py-2 rounded-lg text-sm border transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-pink-50 text-pink-700 border-pink-200 ring-1 ring-pink-200"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {tag}
                </button>
              ))}
              <button
  className={`hover:cursor-pointer px-3 py-2 rounded-lg text-sm border-2 border-dashed border-pink-400 text-pink-600 bg-pink-50 hover:bg-pink-100 shadow-sm hover:shadow-md transition-all`}
  onClick={addTagButton}
>
  +
</button>
            </div>
             {showAddTag && (
  <div className="w-[50%] flex items-center gap-2">
    <input
      type="text"
      placeholder="Add Tag"
      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 text-sm"
      onChange={e => setAddTagInput(e.target.value)}
    />
    <button className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-600 text-sm shadow-sm transition-all hover:cursor-pointer" onClick={addInputTagButton}>
      Add
    </button>
  </div>
)}
            
          </div>
    )
}
export default Tags;
