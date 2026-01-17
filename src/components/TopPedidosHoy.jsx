import { useMemo } from "react";
import { TOP_MAKIS, COMBOS } from "../data/menu";

export default function TopPedidosHoy({ cart, add, remove }) {
  const destacados = useMemo(() => {
    const combo1 = COMBOS.find((c) => c.name === "Combo 1 persona");
    const combo2 = COMBOS.find((c) => c.name === "Combo 2 personas");
    const furai = TOP_MAKIS.find((m) => m.name === "Furai Maguro");
    return [combo1, combo2, furai].filter(Boolean);
  }, []);

  return (
    <section className="section">
      <h2>🔥 Los más pedidos hoy</h2>

      <div className="grid gridFeatured">
        {destacados.map((p) => {
          const qty = cart[p.id] || 0;

          return (
            <div className="card featuredCard" key={p.id}>
              <div className="cardImgWrap">
                <img
                  className="cardImgImg"
                  src={p.img}
                  alt={p.name}
                />
              </div>

              <div className="cardBody">
                <div className="cardTitle">{p.name}</div>
                <div className="cardDesc">{p.desc}</div>

                <div className="cardRow">
                  <div className="price">S/ {p.price}</div>

                  <div className="qtyBox">
                    <button
                      className="btn btnSmall"
                      onClick={() => remove(p)}
                      disabled={!qty}
                    >
                      −
                    </button>
                    <div className="qtyNum">{qty}</div>
                    <button
                      className="btn btnSmall btnPrimary"
                      onClick={() => add(p)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
