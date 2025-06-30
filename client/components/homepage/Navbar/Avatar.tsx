interface AvatarProps {
  initials?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  initials = 'AS'
}) => {
  return (
    <div className="
      w-10
      h-10
      bg-pink-400
      rounded-full
      flex
      items-center
      justify-center
      text-white
      font-bold
      text-sm
      shadow
      hover:shadow-md
      transition-shadow
      duration-300
      select-none
      cursor-pointer
    ">
      {initials}
    </div>
  );
};

export default Avatar;
