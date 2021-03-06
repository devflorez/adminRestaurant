import { createContext, useContext, useReducer } from "react";
import ChinoReducer from "./ChinoReducers";
import {
  recibirPlatosCMSAPI,
  agregarPlatoCMSAPI,
  borrarPlatoCMSAPI,
  actualizarPlatoCMSAPI,
} from "../api/cms";
import {
  recibirPlatosAPI,
  agregarPlatoAPI,
  actualizarPlatoAPI,
  borrarPlatoAPI,
} from "api/api-rest";
// Valores Iniciales

const initialState = {
  plato: {
    id: "",
    nombre: "",
    precio: "",
    ingredientes: "",
  },
  platos: [],
  errors: {},
  metodo: "",
};

// Create a context
export const ChinoContext = createContext();

// Provider
export const ChinoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ChinoReducer, initialState);

  // Estos son los actions de la apliacion

  const seleccionarMetodo = (metodo) => {
    localStorage.setItem("metodo", metodo);
    dispatch({
      type: "SELECCIONAR_METODO",
      payload: metodo,
    });
  };

  const recuperarMetodo = () => {
    const metodo = localStorage.getItem("metodo");

    if (metodo) {
      seleccionarMetodo(metodo);
    }
  };

  const recibirPlatos = async () => {
    recuperarMetodo();
    switch (state.metodo) {
      case "cms":
        const renspose = await recibirPlatosCMSAPI();
        dispatch({
          type: "RECIBIR_PLATOS",
          payload: renspose,
        });

        break;
      case "localStorage":
        const platos = JSON.parse(localStorage.getItem("platos")) || [];
        dispatch({
          type: "RECIBIR_PLATOS",
          payload: platos,
        });
        break;
      case "apiRest":
        const platosAPI = await recibirPlatosAPI();
      
        dispatch({
          type: "RECIBIR_PLATOS",
          payload: platosAPI,
        });
        break;
      default:
        break;
    }
  };

  const selecionarPlato = (plato) => {
    dispatch({
      type: "RECIBIR_PLATO",
      payload: plato,
    });
  };
  const agregarPlato = async (plato) => {
    recuperarMetodo();
    switch (state.metodo) {
      case "cms":
        const response = await agregarPlatoCMSAPI(plato);
        dispatch({
          type: "AGREGAR_PLATO",
          payload: response,
        });
        break;
      case "localStorage":
        localStorage.setItem(
          "platos",
          JSON.stringify([
            ...state.platos,
            { ...plato, id: new Date().getTime() },
          ])
        );
        dispatch({
          type: "AGREGAR_PLATO",
          payload: { ...plato, id: new Date().getTime() },
        });
        break;
      case "apiRest":
        const responseAPI = await agregarPlatoAPI(plato);
        dispatch({
          type: "AGREGAR_PLATO",
          payload: responseAPI,
        });
      default:
        break;
    }

    // dispatch({
  };
  const editarPlato = async (plato) => {
    recuperarMetodo();
    switch (state.metodo) {
      case "cms":
        await actualizarPlatoCMSAPI(plato);

        dispatch({
          type: "EDITAR_PLATO",
          payload: plato,
        });

        break;
      case "localStorage":
        localStorage.setItem(
          "platos",
          JSON.stringify(
            state.platos.map((platoLocal) =>
              platoLocal.id === plato.id ? plato : platoLocal
            )
          )
        );
        dispatch({
          type: "EDITAR_PLATO",
          payload: plato,
        });
        break;
      case "apiRest":
        const responseAPI = await actualizarPlatoAPI(plato);
        dispatch({
          type: "EDITAR_PLATO",
          payload: responseAPI,
        });

      default:
        break;
    }
  };
  const eliminarPlato = async (plato) => {
    recuperarMetodo();
    switch (state.metodo) {
      case "cms":
        await borrarPlatoCMSAPI(plato.id);
        dispatch({
          type: "ELIMINAR_PLATO",
          payload: plato,
        });
        break;
      case "localStorage":
        localStorage.setItem(
          "platos",
          JSON.stringify(
            state.platos.filter((platoLocal) => platoLocal.id !== plato.id)
          )
        );
        dispatch({
          type: "ELIMINAR_PLATO",
          payload: plato,
        });
        break;
      case "apiRest":
        await borrarPlatoAPI(plato._id);
        dispatch({
          type: "ELIMINAR_PLATO",
          payload: plato,
        });
        break;
      default:
        break;
    }
  };

  const eliminarTodosLosPlatos = () => {
    localStorage.removeItem("platos");
    dispatch({
      type: "ELIMINAR_TODOS_LOS_PLATOS",
    });
  };

  return (
    <ChinoContext.Provider
      value={{
        ...state,
        seleccionarMetodo,
        recibirPlatos,
        selecionarPlato,
        agregarPlato,
        editarPlato,
        eliminarPlato,
        eliminarTodosLosPlatos,
      }}
    >
      {children}
    </ChinoContext.Provider>
  );
};

// Hook
export const useChino = () => {
  const context = useContext(ChinoContext);
  if (!context) {
    throw new Error("useChino must be used within a ChinoProvider");
  }
  return context;
};

// Con esto manejamos el estado de la apliacion, como es una aplicacion sencilla, hago uso de reducer, use context, es similiar a redux.

///Estoy en el ba??o...
