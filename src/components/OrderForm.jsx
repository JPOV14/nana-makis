import { useMemo, useState } from "react";
import { BRAND } from "../data/menu";
import { waLink } from "../utils/whatsapp";

export default function OrderForm({ pedido, total, onClose }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [referencia, setReferencia] = useState("");

  const canSend = useMemo(() => {
    return nombre.trim().length >= 2 && telefono.trim().length >= 7 && direccion.trim().length >= 6;
  }, [nombre, telefono, direccion]);

  const msg = useMemo(() => {
    const lines = [
      `Hola ${BRAND.name}! Quiero hacer un pedido:`,
      "",
      pedido || "(sin items)",
      "",
      `Total: S/ ${total}`,
      "",
      `Nombre: ${nombre || "—"}`,
      `Teléfono: ${telefono || "—"}`,
      `Dirección: ${direccion || "—"}`,
      `Referencia: ${referencia || "—"}`,
    ];
    return lines.join("\n");
  }, [pedido, total, nombre, telefono, direccion, referencia]);

  const submit = (e) => {
    e.preventDefault();
    if (!canSend) return;
    window.open(waLink(BRAND.whatsapp, msg), "_blank", "noopener,noreferrer");
  };

  return (
    <form className="orderForm" onSubmit={submit}>
      <h3>Completa tu pedido</h3>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        autoComplete="name"
        enterKeyHint="next"
        required
      />

      <input
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        inputMode="tel"
        autoComplete="tel"
        enterKeyHint="next"
        required
      />

      <input
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        autoComplete="street-address"
        enterKeyHint="next"
        required
      />

      <input
        placeholder="Referencia (opcional)"
        value={referencia}
        onChange={(e) => setReferencia(e.target.value)}
        autoComplete="off"
        enterKeyHint="done"
      />

      <button className="btn btnPrimary" type="submit" disabled={!canSend}>
        Enviar pedido
      </button>

      <button className="btn btnGhost" type="button" onClick={onClose}>
        Cancelar
      </button>

      {!canSend && (
        <div className="formHint">
          Completa nombre, teléfono y dirección para enviar.
        </div>
      )}
    </form>
  );
}
