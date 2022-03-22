import React from "react";
import Head from "next/head";
export default function Layout({ children }) {
  return (
    <div className="layout">
      <Head>
        <title>Adminsitrador CRUD 🧑‍🍳</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Este pequeño aplicativo de un CRUD 🧑‍🍳, enfocado a un restaurante el cual utiliza NextJS"
        />
        <meta
          name="keywords"
          content="desarrollo, react, nextjs, crud, restaurante, administrador, devflorez, ingenieroflorez, cristian david florez merlano"
        />
      </Head>

      <main>{children}</main>
    </div>
  );
}
