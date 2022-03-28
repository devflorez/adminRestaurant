/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useChino } from "../../context/ChinoContext";
export default function Plato({ plato }) {
  const { nombre, ingredientes, precio, imagen } = plato;
  const { eliminarPlato, selecionarPlato, metodo } = useChino();
  const Router = useRouter();
  const handleEdit = () => {
    selecionarPlato(plato);
    {
      metodo === "apiRest"
        ? Router.push("/plato/" + plato._id)
        : Router.push("/plato/" + plato.id);
    }
  };
  return (
    <div className="plato">
      <img src={imagen ? imagen : "/img/platopordefecto.jpg"} alt="default" />
      <div className="plato--informacion">
        <h3>
          <b>Nombre:</b>{" "}
        </h3>
        <p>{nombre}</p>

        <h3>Ingredientes: </h3>
        <p>{ingredientes}</p>

        <h3>Precio: </h3>
        <p> $ {precio} </p>
      </div>
      <div className="plato--actions">
        <button onClick={handleEdit} className="plato--actions--button--edit">
          Editar
        </button>
        <button
          onClick={() => eliminarPlato(plato)}
          className="plato--actions--button--delete"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
