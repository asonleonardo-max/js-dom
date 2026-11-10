// pokespi.service.js
const BASE_URL = "https://pokeapi.co/api/v2";

async function pedir(ruta) {
  const respuesta = await fetch(BASE_URL + ruta);

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}`);
  }

  return respuesta.json();
}

// Buscar un Pokémon por nombre
export function obtenerPokemon(nombre) {
  return pedir(`/pokemon/${nombre}`);
}

// Listar Pokémon
export function listarPokemon(limite) {
  return pedir(`/pokemon?limit=${limite}`);
}

// Obtener un tipo de Pokémon
export function obtenerTipo(tipo) {
  return pedir(`/type/${tipo}`);
}
