import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useChino } from "../context/ChinoContext";
import { useEffect, useState } from "react";
import Plato from "../components/Plato";
import Link from "next/link";
import Image from "next/image";
import Cargando from "../components/Cargando";
export default function Panel() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [cargando, setCargando] = useState(false);
  const { platos, recibirPlatos, metodo } = useChino();
  const [platosFiltrados, setPlatosFiltrados] = useState([]);
  useEffect(() => {
    //Con esto recibimos los platos
    (async () => {
      setCargando(true);
      await recibirPlatos();
      setCargando(false);
    })();
  }, [metodo]);
  //esto es para que cuando estamos buscando un plato
  useEffect(() => {
    const platosFiltrados = platos.filter(
      (plato) =>
        plato.nombre.toLowerCase().includes(search.toLowerCase()) ||
        plato.ingredientes.toLowerCase().includes(search.toLowerCase())
    );
    setPlatosFiltrados(platosFiltrados);
  }, [search]);

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
          {cargando ? (
            <div className="panel--content--cargando">
              <Cargando />
            </div>
          ) : (
            <div className="panel--content--platos">
              {search.length > 0 ? (
                <>
                  {platosFiltrados.map((plato, index) => (
                    <Plato plato={plato} key={index} />
                  ))}
                  {platosFiltrados.length === 0 && <span>No hay platos</span>}
                </>
              ) : (
                <>
                  {platos.map((plato, index) => (
                    <Plato plato={plato} key={index} />
                  ))}
                  {platos.length === 0 && (
                    <span>No hay platos, Agrega un nuevo plato 😜</span>
                  )}
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
