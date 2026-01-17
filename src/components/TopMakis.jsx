import { useMemo, useState } from "react";
import { TOP_MAKIS, COMBOS } from "../data/menu";
import OrderForm from "./OrderForm";
import TopPedidosHoy from "./TopPedidosHoy";

export default function TopMakis() {
  const ALL = [...TOP_MAKIS, ...COMBOS];

  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState({});
  const [pulseId, setPulseId] = useState(null); // 👈 para animar el +

  const fmt = (n) => new Intl.NumberFormat("es-PE").format(n);

  // 👉 ADD con feedback visual
  const add = (p) => {
    setCart((prev) => ({ ...prev, [p.id]: (prev[p.id] || 0) + 1 }));
    setPulseId(p.id);

    clearTimeout(window.__pulseTimer);
    window.__pulseTimer = setTimeout(() => {
      setPulseId(null);
    }, 220);
  };

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
      .map(
        (it) =>
          `- ${it.name} x${it.qty} (S/ ${fmt(it.price)} c/u) = S/ ${fmt(it.lineTotal)}`
      )
      .join("\n");
  }, [items]);

  const openForm = () => {
    if (!items.length) return;
    setOpen(true);
  };

  const closeForm = () => setOpen(false);

  const Card = ({ p, kind = "maki" }) => {
    const qty = cart[p.id] || 0;
    const [imgOk, setImgOk] = useState(Boolean(p.img));

    return (
      <div className="card" key={p.id}>
        {imgOk ? (
          <div className="cardImgWrap">
            <img
              className="cardImgImg"
              src={p.img}
              alt={p.name}
              loading="lazy"
              onError={() => setImgOk(false)}
              style={{
                objectPosition: p.imgPos || "50% 50%",
                transform: `translate(${p.moveX || 0}px, ${p.moveY || 0}px) scale(${p.scale || 1})`,
              }}
            />
          </div>
        ) : (
          <div
            className={`cardImgFallback ${kind === "combo" ? "isCombo" : ""}`}
            aria-hidden="true"
          >
            <div className="cardImgFallbackBadge">
              {kind === "combo" ? "COMBO" : "TOP"}
            </div>
            <div className="cardImgFallbackSub">
              {kind === "combo" ? "Foto real en camino" : "Hecho al momento"}
            </div>
          </div>
        )}

        <div className="cardBody">
          <div className="cardTitle">{p.name}</div>
          <div className="cardDesc">{p.desc}</div>

          <div className="cardRow">
            <div className="price">S/ {fmt(p.price)}</div>

            <div className="qtyBox">
              <button
                type="button"
                className="qtyBtn qtyBtnSub"
                onClick={() => remove(p)}
                disabled={!qty}
              >
                −
              </button>

              <div className="qtyNum">{qty}</div>

              {/* 👇 BOTÓN + con pulse */}
              <button
                type="button"
                className={`qtyBtn qtyBtnAdd ${
                  pulseId === p.id ? "isPulse" : ""
                }`}
                onClick={() => add(p)}
              >
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

      <TopPedidosHoy cart={cart} add={add} remove={remove} />

      <p className="sectionSub">
        Los más pedidos hoy. Toca “+” y arma tu pedido en segundos.
      </p>

      {/* Mini carrito fijo */}
      <div className="miniCart">
        <div className="miniCartTop">
          <div className="miniCartTitle">Carrito</div>
          <div className={`miniCartMeta ${count ? "" : "isEmpty"}`}>
            {count
              ? `${count} item(s) · S/ ${fmt(total)}`
              : "Agrega 1 producto para continuar"}
          </div>
        </div>

        <div className="miniCartActions">
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
          <Card p={p} key={p.id} kind="maki" />
        ))}
      </div>

      {/* Combos */}
      <h2 style={{ marginTop: 18 }}>🔥 Combos</h2>
      <p className="sectionSub">
        Para decidir rápido: combos listos para compartir.
      </p>

      <div className="grid">
        {COMBOS.map((c) => (
          <Card p={c} key={c.id} kind="combo" />
        ))}
      </div>
    </section>
  );
}
