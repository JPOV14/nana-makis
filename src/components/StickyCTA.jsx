import { BRAND } from "../data/menu";
import { waLink } from "../utils/whatsapp";

export default function StickyCTA() {
  const msg = `Hola ${BRAND.name}! Quiero hacer un pedido.\n\nDistrito: ____\nDirección: ____\nReferencia: ____\nPago por: ____\nPedido: ____\nNotas: ____`;

  return (
    <div className="stickyCta">
      <a className="btn btnPrimary" href={waLink(BRAND.whatsapp, msg)} target="_blank" rel="noreferrer">
        📲 Pedir por WhatsApp
      </a>
    </div>
  );
}
