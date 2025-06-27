

const ImageSection2 = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-pink-100 via-purple-100 to-pink-100 p-8 rounded-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white">
        <div className="mb-8">
          <div className="text-2xl font-bold mb-2">AMU</div>
          <button className="text-sm text-white/80 hover:text-white flex items-center space-x-1">
            <span>Back to website</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Capturing Moments,<br />
            Creating Memories
          </h2>
          
          {/* Placeholder for hero image */}
          <div className="absolute inset-0 opacity-30">
            <img 
              src=""
              alt="Mountain landscape" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex space-x-2 mt-auto">
          <div className="w-8 h-1 bg-white/50 rounded"></div>
          <div className="w-8 h-1 bg-white/50 rounded"></div>
          <div className="w-8 h-1 bg-white rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ImageSection2;