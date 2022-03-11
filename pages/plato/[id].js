/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useChino } from "../../context/ChinoContext";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
export default function Id() {
  const { editarPlato, plato } = useChino();
  const [formData, setFormData] = useState(initialValue(plato));

  const Router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormData({ ...formData, errors });
    if (Object.keys(errors).length === 0) {
      let platoUpdate = {
        id: plato.id,
        nombre: formData.nombre,
        precio: formData.precio,
        ingredientes: formData.ingredientes,
        imagen: formData.imagen,
      };
      await editarPlato(platoUpdate);
      Router.push("/");
    } else {
      alert("Por favor corrige los errores");
    }
  };

  return (
    <Layout>
      <div className="platoEditar">
        <Link href="/">
        <a>
          <Image src="/img/logoBlanco.png" width={200} height={200} alt="logo"/>
        </a>
        </Link>
        
        <h1>Informacion del plato {plato.nombre}</h1>
        <div className="platoEditar--content">
          <img
            src={formData.imagen}
            alt={plato.nombre}
            className="platoEditar--imagen"
          />
          <form className="crear--form">
            <div className="crear--form--input">
              <label>Nombre del plato: </label>
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
            <div className="crear--form--input">
              <label>Imagen (url):</label>
              <input
                type="text"
                value={formData.imagen}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    imagen: e.target.value,
                  })
                }
              />
              {formData.errors && formData.errors.ingredientes && (
                <p className="error">{formData.errors.ingredientes}</p>
              )}
            </div>
            <button
              className="crear--form--button"
              onClick={(e) => handleUpdate(e)}
            >
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
function initialValue(plato) {
  return {
    nombre: plato.nombre || "",
    precio: plato.precio || "",
    ingredientes: plato.ingredientes || "",
    imagen: plato.imagen || "",
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
