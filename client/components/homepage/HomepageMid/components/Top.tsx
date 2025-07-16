import snippet1 from "../images/fsnippet2.webp";

interface Prop {
    title: string,
    desc: string,
    listitems: string[],
    img: string
}

function Top({title, desc, listitems, img}: Prop) {
  return (
    <div className="font-sans bg-[#fdfdfd] w-[30%] h-full border-b border-b-gray-200 p-8">
  <h1 className="text-pink-400 text-xl font-semibold mb-2">{title}</h1>
  <p className="text-gray-700 text-sm leading-snug">
    {desc}
  </p>
  <div className="relative w-[100%] h-[60%] rounded-xl overflow-hidden bshadow-sm">
  <img
    src={snippet1}
    alt="Project Overview"
    className="w-full h-auto object-cover"
  />
  <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-[#fdfdfd] to-transparent pointer-events-none" />
</div>

</div>

  );
}

export default Top;

/*
import snippet1 from "../images/snippet1.webp";

interface Prop {
    title: string,
    desc: string,
    listitems: string[],
    img: string
}

function Top({title, desc, listitems, img}: Prop) {
  return (
    <div className="font-['Inter'] bg-white w-[50%] h-full border border-gray-200 rounded-2xl p-8 shadow-md">
      <h1 className="text-4xl font-bold text-pink-400 mb-4">{title}</h1>
      <p className="text-gray-700 text-lg mb-6 leading-relaxed">
        {desc}
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-700 text-base mb-8">
        {listitems.map((element: string, index) => (
            <li key={index}>{element}</li>
        ))}
      </ul>

      <div
        className="overflow-hidden rounded-2xl border border-gray-100 w-[100%em] h-[33em]"
        style={{
          boxShadow:
            "0 -4px 6px rgba(0, 0, 0, 0.1), " +
            "4px -2px 6px rgba(0, 0, 0, 0.04), " +
            "-4px -2px 10px rgba(0, 0, 0, 0.12)",
        }}
      >
        <img
          src={img}
          alt="Screenshot preview"
          className="w-full h-auto block object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}

export default Top;

*/
