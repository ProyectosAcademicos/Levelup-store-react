import React, { useEffect, useState, useMemo } from "react";
import { useCart } from "../../context/CartContext";
import * as apiService from "../../services/api";

export default function CatalogoContenido() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [catsSel, setCatsSel] = useState([]);
  const [pricesSel, setPricesSel] = useState([]);
  
  const { addToCart } = useCart();

  const CATS = [
    "juegos de mesa",
    "accesorios",
    "consola",
    "pc",
    "silla",
    "mouse",
    "mousepad",
    "poleras"
  ];

  const priceRules = {
    "lt100": (p) => p < 100000,
    "100-300": (p) => p >= 100000 && p <= 300000,
    "gt300": (p) => p > 300000,
  };

  // Cargar productos desde la API
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProductos();
        setProductos(data);
        setError(null);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // Filtrado memorizado
  const filtrados = useMemo(() => {
    const priceFns = pricesSel
      .map((k) => priceRules[k])
      .filter(Boolean);

    return productos.filter((p) => {
      const okCat =
        catsSel.length === 0 || catsSel.includes(p.categoria);
      const okPrice =
        priceFns.length === 0 || priceFns.some((fn) => fn(p.precio));
      return okCat && okPrice;
    });
  }, [productos, catsSel, pricesSel]);

  const toggleFrom = (arr, v) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const onToggleCat = (v) => setCatsSel((prev) => toggleFrom(prev, v));
  const onTogglePrice = (v) => setPricesSel((prev) => toggleFrom(prev, v));

  const handleAgregarAlCarrito = (producto) => {
    // Transformar producto al formato esperado por addToCart
    const productoFormateado = {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: producto.imagenFile,
      categoria: producto.categoria,
      stock: producto.stock
    };
    addToCart(productoFormateado);
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container py-4 catalogo">
      <div className="row g-4">
        {/* FILTROS */}
        <aside id="filtros" className="col-12 col-lg-3">
          <h2 className="h5">Filtros</h2>
          
          <div className="mb-3">
            <strong>Categoría</strong>
            <div className="d-flex flex-column gap-1 mt-2">
              {CATS.map((cat) => (
                <label key={cat}>
                  <input
                    type="checkbox"
                    checked={catsSel.includes(cat)}
                    onChange={() => onToggleCat(cat)}
                  />
                  {" "}{cat}
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
                  checked={pricesSel.includes("lt100")}
                  onChange={() => onTogglePrice("lt100")}
                />
                {" "}
                &lt; $100.000
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={pricesSel.includes("100-300")}
                  onChange={() => onTogglePrice("100-300")}
                />
                {" "}
                $100.000 -- $300.000
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={pricesSel.includes("gt300")}
                  onChange={() => onTogglePrice("gt300")}
                />
                {" "}
                &gt; $300.000
              </label>
            </div>
          </div>
        </aside>

        {/* GRID DE PRODUCTOS */}
        <main className="col-12 col-lg-9">
          <h1 className="h6 mb-3">Catálogo</h1>
          
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
            <section className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {filtrados.map((p) => (
                <div key={p.id} className="col">
                  <article
                    className="card shadow-sm h-100"
                    data-categoria={p.categoria}
                    data-price={p.precio}
                  >
                    <img
                      src={`/img/${p.imagenFile || p.imagenUrl || p.img_file}`}
                      alt={p.nombre}
                      className="card-img-top"
                      loading="lazy"
                    />
                    <div className="card-body d-flex flex-column">
                      <h3 className="h6">{p.nombre}</h3>
                      <div className="precio mb-2">
                        ${typeof p.precio === 'string' 
                          ? parseFloat(p.precio).toLocaleString() 
                          : p.precio.toLocaleString()} CLP
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
          )}
        </main>
      </div>
      <style>{`.is-hidden{display:none !important}`}</style>
    </div>
  );
}