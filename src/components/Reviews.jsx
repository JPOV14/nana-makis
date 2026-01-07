import { REVIEWS } from "../data/menu";

export default function Reviews() {
  return (
    <section className="section">
      <h2>Opiniones</h2>
      <div className="grid">
        {REVIEWS.map((r) => (
          <div className="card" key={r.id}>
            <div className="cardBody">
              <div className="cardDesc">“{r.text}”</div>
              <div style={{ marginTop: 10, opacity: 0.8 }}>— {r.author}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
