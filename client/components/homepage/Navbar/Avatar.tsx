interface AvatarProps {
  initials?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  initials = 'AS'
}) => {
  return (
    <div className="
        hidden
        sm:flex

      w-10
      h-10
      bg-pink-400
      rounded-full
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
      font-['Inter']
    ">
      {initials}
    </div>
  );
};

export default Avatar;
