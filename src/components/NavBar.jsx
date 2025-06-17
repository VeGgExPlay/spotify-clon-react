import { Explore, House, Logo, Magnifyer } from "../icons/Library";

export function NavBar() {
  return (
    <div className="flex flex-1 h-full items-center px-4">
      <div className="flex flex-1 h-full items-center gap-4">
        <div className="flex h-full items-center gap-10">
          <div className="h-3/4 cursor-pointer">
            <Logo></Logo>
          </div>
          <button className="bg-[#3f3f3f] h-full rounded-full cursor-pointer p-3 opacity-75 transition-all duration-300 hover:opacity-100 hover:scale-105">
            <House></House>
          </button>
        </div>
        <div className="flex items-center outline-2 outline-transparent bg-[#3f3f3f] h-full rounded-full gap-4 opacity-75 transition-all duration-300 hover:opacity-100 focus-within:outline-white">
            <div className="flex h-full p-3">
                <Magnifyer />
            </div>
            <div className="w-90 h-full">
                <input 
                    type="text"
                    className=" h-full w-full appearance-none bg-transparent border-none outline-none focus:outline-none"
                    placeholder="¿Qué quieres reproducir?"
                />
            </div>
            <div className="relative flex h-full p-3">
                <div className="absolute border-l-1 h-3/6 self-center -mx-3"></div>
                <Explore />
            </div>
        </div>
      </div>
    </div>
  );
}
