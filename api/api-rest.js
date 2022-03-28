const host = 'http://localhost:3000/api';

export async function recibirPlatosAPI() {
  try {
    const response = await fetch(host + "/platos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
    });
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function agregarPlatoAPI(plato) {
  try {
    const response = await fetch( host + "/platos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      body: JSON.stringify(plato),
    });
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function actualizarPlatoAPI (plato) {
    
  try {
    const response = await fetch(host + "/platos/" + plato._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      body: JSON.stringify(plato),
    });
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function borrarPlatoAPI(id) {
  try {
    const response = await fetch(host + "/platos/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
    });
    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
