import '../App.css'
import { AsideMenu } from './AsideMenu'
import { MainContent } from './MainContent'
import { NavBar } from './NavBar'
import { PlayingBar } from './PlayingBar'
import { FilterProvider } from '../context/FilterContext'
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'
import { MusicIsland } from './MusicIsland'

export function Layout() {
  return (
    <div id="app" className="relative p-2 gap-2">
      <nav className="[grid-area:navbar]">
        <FilterProvider>
          <NavBar></NavBar>
        </FilterProvider>
      </nav>
      <aside id='asideLayout' className="[grid-area:aside] flex-col flex overflow-y-auto">
        <AsideMenu />
      </aside>
      <main id='mainLayout' className="[grid-area:main] rounded-lg bg-[#202020] scrollable">
        <AnimatePresence>
          <Outlet key={location.pathname}/>
        </AnimatePresence>
      </main>
      <footer id='footerLayout' className="[grid-area:player] rounded-lg min-h-[100px] ">
        <PlayingBar />
      </footer>
      <MusicIsland />
    </div>
  );
}
