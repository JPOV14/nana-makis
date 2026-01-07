import { BRAND } from "../data/menu";

export default function DeliveryInfo() {
  return (
    <section className="section">
      <h2>📍 Delivery</h2>
      <div className="infoBox">
        <div><b>Zonas:</b> {BRAND.zones}</div>
        <div><b>Horario:</b> {BRAND.schedule}</div>
        <div><b>Tiempo:</b> {BRAND.deliveryTime}</div>
      </div>
    </section>
  );
}
