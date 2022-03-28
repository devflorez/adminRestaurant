// reducer de la apliacion

export default function ChinoReducer(state, action) {
  switch (action.type) {
    case "SELECCIONAR_METODO":
      return {
        ...state,
        metodo: action.payload,

      };
    case "RECIBIR_PLATOS":
      return {
        ...state,
        platos: action.payload,
      };
    case "RECIBIR_PLATO":
      return {
        ...state,
        plato: action.payload,
      };
    case "AGREGAR_PLATO":
      return {
        ...state,
        platos: [...state.platos, action.payload],
      };
    case "EDITAR_PLATO":
      return {
        ...state,
        platos: state.platos.map((plato) =>
          plato.id === action.payload.id ? action.payload : plato
        ),
      };
    case "ELIMINAR_PLATO":
      return {
        ...state,
        platos: state.platos.filter((plato) => plato.id ? plato.id !== action.payload.id :  plato._id !== action.payload._id),
      };
    case "ELIMINAR_TODOS_LOS_PLATOS":
      return {
        ...state,
        platos: [],
      };

    default:
      return state;
  }
}
