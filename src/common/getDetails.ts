import { decode } from "js-base64";

export function getDetails() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const ref = urlSearchParams.get("obrref");
  let origin = "";
  let roomId = "";
  if (ref) {
    const decodedRef = decode(ref);
    const parts = decodedRef.split(" ");
    if (parts.length === 2) {
      origin = parts[0];
      roomId = parts[1];
    }
  }
  return { origin, roomId };
}
