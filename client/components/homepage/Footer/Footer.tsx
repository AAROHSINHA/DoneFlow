

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="font-['Inter'] w-full bg-pink-400 py-12 md:py-16 text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <a href="/" className="text-3xl font-extrabold tracking-tight" >
              DONEFLOW
            </a>
          </div>

          {/* Navigation and Social Links */}
          <div className="grid grid-cols-2 gap-8 md:gap-12 text-sm">
            {/* Site Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Site Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="hover:underline" >
                    ABOUT
                  </a>
                </li>
                <li>
                  <a href="/tasks" className="hover:underline" >
                    TASKS
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="hover:underline" >
                    DASHBOARD
                  </a>
                </li>
              </ul>
            </div>

            {/* Social as */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Social</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline" >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline" >
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline" >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Email and Trademark */}
        <div className="mt-12 pt-8 border-t border-pink-400 text-center text-sm hover:cursor-pointer">
          <p className="mb-2 italic">
            Email:{" "}
            <a href="mailto:doneflow94@gmail.com" className="hover:underline italic">
              doneflow94@gmail.com
            </a>
          </p>
          <p className="italic">&copy; {currentYear} Doneflow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}