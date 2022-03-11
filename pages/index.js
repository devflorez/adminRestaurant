import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useChino } from "../context/ChinoContext";
import { useEffect, useState } from "react";
import Plato from "../components/Plato";
import Link from "next/link";
import Image from "next/image";
import { Metodos } from "../constants/options";
import Metodo from "../components/Metodo";
export default function Home() {
  return (
    <Layout>
      <div className="home">
        <Image src="/img/logoBlanco.png" width={300} height={300} alt="logo" />
        <h3>SELECCIONE EL GESTOR DE CONTENIDO</h3>
        <div className="home--items">
          {Metodos.map((metodo, index) => (
            <Link key={index} href={metodo.link}>
              <a>
                <Metodo nombre={metodo.nombre} icono={metodo.icono} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
/*

*/
