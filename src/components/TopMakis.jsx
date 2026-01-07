import { BRAND, TOP_MAKIS } from "../data/menu";
import { waLink } from "../utils/whatsapp";

export default function TopMakis() {
  return (
    <section className="section" id="carta">
      <h2>⭐ Top Makis</h2>
      <div className="grid">
        {TOP_MAKIS.map((p) => {
          const msg = `Hola ${BRAND.name}! Quiero:\n- ${p.name} (S/ ${p.price})\n\nDistrito: ____\nDirección: ____\nPago por: ____\nNotas: ____`;
          return (
            <div className="card" key={p.id}>
                <div className="cardImgWrap">
                    <img
                        className="cardImgImg"
                        src={p.img}
                        alt={p.name}
                        style={{
                        objectPosition: p.imgPos || "50% 50%",
                        transform: `translate(${p.moveX || 0}px, ${p.moveY || 0}px) scale(${p.scale || 1}) rotate(${p.rotate || 0}deg)`,
                        transformOrigin: "center",
                        }}

                    />
                    </div>




              <div className="cardBody">
                <div className="cardTitle">{p.name}</div>
                <div className="cardDesc">{p.desc}</div>
                <div className="cardRow">
                  <div className="price">S/ {p.price}</div>
                  <a className="btn btnSmall" href={waLink(BRAND.whatsapp, msg)} target="_blank" rel="noreferrer">
                    Pedir
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
