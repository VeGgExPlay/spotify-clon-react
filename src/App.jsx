import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { MainContent } from "./components/MainContent";
import { MusicDetails } from "./components/MusicDetails";
import { ArtistDetails } from "./components/ArtistDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainContent />} />
          <Route path="details/:id" element={<MusicDetails />} />
          <Route path="song/:id" element={<MusicDetails />} />
          <Route path="artist/:id" element={<ArtistDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
