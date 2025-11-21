import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../../context/CartContext";

/* =====================  CARGA AUTOMÁTICA DE IMÁGENES  ===================== */
// Vite escanea /src/assets/img y nos da la URL final de cada imagen
const images = import.meta.glob(
  "../../assets/img/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
    import: "default",
  }
);

// Helper: recibe "Producto1.png" y devuelve la URL final procesada por Vite
function getImg(name) {
  return images[`../../assets/img/${name}`];
}

/* =====================  META VISUAL  ===================== */
// Solo dice qué imagen y categoría usar para cada idProd real de la BD
const META_VISUAL = [
  { idProd: 1,  imgFile: "Producto7.png",  categoria: "mouse" },
  // { idProd: 2, imgFile: "ProductoX.png", categoria: "accesorios" }, // si luego agregas teclado
  { idProd: 9,  imgFile: "Producto2.png",  categoria: "silla" },
  { idProd: 10, imgFile: "Producto1.png",  categoria: "consola" },
  { idProd: 11, imgFile: "Producto16.png", categoria: "pc" },
  { idProd: 12, imgFile: "Producto4.png",  categoria: "juegos de mesa" },
  { idProd: 13, imgFile: "Producto5.png",  categoria: "juegos de mesa" },
  { idProd: 14, imgFile: "Producto8.png",  categoria: "accesorios" },
  { idProd: 15, imgFile: "Producto10.png", categoria: "mousepad" },
  { idProd: 16, imgFile: "Producto12.png", categoria: "accesorios" },
  { idProd: 17, imgFile: "Producto13.png", categoria: "consola" },
  { idProd: 18, imgFile: "Producto14.png", categoria: "consola" },
];

/* =====================  REGLAS DE PRECIO  ===================== */
const priceRules = {
  "lt100":   (p) => p < 100000,
  "100-300": (p) => p >= 100000 && p <= 300000,
  "gt300":   (p) => p > 300000,
};

/* Lista de categorías disponibles para los filtros (UI: checkboxes) */
const CATS = [
  "juegos de mesa",
  "accesorios",
  "consola",
  "pc",
  "silla",
  "mouse",
  "mousepad",
  "poleras",
];

export default function CatalogoContenido() {
  /* =====================  ESTADO: PRODUCTOS DESDE BD  ===================== */
  const [productosBD, setProductosBD] = useState([]);

  /* =====================  ESTADO DE FILTROS  ===================== */
  const [catsSel, setCatsSel] = useState([]);     // categorías seleccionadas
  const [pricesSel, setPricesSel] = useState([]); // rangos de precio seleccionados

  /* =====================  CARRITO (CONTEXT)  ===================== */
  const { addToCart } = useCart();

  /* =====================  CARGAR PRODUCTOS DESDE BACKEND  ===================== */
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/productos")
      .then((res) => setProductosBD(res.data))
      .catch((err) => {
        console.error(err);
        alert("Error al cargar productos del catálogo");
      });
  }, []);

  /* =====================  MEZCLA BD + META VISUAL  ===================== */
  const productosVisuales = useMemo(() => {
    return productosBD.map((p) => {
      const meta = META_VISUAL.find((m) => m.idProd === p.idProd);
      return {
        ...p,
        imgFile: meta?.imgFile ?? "Producto1.png", // imagen por defecto
        categoria: meta?.categoria ?? "otros",
        titulo: p.nombre, // para reutilizar el JSX
      };
    });
  }, [productosBD]);

  /* =====================  FILTRADO MEMORIZADO  ===================== */
  const filtrados = useMemo(() => {
    const priceFns = pricesSel.map((k) => priceRules[k]).filter(Boolean);
    return productosVisuales.filter((p) => {
      const okCat = catsSel.length === 0 || catsSel.includes(p.categoria);
      const okPrice =
        priceFns.length === 0 || priceFns.some((fn) => fn(p.precio));
      return okCat && okPrice;
    });
  }, [catsSel, pricesSel, productosVisuales]);

  /* =====================  HANDLERS DE CHECKBOX  ===================== */
  const toggleFrom = (arr, v) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const onToggleCat = (v) => setCatsSel((prev) => toggleFrom(prev, v));
  const onTogglePrice = (v) => setPricesSel((prev) => toggleFrom(prev, v));

  /* =====================  AGREGAR AL CARRITO (FORMATO COMPATIBLE)  ===================== */
  const handleAgregarAlCarrito = (p) => {
    const productoFormateado = {
      id: p.idProd,                 // tu id de BD, pero con nombre 'id'
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      imagen: p.imgFile,           // nombre de archivo de imagen
      categoria: p.categoria,
      // stock: p.stock ?? 1,      // si algún día agregas stock
    };

    addToCart(productoFormateado);
  };

  /* =====================  RENDER (LO QUE VES EN PANTALLA)  ===================== */
  return (
    <div className="container py-4 catalogo">
      <div className="row g-4">
        {/* ========== ASIDE: FILTROS ========== */}
        <aside id="filtros" className="col-12 col-lg-3">
          <h2 className="h5">Filtros</h2>

          <div className="mb-3">
            <strong>Categoría</strong>
            <div className="d-flex flex-column gap-1 mt-2">
              {CATS.map((cat) => (
                <label key={cat}>
                  <input
                    type="checkbox"
                    name="cat"
                    value={cat}
                    checked={catsSel.includes(cat)}
                    onChange={() => onToggleCat(cat)}
                  />{" "}
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div>
            <strong>Precio</strong>
            <div className="d-flex flex-column gap-1 mt-2">
              <label>
                <input
                  type="checkbox"
                  name="price"
                  value="lt100"
                  checked={pricesSel.includes("lt100")}
                  onChange={() => onTogglePrice("lt100")}
                />{" "}
                &lt; $100.000
              </label>
              <label>
                <input
                  type="checkbox"
                  name="price"
                  value="100-300"
                  checked={pricesSel.includes("100-300")}
                  onChange={() => onTogglePrice("100-300")}
                />{" "}
                $100.000 – $300.000
              </label>
              <label>
                <input
                  type="checkbox"
                  name="price"
                  value="gt300"
                  checked={pricesSel.includes("gt300")}
                  onChange={() => onTogglePrice("gt300")}
                />{" "}
                &gt; $300.000
              </label>
            </div>
          </div>
        </aside>

        {/* ========== MAIN: GRID DE PRODUCTOS ========== */}
        <main className="col-12 col-lg-9">
          <h1 className="h6 mb-3">Catálogo</h1>

          <section className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {filtrados.map((p) => (
              <div key={p.idProd} className="col">
                <article
                  className="card shadow-sm h-100"
                  data-categoria={p.categoria}
                  data-price={p.precio}
                >
                  {/* Imagen del producto */}
                  <img
                    src={getImg(p.imgFile) || "/img/placeholder.png"}
                    alt={p.titulo}
                    className="card-img-top"
                    loading="lazy"
                  />

                  {/* Cuerpo de la tarjeta */}
                  <div className="card-body d-flex flex-column">
                    <h3 className="h6">{p.titulo}</h3>

                    {/* Descripción entre título y precio */}
                    <p className="mb-1">{p.descripcion}</p>

                    <div className="precio mb-2">
                      ${p.precio.toLocaleString()} CLP
                    </div>
                    <button
                      className="btn btn-outline-primary mt-auto"
                      onClick={() => handleAgregarAlCarrito(p)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </section>
        </main>
      </div>

      <style>{`.is-hidden{display:none !important}`}</style>
    </div>
  );
}
