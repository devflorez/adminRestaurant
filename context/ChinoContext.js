import { createContext, useContext, useReducer } from "react";
import ChinoReducer from "./ChinoReducers";
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
};

// Create a context
export const ChinoContext = createContext();

// Provider
export const ChinoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ChinoReducer, initialState);

  // Estos son los actions de la apliacion
  const recibirPlatos = () => {
    const platos = JSON.parse(localStorage.getItem("platos"));

    if (platos) {
      dispatch({
        type: "RECIBIR_PLATOS",
        payload: platos,
      });
    }
  };

  const selecionarPlato = (plato) => {
    dispatch({
      type: "RECIBIR_PLATO",
      payload: plato,
    });
  };
  const agregarPlato = (plato) => {
    localStorage.setItem("platos", JSON.stringify([...state.platos, plato]));
    dispatch({
      type: "AGREGAR_PLATO",
      payload: plato,
    });
  };
  const editarPlato = (plato) => {
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
  };
  const eliminarPlato = (plato) => {
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

///Estoy en el baño...
