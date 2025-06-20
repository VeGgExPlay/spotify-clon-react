import './App.css'
import { AsideMenu } from './components/AsideMenu'
import { MainContent } from './components/MainContent'
import { NavBar } from './components/NavBar'
import { PlayingBar } from './components/PlayingBar'

function App() {
  return (
    <>
      <div id='app' className='relative h-screen p-2 gap-2'>
        <nav className='[grid-area:navbar]'>
          <NavBar></NavBar>
        </nav>
        <aside className='[grid-area:aside] flex-col flex overflow-y-auto'>
          <AsideMenu />
        </aside>
        <main className='[grid-area:main] rounded-lg bg-[#202020] overflow-y-auto'>
          <MainContent />
        </main>
        <footer className='[grid-area:player] rounded-lg min-h-[100px] '>
          <PlayingBar />
        </footer>
      </div>
    </>
  )
}

export default App
