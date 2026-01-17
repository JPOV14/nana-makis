import { useEffect, useMemo, useState } from "react";
import { BRAND } from "../data/menu";
import { waLink } from "../utils/whatsapp";
import { makeOrderId } from "../utils/orderId";

export default function OrderForm({ pedido, total, onClose }) {
  const fmt = (n) => new Intl.NumberFormat("es-PE").format(n);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [distrito, setDistrito] = useState("");
  const [direccion, setDireccion] = useState("");
  const [referencia, setReferencia] = useState("");
  const [pago, setPago] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    try {
      setNombre(localStorage.getItem("nm_nombre") || "");
      setTelefono(localStorage.getItem("nm_telefono") || "");
      setDistrito(localStorage.getItem("nm_distrito") || "");
      setDireccion(localStorage.getItem("nm_direccion") || "");
      setReferencia(localStorage.getItem("nm_referencia") || "");
      setPago(localStorage.getItem("nm_pago") || "");
    } catch {
      // nada
    }
  }, []);

  const resumen = useMemo(() => (pedido?.trim() ? pedido : "(Carrito vacío)"), [pedido]);

  const validar = () => {
    const n = nombre.trim();
    const t = telefono.trim();
    const dis = distrito.trim();
    const dir = direccion.trim();

    if (!n) return "Ingresa tu nombre.";
    if (!t) return "Ingresa tu teléfono.";
    if (!dis) return "Ingresa tu distrito.";
    if (!dir) return "Ingresa tu dirección.";

    const digits = t.replace(/\D/g, "");
    if (digits.length < 8) return "Tu teléfono parece incompleto (mín. 8 dígitos).";

    return "";
  };

  // fingerprint del pedido (para bloquear duplicados)
  const buildFingerprint = () => {
    const data = {
      pedido: resumen,
      total: Number(total || 0),
      nombre: nombre.trim().toLowerCase(),
      telefono: telefono.trim(),
      distrito: distrito.trim().toLowerCase(),
      direccion: direccion.trim().toLowerCase(),
      referencia: referencia.trim().toLowerCase(),
      pago: pago.trim().toLowerCase(),
    };
    return JSON.stringify(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isSending) return;

    setError("");
    const msgErr = validar();
    if (msgErr) {
      setError(msgErr);
      return;
    }

    // ---- Anti-duplicados (60s) ----
    try {
      const fp = buildFingerprint();
      const lastFp = localStorage.getItem("nm_last_fp") || "";
      const lastAt = parseInt(localStorage.getItem("nm_last_sent_at") || "0", 10);
      const now = Date.now();

      if (fp === lastFp && now - lastAt < 60000) {
        const secs = Math.ceil((60000 - (now - lastAt)) / 1000);
        setError(`Parece que ya enviaste este mismo pedido. Espera ${secs}s o cambia algo para reenviar.`);
        return;
      }
    } catch {
      // si falla localStorage, igual seguimos
    }

    setIsSending(true);

    const orderId = makeOrderId();
    const stamp = new Date().toLocaleString("es-PE");

    try {
      // guardar datos para acelerar el siguiente pedido
      localStorage.setItem("nm_last_order_id", orderId);
      localStorage.setItem("nm_nombre", nombre.trim());
      localStorage.setItem("nm_telefono", telefono.trim());
      localStorage.setItem("nm_distrito", distrito.trim());
      localStorage.setItem("nm_direccion", direccion.trim());
      localStorage.setItem("nm_referencia", referencia.trim());
      localStorage.setItem("nm_pago", pago.trim());
    } catch {
      // nada
    }

    const refTxt = referencia.trim() ? `Referencia: ${referencia.trim()}\n` : "";
    const pagoTxt = pago.trim() ? `Pago: ${pago.trim()}\n` : "";

    const msg =
      `Hola ${BRAND.name}! Quiero hacer un pedido.\n\n` +
      `ORDER ID: ${orderId}\n` +
      `TOTAL: S/ ${fmt(total)}\n` +
      `Fecha/Hora: ${stamp}\n\n` +
      `PEDIDO\n${resumen}\n\n` +
      `DATOS\n` +
      `Nombre: ${nombre.trim()}\n` +
      `Teléfono: ${telefono.trim()}\n` +
      `Distrito: ${distrito.trim()}\n` +
      `Dirección: ${direccion.trim()}\n` +
      refTxt +
      pagoTxt;

    // marcar “último envío” para dedupe
    try {
      localStorage.setItem("nm_last_fp", buildFingerprint());
      localStorage.setItem("nm_last_sent_at", String(Date.now()));
    } catch {
      // nada
    }

    window.open(waLink(BRAND.whatsapp, msg), "_blank", "noopener,noreferrer");
    onClose?.();

    setTimeout(() => setIsSending(false), 1200);
  };

  return (
    <form className="orderForm" onSubmit={onSubmit}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <h3 style={{ margin: 0 }}>Finalizar pedido</h3>
        <button type="button" className="btn btnSmall" onClick={onClose}>
          Cerrar
        </button>
      </div>

      <div className="formHint">Se abrirá WhatsApp con tu pedido y un Order ID único.</div>

      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" autoComplete="name" />

      <input
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        placeholder="Teléfono"
        autoComplete="tel"
        inputMode="tel"
      />

      <input value={distrito} onChange={(e) => setDistrito(e.target.value)} placeholder="Distrito" />

      <input
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        placeholder="Dirección"
        autoComplete="street-address"
      />

      <input value={referencia} onChange={(e) => setReferencia(e.target.value)} placeholder="Referencia (opcional)" />

      <input value={pago} onChange={(e) => setPago(e.target.value)} placeholder="Pago (opcional: Yape/Plin)" />

      <div className="infoBox">
        <div style={{ fontWeight: 900, marginBottom: 6 }}>Resumen</div>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap", opacity: 0.9, fontFamily: "inherit" }}>{resumen}</pre>
        <div style={{ marginTop: 10, fontWeight: 1000 }}>Total: S/ {fmt(total)}</div>
      </div>

      {error ? (
        <div className="infoBox" style={{ opacity: 0.95 }}>
          <strong>Falta:</strong> {error}
        </div>
      ) : null}

      <button type="submit" className="btn btnPrimary" disabled={isSending}>
        {isSending ? "Abriendo WhatsApp..." : "Enviar pedido por WhatsApp"}
      </button>
    </form>
  );
}
