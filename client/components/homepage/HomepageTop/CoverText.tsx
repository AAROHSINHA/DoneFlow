import StartToday from "./StartTodayButton.tsx";

function CoverText() {
  return (
     <div className="font-['Inter'] relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Decorative avatars */}
          {/* <div className="hidden lg:block">
            <div className="absolute left-4 top-70 sm:left-8 lg:left-100">
            <div className="h-22 w-22 overflow-hidden rounded-full border-4 border-white shadow-lg bg-gray-200">
                <img src="https://cdn.prod.website-files.com/66a76e2a019784d7d9a1624d/66b46ae18dda7c04e57d3583_4-%20User%20Image-p-1080.webp" alt="" />
            </div>
          </div>

          <div className="absolute right-4 top-12 sm:right-8 lg:right-90">
            <div className="h-18 w-18 overflow-hidden rounded-full border-4 border-white shadow-lg bg-gray-200">
                <img src="https://cdn.prod.website-files.com/66a76e2a019784d7d9a1624d/66b04b0e51291b6ece827800_Image%20Collab%202-p-1080.webp" alt="" />
            </div>
          </div>

          <div className="absolute bottom-12 right-8 sm:right-16 lg:right-142">
            <div className="h-30 w-30 overflow-hidden rounded-full border-4 border-white shadow-lg bg-gray-200">
                <img src="https://cdn.prod.website-files.com/66a76e2a019784d7d9a1624d/66b46ae1ec7834b604f37f4c_2-%20User%20Image-p-1080.webp" alt="" />
            </div>
          </div>
          </div> */}
          <div className="hidden lg:block">
  {/* Avatar 1 */}
  <div className="absolute top-[55%] left-[5%] xl:left-[10%]">
    <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-lg bg-gray-200">
      <img src="https://cdn.prod.website-files.com/66a76e2a019784d7d9a1624d/66b46ae18dda7c04e57d3583_4-%20User%20Image-p-1080.webp" alt="Avatar 1" />
    </div>
  </div>

  {/* Avatar 2 */}
  <div className="absolute top-[20%] right-[8%] xl:right-[12%]">
    <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-white shadow-lg bg-gray-200">
      <img src="https://cdn.prod.website-files.com/66a76e2a019784d7d9a1624d/66b04b0e51291b6ece827800_Image%20Collab%202-p-1080.webp" alt="Avatar 2" />
    </div>
  </div>

  {/* Avatar 3 */}
  <div className="absolute bottom-[8%] right-[15%] xl:right-[20%]">
    <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg bg-gray-200">
      <img src="https://cdn.prod.website-files.com/66a76e2a019784d7d9a1624d/66b46ae1ec7834b604f37f4c_2-%20User%20Image-p-1080.webp" alt="Avatar 3" />
    </div>
  </div>
</div>


          {/* Main content */}
          <div className="relative z-10 space-y-8 pt-8 leading-tight">
            <div>
                <h1 className="font-['Inter'] text-2xl tracking-tight text-gray-900 sm:text-4xl lg:text-5xl my-[0.5em]">
              Stop Drowning in To-Dos.
            </h1>

            <h2 className="font-['Inter'] text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Get Things Done with{" "}
              <span className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">DoneFlow</span>
            </h2>
            </div>

            <p className="font-['Inter'] mx-auto max-w-2xl text-md text-gray-600 sm:text-md leading-relaxed">
              Take control of your day with the powerful productivity app. Organize tasks, boost focus, and achieve more
              in less time.
            </p>

            <StartToday />
          </div>
        </div>
      </div>
  )
}

export default CoverText
