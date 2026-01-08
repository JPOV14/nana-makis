import { useMemo, useState } from "react";
import { TOP_MAKIS, COMBOS } from "../data/menu";
import OrderForm from "./OrderForm";

export default function TopMakis() {
  const ALL = [...TOP_MAKIS, ...COMBOS];

  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState({}); // { id: qty }

  const add = (p) => setCart((prev) => ({ ...prev, [p.id]: (prev[p.id] || 0) + 1 }));

  const remove = (p) =>
    setCart((prev) => {
      const next = { ...prev };
      const q = next[p.id] || 0;
      if (q <= 1) delete next[p.id];
      else next[p.id] = q - 1;
      return next;
    });

  const clear = () => setCart({});

  const items = useMemo(() => {
    return ALL.filter((p) => cart[p.id]).map((p) => ({
      ...p,
      qty: cart[p.id],
      lineTotal: (cart[p.id] || 0) * p.price,
    }));
  }, [cart]);

  const total = useMemo(() => items.reduce((s, it) => s + it.lineTotal, 0), [items]);
  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);

  const pedidoTxt = useMemo(() => {
    if (!items.length) return "";
    return items
      .map((it) => `- ${it.name} x${it.qty} (S/ ${it.price} c/u) = S/ ${it.lineTotal}`)
      .join("\n");
  }, [items]);

  const openForm = () => {
    if (!items.length) return;
    setOpen(true);
  };

  const closeForm = () => setOpen(false);

  const Card = ({ p }) => {
    const qty = cart[p.id] || 0;

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

            <div className="qtyBox">
              <button className="btn btnSmall" onClick={() => remove(p)} disabled={!qty}>
                −
              </button>
              <div className="qtyNum">{qty}</div>
              <button className="btn btnSmall" onClick={() => add(p)}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="section" id="carta">
      <h2>⭐ Top Makis</h2>

      {/* Mini carrito */}
      <div className="miniCart">
        <div className="miniCartLeft">
          <div className="miniCartTitle">Carrito</div>
          <div className="miniCartMeta">{count ? `${count} item(s) · Total S/ ${total}` : "Vacío"}</div>
        </div>

        <div className="miniCartRight">
          <button className="btn btnSmall" onClick={clear} disabled={!count}>
            Limpiar
          </button>
          <button className="btn btnPrimary" onClick={openForm} disabled={!count}>
            Finalizar pedido
          </button>
        </div>
      </div>

      {/* Modal formulario */}
      {open && (
        <div className="modalBackdrop" onClick={closeForm}>
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>
            <OrderForm pedido={pedidoTxt} total={total} onClose={closeForm} />
          </div>
        </div>
      )}

      {/* Makis */}
      <div className="grid">
        {TOP_MAKIS.map((p) => (
          <Card p={p} key={p.id} />
        ))}
      </div>

      {/* Combos */}
      <h2 style={{ marginTop: 18 }}>🔥 Combos</h2>
      <div className="grid">
        {COMBOS.map((c) => (
          <Card p={c} key={c.id} />
        ))}
      </div>
    </section>
  );
}
