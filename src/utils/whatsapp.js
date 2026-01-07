export function waLink(phone, message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}
