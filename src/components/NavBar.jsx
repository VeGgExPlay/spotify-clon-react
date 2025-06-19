import { Bell, Download, Explore, House, Logo, Magnifyer, People } from "../icons/Library";

export function NavBar() {
  return (
    <div className="flex flex-1 h-full items-center px-4">
      <div className="flex w-full h-full justify-between items-center gap-4">
        <section className="flex flex-1 h-full justify-between items-center gap-10">
          <div className="h-3/4 cursor-pointer">
            <Logo></Logo>
          </div>
        </section>
        <section className="flex flex-1 justify-center items-center h-full gap-2">
            <button className="bg-[#3f3f3f] h-full rounded-full cursor-pointer p-3 opacity-75 transition-all duration-300 hover:opacity-100 hover:scale-105">
            <House></House>
          </button>
          <div className="flex outline-2 outline-transparent bg-[#3f3f3f] h-full rounded-full gap-4 opacity-75 transition-all duration-300 hover:opacity-100 focus-within:outline-white">
            <div className="flex h-full p-3">
              <Magnifyer />
            </div>
            <div className="flex w-full h-full">
              <input
                type="text"
                className="flex h-full text-xl w-90 appearance-none bg-transparent border-none outline-none focus:outline-none"
                placeholder="¿Qué quieres reproducir?"
              />
            </div>
            <div className="relative flex h-full p-3">
              <div className="absolute border-l-1 h-3/6 self-center -mx-3"></div>
              <Explore />
            </div>
          </div>
        </section>
        <section className="flex flex-1 h-full justify-end gap-6">
            <button className="bg-white text-black font-bold rounded-full px-4">
              <span>
                Descubrir Premium
              </span>
            </button>
            <button className="flex h-full gap-2 items-center cursor-pointer opacity-75 transition-all duration-300 hover:opacity-100 hover:scale-102">
              <span className="h-1/3">
                <Download />
              </span>
              <span>
                Instalar app
              </span>
            </button>
            <div className="flex h-full items-center gap-5">
              <button className="flex h-1/3 items-center cursor-pointer opacity-75 transition-all duration-300 hover:opacity-100 hover:scale-105">
                <Bell />
              </button>
              <button className="flex h-1/3 items-center cursor-pointer opacity-75 transition-all duration-300 hover:opacity-100 hover:scale-105">
                <People />
              </button>
            </div>
            <div className="flex bg-[#3f3f3f] rounded-full aspect-square h-full p-2 overflow-hidden items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105">
              <img className="h-full w-full object-cover rounded-full" src="https://i.scdn.co/image/ab67757000003b8269488b2bf7f7e5e58ac6575c" alt="" />
            </div>
        </section>
      </div>
    </div>
  );
}
