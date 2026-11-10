
import {
  obtenerPokemon,
  listarPokemon,
  obtenerTipo
} from "./pokeapi.service.js";

import {
  obtenerPersonaje,
  listarPersonajes
} from "./rickandmorty.service.js";

async function main() {
  try {

    // POKÉMON
    const pokemon = await obtenerPokemon("pikachu");

    console.log("INFORMACIÓN DEL POKÉMON");
    console.log("Nombre:", pokemon.name);
    console.log("Altura:", pokemon.height / 10, "m");
    console.log("Peso:", pokemon.weight / 10, "kg");

    const lista = await listarPokemon(10);

    console.log("\nLISTA DE POKÉMON");

    lista.results.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
    });

    const tipo = await obtenerTipo("fire");

    console.log("\nPOKÉMON TIPO FUEGO");

    tipo.pokemon.forEach((p, i) => {
      console.log(`${i + 1}. ${p.pokemon.name}`);
    });


    // RICK AND MORTY
    const personaje = await obtenerPersonaje(1);

    console.log("\nPERSONAJE DE RICK AND MORTY");
    console.log("Nombre:", personaje.name);
    console.log("Estado:", personaje.status);
    console.log("Especie:", personaje.species);
    console.log("Origen:", personaje.origin.name);

    const personajes = await listarPersonajes(10);

    console.log("\nLISTA DE PERSONAJES");

    personajes.results.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
    });

  } catch (error) {
    console.log("Ocurrió un error:", error.message);
  }
}

main();

