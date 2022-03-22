import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
  "https://api-us-east-1.graphcms.com/v2/cl110ck2a1hjq01z14nfo2hkj/master",
  {
    headers: {
      authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDc4OTk1MDcsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2NsMTEwY2syYTFoanEwMXoxNG5mbzJoa2ovbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYTRlYTI2NGItMWE0My00YTM1LWIxNTgtNzA2YzA1MjNmZjQwIiwianRpIjoiY2wxMTh0aGV2MjhqNzAxejFmZDVrZzR2cyJ9.L_9Z2vjow611cKw_SeHx4UxtOgC8TFOumZ7DfLLbb3nU3ArqTAWV8x9rhVbujV3rJ_sDwMaeybLwW1n39jWmwX5yMqLDVubqZD6z1ajFpcwvDIBiCMQTn5QnvfZ3gAuCk_Vw4MvMqFYmAl-ohD3jhdVutE8kGJsQINFmEBb4WlZZvMVjEc22RXrHRhkXPblCgh0clblK70E1X0pg44vgfNNymYeP66U3hKi6kwn4mJ4gtkB-ufYtFeAzghX98LxgBCZ7nd4-Kf242FPHj2XMXrBaAJTB2-tmte8QoSNeX1jf5NP-m7SJmTyJjYb8-L7412e3vMJzXYEK9iywE8Zg24Bvj0iFjzKC-aVETaSa_TlahSTuQ-UN1Av-OTtqQZ8YKhnvSIz5BaPY0u9Kjl-Bw7KeIhaSkQhcykXpFrHNu2eKT1T0RoHdIxQrURj3aE_saTTQgMdAjHG00LXfNDBhHhOB7r9UQfHqlJydAw7CJ1tjo6z1YPvS-ImGIQIBs6CbEWpFYY4tQloTn_hAp9QAC_pc8pUuH9LDmHCg7LTA47dC8bQQqNfvZRkEx3HEKtdESuVZ6dU9fRTv3_k-w3oEqcOFyMsrgcIwn0jlBG_-hdOK6Wp7n7mUru8Ou9ASRpuIV05mlxdwriwhtL9kvFA4XmwozMHgC4Uoe-P67rRyaeo`,
    },
  }
);

export async function recibirPlatosCMSAPI() {
  try {
    const query = `query Platos {
        platos {
          imagen
          nombre
          ingredientes
          precio
          id
        }
      }
    `;
    const data = await client.request(query);
   
    return data.platos;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function agregarPlatoCMSAPI(plato) {
  try {
    const response = await client.request(`mutation  {
        createPlato(data: {imagen: "${plato.imagen}", ingredientes: "${plato.ingredientes}", nombre: "${plato.nombre}", precio: ${plato.precio}}) {
          id
          imagen
          ingredientes
          nombre
          precio
        }
      }
        `);

    const res = await publicarPlatoCMSAPI(response.createPlato.id);

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function publicarPlatoCMSAPI(id) {

  try {
    const response = await client.request(`mutation   {
            publishPlato(where: {id: "${id}"}, to: PUBLISHED) {
              id
            }
          }
            `);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function borrarPlatoCMSAPI(id) {
  try {
    const response = await client.request(`mutation {
            deletePlato(where: {id: "${id}"}) {
            id
            }
        }
            `);

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function actualizarPlatoCMSAPI(plato) {
  try {
    const response = await client.request(`mutation {
                updatePlato(data: {imagen: "${plato.imagen}", ingredientes: "${plato.ingredientes}", nombre: "${plato.nombre}", precio: ${plato.precio}}, where: {id: "${plato.id}" }) {
                id
                imagen
                ingredientes
                nombre
                precio
                }
            }
                `);
    await publicarPlatoCMSAPI(plato.id);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
