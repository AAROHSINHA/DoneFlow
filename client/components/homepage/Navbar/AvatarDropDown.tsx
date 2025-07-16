import { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut } from 'lucide-react';
import AvatarButtons from './AvatarButtons';
import LogoutAvatar from './LogoutAvatar';

interface AvatarProps {
  initials?: string;
  name?: string;
  email?: string;
}

const AvatarDropDown: React.FC<AvatarProps> = ({
  initials = 'U',
  name = 'User',
  email = 'exampleuser@gmail.com',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log('Logout clicked');
    setIsOpen(false);
  };

  return (
    <div className="hidden relative md:inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 p-1 rounded hover:cursor-pointer"
      >
        <div className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center hover:cursor-pointer ">
          <span className="text-white text-xs font-semibold">{initials}</span>
        </div>
        <ChevronDown className="w-3 h-3 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded border shadow-lg py-2 z-50">
          <div className="px-3 py-2 text-xs">
            <div className="font-semibold text-gray-900">{name}</div>
            <div className="text-pink-400">{email}</div>
          </div>

          <AvatarButtons />

          <hr className="my-1" />

          <LogoutAvatar setIsOpen={setIsOpen}/>
        </div>
      )}
    </div>
  );
};

export default AvatarDropDown;
