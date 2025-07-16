import { LayoutGrid, FolderKanban, PenTool } from "lucide-react";

export default function Content() {
  return (
    <section className="w-full py-16 ">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12">
  

        {/* Right: Text and Icons */}
        <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">
              Built for Creatives,{" "}
              <span className="text-pink-500">by Creatives</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Our all-in-one toolkit empowers creative minds with powerful features,
              seamless file sharing, and complete design freedom — all crafted
              by creatives, for creatives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <LayoutGrid className="w-10 h-10 text-pink-500 mb-2" />
              <p className="font-medium text-gray-900">All-In-One Toolkit</p>
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <FolderKanban className="w-10 h-10 text-pink-500 mb-2" />
              <p className="font-medium text-gray-900">Integrated File Sharing</p>
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <PenTool className="w-10 h-10 text-pink-500 mb-2" />
              <p className="font-medium text-gray-900">Total Design Freedom</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
