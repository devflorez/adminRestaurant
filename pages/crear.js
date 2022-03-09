import React, { useState } from "react";
import Layout from "../components/Layout";
import { useChino } from "../context/ChinoContext";
import { useRouter } from "next/router";
export default function Crear() {
  const [formData, setFormData] = useState(initialValue());
  const { agregarPlato, platos } = useChino();
  const Router = useRouter();
  const handleSubtmit = (e) => {
    e.preventDefault();
    const errors = validate(formData);
   
    setFormData({ ...formData, errors });
    if (Object.keys(errors).length === 0) {
      let plato = {
        id: platos.length + 1,
        nombre: formData.nombre,
        precio: formData.precio,
        ingredientes: formData.ingredientes,
      };
      agregarPlato(plato);
      Router.push("/");
    } 
  };

  return (
    <Layout>
      <div className="crear">
        <h1>Agregar plato al menu</h1>
        <form className="crear--form">
          <div className="crear--form--input">
            <label>Nombre del plato:</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
            />

            {formData.errors && formData.errors.nombre && (
              <p className="error">{formData.errors.nombre}</p>
            )}
          </div>
          <div className="crear--form--input">
            <label>Precio del plato:</label>
            <input
              type="number"
              value={formData.precio}
              onChange={(e) =>
                setFormData({ ...formData, precio: e.target.value })
              }
            />
            {formData.errors && formData.errors.precio && (
              <p className="error">{formData.errors.precio}</p>
            )}
          </div>
          <div className="crear--form--input">
            <label>Ingredientes:</label>
            <input
              type="text"
              value={formData.ingredientes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ingredientes: e.target.value,
                })
              }
            />
            {formData.errors && formData.errors.ingredientes && (
              <p className="error">{formData.errors.ingredientes}</p>
            )}
          </div>
          <button
            className="crear--form--button"
            onClick={(e) => handleSubtmit(e)}
          >
            Agregar plato
          </button>
        </form>
      </div>
    </Layout>
  );
}

function initialValue() {
  return {
    nombre: "",
    precio: "",
    ingredientes: "",
  };
}

function validate(formData) {
  const errors = {};
  if (!formData.nombre) {
    errors.nombre = "El nombre es obligatorio";
  }
  if (!formData.precio) {
    errors.precio = "El precio es obligatorio";
  }
  if (!formData.ingredientes) {
    errors.ingredientes = "Los ingredientes son obligatorios";
  }
  return errors;
}
/*
ingredientes: [
  {
    nombre: "",
  },
],
*/
