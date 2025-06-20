import { createContext, useState, useContext } from "react";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    title: "",
  });

  // Pasos:
  // 1.- Crear una función que reciba el valor actual del useState de la lista de productos
  // 2.- Retornar la lista de productos ya filtrada con el ".filter(item)" que recibe una función flecha
  // 3.- Dentro de esta última función flecha, retornar un TRUE o FALSE dependiendo de si el item.price es mayor o igual al minPrice del valor actual del useState de los filtros
  // y, además, si la categoría del valor actual de los filtros es igual a "all" O si el item.category es igual a la categoría del valor actual de los filtros
  const filterSong = (songs) => {
    if (!songs) return;

    const normalizedFilter = filters.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim(); // <- elimina espacios al inicio y final

    // Si no hay filtro, devolver todo el array
    if (!normalizedFilter) return songs;

    return songs.filter((song) => {
      const normalizedTitle = song.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim(); // <- elimina espacios al inicio y final
      const normalizedArtist = Array.isArray(song.artist)
        ? song.artist
            .join(" ")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim()
        : song.artist
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

      return (
        normalizedTitle.includes(normalizedFilter) ||
        normalizedArtist.includes(normalizedFilter)
      );
    });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        filterSong,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => useContext(FilterContext);
