// script.js final

document.addEventListener("DOMContentLoaded", () => {
  const imagenesGaleria = [
    {
      src: "Imagenes/2-remeras-mangas-largas.jpg",
      alt: "Remeras mangas largas",
      categoria: "remeras",
    },
    {
      src: "Imagenes/3-camperas-nike.jpg",
      alt: "Camperas Nike",
      categoria: "otros",
    },
    {
      src: "Imagenes/4-buzos-combinados.jpg",
      alt: "Buzos combinados",
      categoria: "otros",
    },
    {
      src: "Imagenes/5-camisaco-niño.jpg",
      alt: "Camisaco niño",
      categoria: "otros",
    },
    {
      src: "Imagenes/6-remera-short-billabong.jpg",
      alt: "Remera y short Billabong",
      categoria: "remeras",
    },
    {
      src: "Imagenes/7-camperas-vans.jpg",
      alt: "Camperas Vans",
      categoria: "otros",
    },
    {
      src: "Imagenes/8-remeras-vans.jpg",
      alt: "Remeras Vans",
      categoria: "remeras",
    },
    {
      src: "Imagenes/9-bermudas-cargo-rusty.jpg",
      alt: "Bermudas Cargo Rusty",
      categoria: "bermudas",
    },
    {
      src: "Imagenes/10-remeras-billabong.jpg",
      alt: "Remeras Billabong",
      categoria: "remeras",
    },
    {
      src: "Imagenes/11-remeras-billabong.jpg",
      alt: "Remeras Billabong",
      categoria: "remeras",
    },
    {
      src: "Imagenes/12-remeras-ripcurl.jpg",
      alt: "Remeras Ripcurl",
      categoria: "remeras",
    },
    {
      src: "Imagenes/13-remeras-vans.jpg",
      alt: "Remeras Vans",
      categoria: "remeras",
    },
    {
      src: "Imagenes/14-bermudas-todas-las-marcas.jpg",
      alt: "Bermudas todas las marcas",
      categoria: "bermudas",
    },
    {
      src: "Imagenes/15-remeras-vans.jpg",
      alt: "Remeras Vans",
      categoria: "remeras",
    },
    {
      src: "Imagenes/16-campera-pantalon-vans.jpg",
      alt: "Campera y pantalón Vans",
      categoria: "otros",
    },
    { src: "Imagenes/17-bermudas.jpg", alt: "Bermudas", categoria: "bermudas" },
    {
      src: "Imagenes/18-remeras-billabong.jpg",
      alt: "Remeras Billabong",
      categoria: "remeras",
    },
    {
      src: "Imagenes/19-remeras-ripcurl.jpg",
      alt: "Remeras Ripcurl",
      categoria: "remeras",
    },
  ];

  // ==================== SLIDER ====================
  let categoriaActual = "all";
  let indiceActual = 0;

  const sliderImg = document.getElementById("slider-img");
  const sliderDesc = document.getElementById("slider-desc");
  const sliderWsp = document.getElementById("slider-wsp");
  const btnIzq = document.querySelector(".slider-btn.left");
  const btnDer = document.querySelector(".slider-btn.right");

  function filtrarImagenes() {
    return imagenesGaleria.filter(
      (img) => categoriaActual === "all" || img.categoria === categoriaActual
    );
  }

  function mostrarImagen() {
    const filtradas = filtrarImagenes();
    if (filtradas.length === 0) {
      sliderImg.src = "";
      sliderDesc.textContent = "Sin imágenes";
      sliderWsp.href = "#";
      return;
    }

    const img = filtradas[indiceActual % filtradas.length];
    sliderImg.src = img.src;
    sliderImg.alt = img.alt || "";
    sliderDesc.textContent = img.alt || "";
    sliderWsp.href = `https://api.whatsapp.com/send?phone=5493425505721&text=Hola! Quiero comprar ${encodeURIComponent(
      img.alt || "este producto"
    )}`;
  }

  btnIzq.addEventListener("click", () => {
    const total = filtrarImagenes().length;
    indiceActual = (indiceActual - 1 + total) % total;
    mostrarImagen();
  });

  btnDer.addEventListener("click", () => {
    const total = filtrarImagenes().length;
    indiceActual = (indiceActual + 1) % total;
    mostrarImagen();
  });

  document.querySelectorAll(".filtro-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filtro-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      categoriaActual = btn.dataset.categoria;
      indiceActual = 0;
      mostrarImagen();
    });
  });

  mostrarImagen();

  // ==================== CONTADOR ====================
  const contadores = document.querySelectorAll(".contador");

  const observerContadores = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          iniciarContador(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  contadores.forEach((contador) => observerContadores.observe(contador));

  function iniciarContador(el) {
    let max = parseInt(el.getAttribute("data-max"));
    el.textContent = "0+";
    let count = 0;
    const interval = setInterval(() => {
      if (count < max) {
        count++;
        el.textContent = count + "+";
      } else {
        clearInterval(interval);
      }
    }, 20);
  }

  // ==================== SWIPE ====================
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });

  function handleGesture() {
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) > 50) {
      const active = document.querySelector(".filtro-btn.active");
      const botones = Array.from(document.querySelectorAll(".filtro-btn"));
      const idx = botones.indexOf(active);
      if (delta < 0 && idx < botones.length - 1) {
        botones[idx + 1].click(); // derecha
      } else if (delta > 0 && idx > 0) {
        botones[idx - 1].click(); // izquierda
      }
    }
  }
});

// ==================== SLIDER CLIENTES ====================
const clientesImgs = [
  "Imagenes/22-clientes-1.jpg",
  "Imagenes/23-clientes-2.jpg",
  "Imagenes/24-clientes-3.jpg",
];

let clienteActual = 0;
const clientesImg = document.getElementById("clientes-img");
const btnClientesIzq = document.querySelector(".clientes-btn.left");
const btnClientesDer = document.querySelector(".clientes-btn.right");

function mostrarCliente() {
  clientesImg.src = clientesImgs[clienteActual];
  clientesImg.alt = `Cliente ${clienteActual + 1} feliz`;
}

btnClientesIzq.addEventListener("click", () => {
  clienteActual =
    (clienteActual - 1 + clientesImgs.length) % clientesImgs.length;
  mostrarCliente();
});

btnClientesDer.addEventListener("click", () => {
  clienteActual = (clienteActual + 1) % clientesImgs.length;
  mostrarCliente();
});

mostrarCliente();

const sliderTestimonios = document.querySelector(".testimonios-slider");
const testimonios = sliderTestimonios.querySelectorAll("blockquote");
let indiceTestimonio = 0;

function mostrarTestimonio() {
  const offset = -indiceTestimonio * 100;
  sliderTestimonios.style.transform = `translateX(${offset}%)`;
}

setInterval(() => {
  indiceTestimonio = (indiceTestimonio + 1) % testimonios.length;
  mostrarTestimonio();
}, 4000); // cambia cada 4 segundos

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.classList.add("oculto");
  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});
