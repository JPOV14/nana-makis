export const BRAND = {
  name: "Naná Makis - Makis Nikkei delivery",
  whatsapp: "51951036857",
  deliveryTime: "30–45 min",
  zones: "Cerado Callao · Bellavista · La Perla · La Punta · San Miguel",
  schedule: "Lun–Dom 6:00pm–11:00pm",
};

export const TOP_MAKIS = [
  {
    id: "acevichado",
    name: "Acevichado",
    desc: "Nikkei intenso + toque cítrico",
    price: 28,
    img: "/makis/acevichado.jpg",
    scale: 1.5,
    moveX: -10,           // 👈 mueve a la izquierda (px)
    moveY: 5,           // 👈 sube/baja (px)
    rotate: 0,
  },
  {
    id: "furai",
    name: "Furai Maguro",
    desc: "Crocante por fuera, brutal por dentro",
    price: 25,
    img: "/makis/furai.jpg",
    scale: 1.35,
    moveX: 55,           // 👈 mueve a la izquierda (px)
    moveY: -20,           // 👈 sube/baja (px)
    rotate: 0,
  },
  {
    id: "angus",
    name: "Angus",
    desc: "Carne Angus + salsa nikkei",
    price: 35,
    img: "/makis/angus.jpg",
    scale: 1.6,
    moveX: -10,           // 👈 mueve a la izquierda (px)
    moveY: -35,           // 👈 sube/baja (px)
    rotate: 45,
  },
];



export const REVIEWS = [
  { id: "r1", text: "Llegó rápido y brutal de sabor.", author: "Cliente" },
  { id: "r2", text: "El Furai caliente es otro nivel.", author: "Cliente" },
  { id: "r3", text: "Buen tamaño y bien presentado.", author: "Cliente" },
];

export const COMBOS = [
  { id: "combo-1p", name: "Combo 1 persona", desc: "25 piezas · Básico (langostino)", price: 45, img: "/combos/combo-1p.jpg" },
  { id: "combo-2p", name: "Combo 2 personas", desc: "30 piezas · Mixto", price: 59, img: "/combos/combo-2p.jpg" },
  { id: "combo-4p", name: "Combo 4 personas", desc: "40 piezas · Mixto", price: 89, img: "/combos/combo-4p.jpg" },
];

