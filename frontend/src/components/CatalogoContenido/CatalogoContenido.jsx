import React, { useMemo, useState } from "react";

/* =====================  CARGA AUTOMÁTICA DE IMÁGENES  ===================== *
 * Esto prepara las imágenes “tras bambalinas”.
 * Vite escanea /src/assets/img y nos da la URL final (con hash)
 *                    para cada archivo; así podemos usarlas sin rutas frágiles.
 */
const images = import.meta.glob('../../assets/img/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,          // Las importa al cargar el módulo (no de forma perezosa)
  import: 'default',    // Devuélveme la URL final (string) de cada imagen
});

/* Helper: recibe "Producto1.png" y devuelve la URL final procesada por Vite */
function getImg(name) {
  return images[`../../assets/img/${name}`];
}

/* =====================  DATOS DEL CATÁLOGO  ===================== *
 * Las tarjetas de productos con título, precio y foto.
 * Fuente de verdad de los productos (id, nombre, precio, etc.)
 *                    Guardamos solo el nombre del archivo (imgFile).
 */
const CATALOGO = [
  { id:"p2",  imgFile:"Producto2.png",  titulo:"Silla Secretlab Titan",                precio:349990,  categoria:"silla" },
  { id:"p1",  imgFile:"Producto1.png",  titulo:"PlayStation 5",                        precio:549990,  categoria:"consola" },
  { id:"p3",  imgFile:"Producto16.png",  titulo:"PC Gamer ASUS ROG Strix",              precio:1299990, categoria:"pc" },
  { id:"p4",  imgFile:"Producto4.png",  titulo:"Catan",                                 precio:29990,   categoria:"juegos de mesa" },
  { id:"p5",  imgFile:"Producto5.png",  titulo:"Carcassonne",                           precio:24990,   categoria:"juegos de mesa" },
  { id:"p7",  imgFile:"Producto7.png",  titulo:"Mouse Logitech G502 HERO",              precio:49990,   categoria:"mouse" },
  { id:"p8",  imgFile:"Producto8.png",  titulo:"Auriculares HyperX Cloud II",          precio:79990,   categoria:"accesorios" },
  { id:"p10", imgFile:"Producto10.png", titulo:"Mousepad Razer Goliathus",             precio:29990,   categoria:"mousepad" },
  { id:"p11", imgFile:"Producto11.png", titulo:"Polera Personalizada 'Level-Up'",      precio:14990,   categoria:"poleras" },
  { id:"p12", imgFile:"Producto12.png", titulo:"Controlador Inalámbrico Xbox Series X",precio:59990,   categoria:"accesorios" },
  { id:"p13", imgFile:"Producto13.png", titulo:"PS5 Death Stranding 2",                precio:69990,   categoria:"consola" },
  { id:"p14", imgFile:"Producto14.png", titulo:"Xbox Consola Serie S",                 precio:269990,  categoria:"consola" },
];

/* =====================  REGLAS DE PRECIO  ===================== *
 *  Checkboxes de precio; al marcarlos, el grid se filtra.
 * Mapear cada “rango” a una función que evalúa si un precio entra.
 */
const priceRules = {
  "lt100":   (p) => p < 100000,
  "100-300": (p) => p >= 100000 && p <= 300000,
  "gt300":   (p) => p > 300000,
};

/* Lista de categorías disponibles para los filtros (UI: checkboxes) */
const CATS = [
  "juegos de mesa","accesorios","consola","pc","silla","mouse","mousepad","poleras"
];

export default function CatalogoContenido() {
  /* =====================  ESTADO DE FILTROS  ===================== *
   * Cuando marcas/desmarcas checkboxes, estos arrays se actualizan.
   *  Guardar qué filtros están activos para volver a renderizar el grid.
   */
  const [catsSel, setCatsSel] = useState([]);     // categorías seleccionadas
  const [pricesSel, setPricesSel] = useState([]); // rangos de precio seleccionados

  /* =====================  FILTRADO MEMORIZADO  ===================== *
   * El grid muestra solo los productos que pasan los filtros.
   *  Calcular una versión “filtrada” del catálogo de forma eficiente.
   *                    Solo se recalcula cuando cambian catsSel o pricesSel.
   */
  const filtrados = useMemo(() => {
    const priceFns = pricesSel.map((k) => priceRules[k]).filter(Boolean);
    return CATALOGO.filter((p) => {
      const okCat = catsSel.length === 0 || catsSel.includes(p.categoria);
      const okPrice = priceFns.length === 0 || priceFns.some((fn) => fn(p.precio));
      return okCat && okPrice;
    });
  }, [catsSel, pricesSel]);

  /* =====================  HANDLERS DE CHECKBOX  ===================== *
   *  Al hacer click en un checkbox, se agrega/quita el filtro.
   *  Alternar un valor dentro de un array del estado (toggle).
   */
  const toggleFrom = (arr, v) => (arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  const onToggleCat = (v) => setCatsSel(prev => toggleFrom(prev, v));
  const onTogglePrice = (v) => setPricesSel(prev => toggleFrom(prev, v));

  /* =====================  CARRITO (LOCALSTORAGE)  ===================== *
   *  Botón “Agregar al carrito” en cada tarjeta (no muestra carrito aquí).
   * Persistir un arreglo "carrito" en localStorage con cantidades.
   */
  const addToCart = (prod) => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const i = carrito.findIndex((x) => x.id === prod.id);
    if (i >= 0) carrito[i].cantidad += 1;
    else carrito.push({ ...prod, cantidad: 1 });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    const count = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    localStorage.setItem("cartCount", String(count)); // útil si tienes un badge en el header
  };

  /* =====================  RENDER (LO QUE VES EN PANTALLA)  ===================== *
   * Estructura de dos columnas:
   * - Izquierda: panel de Filtros (categoría, precio)
   * - Derecha:  grid de tarjetas (imagen, título, precio, botón)
   */
  return (
    <div className="container py-4 catalogo">
      {/* 2 columnas: aside de filtros (280px) + main con el grid */}
      <div className="row g-4">                
        {/* =====================  ASIDE: FILTROS  ===================== *
         * Título “Filtros”, checkboxes de Categoría y Precio.
         * Actualiza catsSel y pricesSel para que el grid se filtre.
         */}
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

        {/* =====================  MAIN: GRID DE PRODUCTOS  ===================== *
         * Título “Catálogo” y tarjetas en 1-2-3 columnas (según pantalla).
         *  Mostrar solo los productos que pasaron los filtros (filtrados).
         */}
         <main className="col-12 col-lg-9">
          <h1 className="h6 mb-3">Catálogo</h1>

          {/* Grid responsive con clases de Bootstrap */}
          <section className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {filtrados.map((p) => (
              <div key={p.id} className="col">
                <article
                  className="card shadow-sm h-100"
                  data-categoria={p.categoria}  // útil para pruebas o estilos avanzados
                  data-price={p.precio}
                >
                  {/* Imagen del producto*/}
                  <img
                    src={getImg(p.imgFile) || '/img/placeholder.png'} // fallback opcional si quieres
                    alt={p.titulo}
                    className="card-img-top"
                    loading="lazy"
                  />

                  {/* Cuerpo de la tarjeta: título, precio y botón */}
                  <div className="card-body d-flex flex-column">
                    <h3 className="h6">{p.titulo}</h3>
                    <div className="precio mb-2">
                      ${p.precio.toLocaleString()} CLP
                    </div>
                    <button
                      className="btn btn-outline-primary mt-auto"
                      onClick={() => addToCart(p)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </article>
              </div>
            ))}

            {/* Slot futuro: por si quieres “huecos” o tarjetas fantasma para placeholders */}
            {/* <div className="col"><article className="card">...</article></div> */}
          </section>
        </main>
      </div>

      {/* Utilidad rápida: si en algún punto marcas algo como .is-hidden, lo ocultas altiro */}
      <style>{`.is-hidden{display:none !important}`}</style>
    </div>
  );
}
