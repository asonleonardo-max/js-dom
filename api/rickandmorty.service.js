
const BASE_URL = "https://rickandmortyapi.com/api";

async function pedir(ruta) {
  const respuesta = await fetch(BASE_URL + ruta);

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}`);
  }

  return respuesta.json();
}

// Obtener personaje por ID
export function obtenerPersonaje(id) {
  return pedir(`/character/${id}`);
}

// Listar personajes
export function listarPersonajes(limite) {
  return pedir(`/character?page=1`);
}
