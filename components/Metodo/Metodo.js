import React from "react";
import { Icon } from "@iconify/react";
import { useChino } from "../../context/ChinoContext";
import { useRouter } from "next/router";
export default function Metodo({
  item,

  index,
}) {
  const { icono, nombre, link, metodo } = item;
  const Router = useRouter();
  const { seleccionarMetodo } = useChino();
  const handleClick = () => {
    seleccionarMetodo(metodo);
    Router.push(link);
  };

  return (
    <div className="metodo" onClick={() => handleClick()}>
      <Icon icon={icono} />
      <h3>{nombre}</h3>
    </div>
  );
}
