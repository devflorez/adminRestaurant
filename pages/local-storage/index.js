import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useChino } from "../../context/ChinoContext";
import { useEffect, useState } from "react";
import Plato from "../../components/Plato";
import Link from "next/link";
import Image from "next/image";
export default function Panel() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { platos, recibirPlatos, selecionarPlato } = useChino();
  useEffect(() => {
    //Con esto recibimos los platos

    recibirPlatos();
  }, []);
  //esto es para que cuando estamos buscando un plato
  const result = platos.filter((plato) => {
    return (
      plato.nombre.toLowerCase().includes(search.toLowerCase()) ||
      plato.ingredientes.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Layout>
      <div className="panel">
        <header className="panel--header">
          <Link href="/">
            <a>
              <Image
                src="/img/logoBlanco.png"
                width={150}
                height={150}
                alt="logo"
              />
            </a>
          </Link>
          <h1> Panel administrativo</h1>
          <div>
            <button
              className="panel--header--button"
              onClick={() => router.push("/crear")}
            >
              Agregar
            </button>
            <input
              placeholder="Buscar"
              onChange={(e) => setSearch(e.target.value)}
              className="panel--header--input"
            />
          </div>
        </header>
        <section className="panel--content">
          <h2>Platos</h2>
          <div className="panel--content--platos">
            {search.length > 0 ? (
              <>
                {result.map((plato, index) => (
                  <Plato plato={plato} key={index} />
                ))}
                {result.length === 0 && <p>No hay platos</p>}
              </>
            ) : (
              <>
                {platos.map((plato, index) => (
                  <Plato plato={plato} key={index} />
                ))}
              </>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
