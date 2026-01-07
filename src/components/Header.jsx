import { BRAND } from "../data/menu";
import { waLink } from "../utils/whatsapp";

export default function Header() {
  const msg = `Hola ${BRAND.name}! Quiero hacer un pedido.\n\nDistrito: ____\nDirección: ____\nReferencia: ____\nPago por: ____\nPedido: ____\nNotas: ____`;

  return (
    <header className="header">
      <div className="headerInner">
        <a href="#top" className="brand">
            <img src="/logo.png" alt="Naná Makis" className="logo" />
            </a>

        <a className="btn btnPrimary" href={waLink(BRAND.whatsapp, msg)} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </div>
    </header>
  );
}
