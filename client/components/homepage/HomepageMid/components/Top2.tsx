interface Prop {
    title: string,
    desc: string,
    listitems: string[],
    img: string
}

function Top2({title, desc, listitems, img}: Prop) {
  return (
    <div className="font-['Inter'] bg-[#fdfdfd] w-[60%] h-full border-t border-t-gray-200 p-8">
      <h1 className="text-4xl font-bold text-pink-400 mb-4">{title}</h1>
      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
        {desc}
      </p>

    </div>
  );
}

export default Top2;