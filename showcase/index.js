import { ITEMS } from "./items-data.js";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".showcase");
  if (!root) return;
  root.innerHTML = "";

  ITEMS.forEach((item) => {
    const figure = document.createElement("figure");
    figure.className = "showcase__item";

    const img = document.createElement("img");
    img.className = "showcase__item-image";
    img.src = item.img;
    img.alt = "";
    img.loading = "lazy";

    const caption = document.createElement("figcaption");
    caption.className = "showcase__item-caption";
    const captionId = `caption-${Math.random().toString(36).slice(2)}`;
    caption.id = captionId;
    caption.textContent = item.title;

    figure.setAttribute("aria-labelledby", captionId);
    figure.appendChild(img);
    figure.appendChild(caption);
    root.appendChild(figure);
  });
});
