export function makeOrderId() {
  // Formato definitivo: ORD-1704708123 (epoch en segundos)
  const base = Math.floor(Date.now() / 1000);

  // Anti-colisión: si ya generaste uno en este dispositivo en el mismo segundo,
  // usamos el siguiente número (sigue siendo ORD-<numero>).
  try {
    const last = parseInt(localStorage.getItem("nm_last_order_id_num") || "0", 10);
    const next = base <= last ? last + 1 : base;
    localStorage.setItem("nm_last_order_id_num", String(next));
    return `ORD-${next}`;
  } catch {
    return `ORD-${base}`;
  }
}
