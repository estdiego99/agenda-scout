import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { secciones } from "../globals";
import { autenticarToken } from "../_auth/utils";
import "./_style.css";

import Header from "../_header/_component";

export default function Home() {
  const history = useHistory();

  const [miembro, setMiembro] = useState(undefined);

  useEffect(() => {
    async function setup() {
      const loggedUser = await autenticarToken().catch((err) => {
        console.log(JSON.stringify(err));
      });
      if (!loggedUser) {
        history.push("/login");
        return;
      }
      setMiembro(loggedUser);
    }
    setup();
  }, [history]);

  if (!miembro) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <img src="/images/mi-agenda-label.svg" alt="icon"></img>
          <p className="mt-4">Cargando información...</p>
        </div>
      </div>
    );
  }

  const nombreDisplay =
    miembro.seccion === secciones.conjunto.MANADA
      ? miembro.nombreSelva
      : miembro.nombre;

  return (
    <div className={miembro.seccion}>
      <Header logoLink="/" showLogout />

      <main id="home-component">
        <h2>Buenas {nombreDisplay}!!</h2>
        <div className="flex-grow-1" />
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div
              src="/images/mi-agenda-label.svg"
              alt="icono"
              className="home-icon col-10 col-md-6"
            />
            <small className="col-12 col-md-6 mt-4">
              Holi, aún no hemos programado nada aquí, jeje.
              <br />
              <br />
              Pero muchísimas gracias por registrarte :D. Significa muchísimo
              para nosotros, esperamos pronto este proyecto llegue bastante
              lejos :)
              <br />
              <br />
              Pronto agregaremos más cosas!! Como un perfil que puedas observar,
              agregar las insignias que has conseguido en tu vida scout, y mucho
              más!!
              <br />
              <br />
              <span style={{ fontSize: "0.75em" }}>
                (Pls vuelve eventualmente, estará chido, lo prometemos :'v)
              </span>
            </small>
          </div>
        </div>
        <div className="flex-grow-1" />
      </main>
    </div>
  );
}