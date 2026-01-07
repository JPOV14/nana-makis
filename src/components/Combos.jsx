import { BRAND, COMBOS } from "../data/menu";
import { waLink } from "../utils/whatsapp";

export default function Combos() {
  return (
    <section className="section">
      <h2>🔥 Combos</h2>

      <div className="grid">
        {COMBOS.map((c) => {
          const priceTxt = c.price ? `S/ ${c.price}` : "Precio: (por definir)";
          const msg = `Hola ${BRAND.name}! Quiero el ${c.name}.
${c.desc}
${priceTxt}

Distrito: ____
Dirección: ____
Pago por: ____
Notas: ____`;

          return (
            <div className="card" key={c.id}>

              {/* 👇 IMAGEN DEL COMBO */}
              <div
                className="cardImg"
                style={{ backgroundImage: `url(${c.img})` }}
              />

              <div className="cardBody">
                <div className="cardTitle">{c.name}</div>
                <div className="cardDesc">{c.desc}</div>

                <div className="cardRow">
                  <div className="price">
                    {c.price ? `S/ ${c.price}` : "Consultar"}
                  </div>

                  <a
                    className="btn btnSmall"
                    href={waLink(BRAND.whatsapp, msg)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Pedir combo
                  </a>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
