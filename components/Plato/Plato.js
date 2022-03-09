import React from "react";
import Image from "next/image";
export default function Plato({ nombre, ingredientes, precio }) {
  return (
    <div className="plato">
      <div className="plato--informacion">
        <h3>Nombre: </h3>
        <p>{nombre}</p>
        <br />
        <h3>Ingredientes: </h3>
        <p>{ingredientes}</p>
        <br />
        <h3>Precio: </h3>
        <p> $ {precio} </p>
      </div>
      <Image
        src="/img/platopordefecto.jpg"
        width={560 / 3}
        height={372.33 / 3}
        alt="default"
      />
    </div>
  );
}
