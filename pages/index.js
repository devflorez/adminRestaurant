import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useChino } from "../context/ChinoContext";
import { useEffect, useState } from "react";
import Plato from "../components/Plato";
import Link from "next/link";
export default function Home() {
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
  console.log(platos);
  return (
    <Layout>
      <div className="home">
        <header className="home--header">
          <h1> Panel administrativo restaurante Chino </h1>
          <div>
            <button onClick={() => router.push("/crear")}>Agregar</button>
            <input
              placeholder="Buscar"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>
        <section className="home--content">
          <h2>Platos</h2>
          <div className="home--content--platos">
            {search.length > 0 ? (
              <>
                {result.map((plato, index) => (
                  <Link key={index} href={"/plato/" + plato.id}>
                    <a onClick={() => selecionarPlato(plato)}>
                      <Plato
                        nombre={plato.nombre}
                        ingredientes={plato.ingredientes}
                        precio={plato.precio}
                      />
                    </a>
                  </Link>
                ))}
                {result.length === 0 && <p>No hay platos</p>}
              </>
            ) : (
              <>
                {platos.map((plato, index) => (
                  <Link key={index} href={"/plato/" + plato.id}>
                    <a onClick={() => selecionarPlato(plato)}>
                      <Plato
                        nombre={plato.nombre}
                        ingredientes={plato.ingredientes}
                        precio={plato.precio}
                      />
                    </a>
                  </Link>
                ))}
              </>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
