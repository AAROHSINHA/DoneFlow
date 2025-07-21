import ReturnHome from "../../ProfilePage/components/ReturnHome.tsx";

function SignUpContent() {
  return (
   <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white w-full h-full">
        
        <div className="mb-8">
          {/* <div className="text-3xl font-bold mb-2">DONEFLOW</div> */}
          <button className="text-sm text-white hover:text-white flex items-center space-x-1">
            {/* <span><u><Link to={"/"}>Back to website</Link></u></span> */}
            <ReturnHome />
            {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg> */}
          </button>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-5xl font-bold mb-4 leading-tight">
            Track Progress,<br />
            Get Things Done
          </h2>
        </div>
        
        <div className="flex space-x-2 mt-auto">
          <div className="w-8 h-1 bg-white/50 rounded"></div>
          <div className="w-8 h-1 bg-white/50 rounded"></div>
          <div className="w-8 h-1 bg-white rounded"></div>
        </div>
      </div>
  )
}

export default SignUpContent
