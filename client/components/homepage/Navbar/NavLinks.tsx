function NavLinks() {
  return (
    <div>
      <nav className="hidden md:flex space-x-12 mt-[0.8em]">
            <a
              href="#about"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base transition-colors font-light"
            >
              About
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base transition-colors font-light"
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base transition-colors font-light"
            >
              Tasks
            </a>
          </nav>
    </div>
  )
}

export default NavLinks
