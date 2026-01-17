import { useEffect, useMemo, useState } from "react";
import { BRAND } from "../data/menu";
import { waLink } from "../utils/whatsapp";

export default function StickyCTA() {
  const [show, setShow] = useState(false);

  const msg = useMemo(() => {
    return `Hola ${BRAND.name}! Quiero hacer un pedido.\n\nDistrito: ____\nDirección: ____\nReferencia: ____\nPago por: ____\nPedido: ____\nNotas: ____`;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setShow(y > 260);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="stickyCta">
      <a className="btn btnPrimary" href={waLink(BRAND.whatsapp, msg)} target="_blank" rel="noreferrer">
        📲 Pedir por WhatsApp
      </a>
    </div>
  );
}
