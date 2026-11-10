const url = "https://pokeapi.co/api/v2/pokemon/noexiste";

async function main() {
  const respuesta = await fetch(url);
  console.log("Código:", respuesta.status);

  if (!respuesta.ok) {
    console.log("EL POKEMON NO EXISTE");
    return;
  }

  const datos = await respuesta.json();
  console.log("Nombre:", datos.name);
  console.log("Altura:", datos.height / 10, "m");
  console.log("Peso:", datos.weight / 10, "kg");
  console.log("Tipos:", datos.types.map(t => t.type.name).join(", "));
}

main();