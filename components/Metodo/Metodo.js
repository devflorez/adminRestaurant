import React from "react";
import { Icon } from "@iconify/react";
export default function Metodo({
  nombre, //nombre del metodo
  icono, //icono del metodo
}) {
  return (
    <div className="metodo">
      <Icon icon={icono} />
      <h3>{nombre}</h3>
    </div>
  );
}
