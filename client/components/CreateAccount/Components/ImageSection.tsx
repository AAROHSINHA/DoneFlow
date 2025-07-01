import SignUpContent from "./SignUpContent.tsx"
import img from "./signup.jpg"

const ImageSection = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      
      {/* Full Background Image */}
      <img 
        src={img}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 opacity-60"></div>
      
      {/* Content */}
      <SignUpContent />
    </div>
  );
};

export default ImageSection;
