import React from "react";
import Layout from "../components/Layout";

import Link from "next/link";
import Image from "next/image";
export default function custom404() {
  return (
    <Layout>
      <div className="custom404">
        <Link href="/">
          <a>
            <Image
              src="/img/logoBlanco.png"
              width={300}
              height={300}
              alt="logo"
            />
          </a>
        </Link>
        <h1>404</h1>
        <h2>Página no encontrada</h2>
      </div>
    </Layout>
  );
}
