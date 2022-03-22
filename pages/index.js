import Layout from "../components/Layout";

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
            <Metodo item={metodo} index={index}  key={index}/>
          ))}
        </div>
      </div>
    </Layout>
  );
}
/*

*/
