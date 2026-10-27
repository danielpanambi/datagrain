/* Datagrain — interações progressivas para a versão demonstrativa. */
(() => {
  "use strict";
  const init = () => {
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = [...document.querySelectorAll(".dg-reveal")];
    if (!reduced && "IntersectionObserver" in window && revealTargets.length) {
      const observer = new IntersectionObserver((entries, instance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("dg-visible");
            instance.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px 30px 0px" });
      document.documentElement.classList.add("dg-motion-ready");
      revealTargets.forEach(el => observer.observe(el));
    }
    const dialog = document.getElementById("dg3d-lightbox");
    const close = dialog && dialog.querySelector(".dg3d-lightbox-close");
    if (dialog && close) {
      document.querySelectorAll(".dg3d-media-open").forEach(button => {
        button.addEventListener("click", () => {
          const article = button.closest("article");
          const source = button.querySelector("img");
          if (!article || !source) return;
          const image = dialog.querySelector("figure img");
          const title = dialog.querySelector("figcaption strong");
          const description = dialog.querySelector("figcaption p");
          image.src = source.getAttribute("src") || "";
          image.alt = source.alt || "";
          title.textContent = article.querySelector("h3")?.textContent || "Datagrain 3D";
          description.textContent = article.querySelector("p")?.textContent || "";
          if (typeof dialog.showModal === "function") dialog.showModal();
          else window.open(image.src, "_blank", "noopener,noreferrer");
        });
      });
      close.addEventListener("click", () => dialog.close());
      dialog.addEventListener("click", event => {
        if (event.target === dialog) dialog.close();
      });
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once:true });
  else init();
})();