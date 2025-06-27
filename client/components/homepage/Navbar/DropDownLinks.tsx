function DropDownLinks(props: {title: String}) {
  return (
    <div className="w-[100%] h-14">
      <a
              href="#about"
              className="text-gray-700 hover:text-gray-900 px-2 py-2 text-base transition-colors font-light flex justify-center hover:cursor-pointer border-l border-gray-300  w-[100%] h-[100%] items-center"
            >
              {props.title}
            </a>
    </div>
  )
}

export default DropDownLinks
