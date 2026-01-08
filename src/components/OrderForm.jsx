import { useState } from "react";
import { BRAND } from "../data/menu";
import { waLink } from "../utils/whatsapp";

export default function OrderForm({ pedido, total, onClose }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    referencia: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const msg = `
🧾 *Nuevo pedido – ${BRAND.name}*

👤 Nombre: ${form.nombre}
📞 Teléfono: ${form.telefono}
📍 Dirección: ${form.direccion}
📝 Referencia: ${form.referencia || "-"}

🍣 Pedido:
${pedido}

💰 Total: S/ ${total}

Quedo atento para el pago (Yape / Plin).
`.trim();

    window.open(waLink(BRAND.whatsapp, msg), "_blank");
  };

  return (
    <form className="orderForm" onSubmit={onSubmit}>
      <h3>Completa tu pedido</h3>

      <input name="nombre" placeholder="Nombre" required onChange={onChange} />
      <input name="telefono" placeholder="Teléfono" required onChange={onChange} />
      <input name="direccion" placeholder="Dirección" required onChange={onChange} />
      <input name="referencia" placeholder="Referencia (opcional)" onChange={onChange} />

      <button className="btn btnPrimary" type="submit">
        Enviar pedido
      </button>

      <button type="button" className="btn btnGhost" onClick={onClose}>
        Cancelar
      </button>
    </form>
  );
}
