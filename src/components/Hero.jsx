import { BRAND } from "../data/menu";
import { waLink } from "../utils/whatsapp";

export default function Hero() {
  const msg = `Hola ${BRAND.name}! Quiero hacer un pedido.\n\nDistrito: ____\nDirección: ____\nPago por: ____\nPedido: ____\nNotas: ____`;

  return (
    <section className="hero" id="top">
      {/* fondo */}
      <div className="heroImg"></div>

      {/* LOGO flotante */}
      <img
        src="/logo.png"
        alt="Naná Makis"
        className="heroLogo"
      />

      {/* contenido */}
      <div className="heroContent">
        <h1>Makis Nikkei delivery</h1>
        <p>Hechos al momento · {BRAND.deliveryTime} · {BRAND.zones}</p>
        <div className="badgeRow">
            <span className="badge">Hecho al momento</span>
            <span className="badge">30–45 min</span>
            <span className="badge">Callao · La Perla · La Punta · San Miguel</span>
            </div>


        <div className="heroActions">
          <a
            className="btn btnPrimary"
            href={waLink(BRAND.whatsapp, msg)}
            target="_blank"
            rel="noreferrer"
          >
            Pedir ahora
          </a>
          <a className="btn btnGhost" href="#carta">
            Ver carta
          </a>
        </div>
      </div>
    </section>
  );
}
