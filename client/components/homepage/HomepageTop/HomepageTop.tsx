import CoverText from "./CoverText.tsx"
import img from "./temp.png";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white ">
      {/* Hero Section */}
      <CoverText />
      {/* Dashboard Preview with Pink Glow */}
      <div className="mx-auto max-w-[100em] px-4 pb-16 sm:px-6 lg:px-8">
        <div
          className="overflow-hidden rounded-2xl bg-white border border-gray-100"
          style={{
            boxShadow:
                "0 0 0 1px rgba(244, 114, 182, 0.1), 0 0 20px rgba(244, 114, 182, 0.15), 0 0 40px rgba(244, 114, 182, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}

        >
          <div className="h-230 bg-gray-50">
            <img src={img} alt="" />
          </div>  
        </div>
      </div>
    </div>
  )
}

// export default function HomepageTop() {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <div className="relative px-4 py-20 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-4xl text-center">
//           {/* Decorative avatars */}
//           <div className="absolute left-4 top-8 sm:left-8 lg:left-16">
//             <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-white shadow-lg">
              
//             </div>
//           </div>

//           <div className="absolute right-4 top-12 sm:right-8 lg:right-16">
//             <div className="h-12 w-12 overflow-hidden rounded-full border-4 border-white shadow-lg">
              
//             </div>
//           </div>

//           <div className="absolute bottom-16 right-8 sm:right-16 lg:right-32">
//             <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-lg">
              
//             </div>
//           </div>

//           {/* Main content */}
//           <div className="relative z-10 space-y-8 pt-8">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
//               Stop Drowning in To-Dos.
//             </h1>

//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
//               Get Things Done with{" "}
//               <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">DoneFlow</span>
//             </h2>

//             <p className="mx-auto max-w-2xl text-lg text-gray-600 sm:text-xl">
//               Take control of your day with the powerful productivity app. Organize tasks, boost focus, and achieve more
//               in less time.
//             </p>

//             <div className="pt-4">
//               <button
//   className="rounded-full bg-white px-8 py-4 text-lg font-medium text-gray-900 shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200 border border-gray-200"
// >
//   Start today - <span className="text-pink-500">It's Free!</span>
// </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Dashboard Preview with Circular Gradient */}
//       <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
//         {/* Circular gradient background */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="h-[600px] w-[600px] rounded-full bg-gradient-radial from-pink-200/40 via-pink-100/20 to-transparent"></div>
//         </div>

//         <div className="relative z-10 overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100">
//           <div className="flex h-96 items-center justify-center bg-gray-50/50">
//             <div className="text-center">
//               <div className="mx-auto h-24 w-24 rounded-lg bg-pink-100 flex items-center justify-center mb-4">
//                 <svg className="h-12 w-12 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Project Dashboard Preview</h3>
//               <p className="text-gray-500">Calendar and task management interface will be displayed here</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }