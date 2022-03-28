import React, { useState } from "react";
import Layout from "../components/Layout";
import { useChino } from "../context/ChinoContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Cargando from "../components/Cargando";
export default function Crear() {
  const [formData, setFormData] = useState(initialValue());
  const [cargando, setCargando] = useState(false);
  const { agregarPlato } = useChino();
  const Router = useRouter();
  const handleSubtmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    const errors = validate(formData);
    setFormData({ ...formData, errors });
    if (Object.keys(errors).length === 0) {
      let plato = {
        // id: new Date().getTime(),
        nombre: formData.nombre,
        precio: formData.precio,
        ingredientes: formData.ingredientes,
        imagen: formData.imagen,
      };
      await agregarPlato(plato);
      setCargando(false);
      Router.push("/panel");
    }
    setCargando(false);
  };

  return (
    <Layout>
      {cargando ? (
        <Cargando />
      ) : (
        <div className="crear">
          <Link href="/">
            <a>
              <Image
                src="/img/logoBlanco.png"
                width={200}
                height={200}
                alt="logo"
              />
            </a>
          </Link>
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
                placeholder="https://devflorez.com/img/platopordefecto.jpg"
              />
              {formData.errors && formData.errors.imagen && (
                <p className="error">{formData.errors.imagen}</p>
              )}
            </div>
            <button
              className="crear--form--button"
              onClick={(e) => handleSubtmit(e)}
            >
              Guardar
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
}

function initialValue() {
  return {
    nombre: "",
    precio: "",
    ingredientes: "",
    imagen: "",
  };
}

function validate(formData) {
  const regexImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:png|gif|webp|jpeg|jpg)/;
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
  if (!formData.imagen) {
    errors.imagen = "La imagen es obligatoria";
  } else if (!regexImage.test(formData.imagen)) {
    errors.imagen = "La imagen no es valida";
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
