import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    
    const navigate = useNavigate();

    const handleInicioSesion = () => {
        navigate('#');
    }

    const handleRegistrarse = () => {
        navigate('#');
    };

    return(
        
    <>
      <div id="myCarousel" className="carousel slide mb-6 bg-dark" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            className="active"
            aria-current="true"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner bg-dark">
          <div className="carousel-item" style={{ height: '400px' }}>
            <img src="../img/Carousel 2.png" className="img-carousel d-block ms-auto img-fluid h-100" alt="Imagen carrusel" />
          </div>

          <div className="carousel-item" style={{ height: '400px' }}>
            <img src="../img/Carousel 4.png" className="img-carousel d-block mx-auto img-fluid h-100 w-90" alt="Imagen carrusel" />
          </div>

          <div className="carousel-item active" style={{ height: '400px' }}>
            <img src="../img/Carousel 3.png" className="img-carousel d-block mx-auto img-fluid object-fit-cover" alt="Imagen carrusel" />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Productos */}
      <div className="album py-5">
  <div className="container">
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      
      {/* Producto 1 */}
      <div className="col">
        <div className="card shadow-sm">
          <img src="../img/Producto15.png" className="imgCard" alt="Nintendo" />
          <div className="card-body">
            <strong>Nintendo</strong>
            <p className="card-text">
              Nintendo Switch 2 + Mario Kart Deluxe <br /> World Pre-Cargado
            </p>
            <strong>$669.990 CLP</strong>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group mx-auto">
                <button type="button" className="btn btn-sm btn-outline-secondary">
                  Agregar al carro
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Producto 2 */}
        <div className="col">
            <div className="card shadow-sm">
            <img src="../img/Producto14.png" className="imgCard" alt="Xbox" />
            <div className="card-body">
                <strong>Xbox</strong>
                <p className="card-text">
                Consola Serie S <br /> Nueva
                </p>
                <strong>$269.990 CLP</strong>
                <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group mx-auto">
                    <button type="button" className="btn btn-sm btn-outline-secondary">
                    Agregar al carro
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* Producto 3 */}
        <div className="col">
            <div className="card shadow-sm">
            <img src="../img/Producto13.png" className="imgCard" alt="Juego" />
            <div className="card-body">
                <strong>Juego</strong>
                <p className="card-text">
                PS5 Death Stranding 2 <br /> On The Beach
                </p>
                <strong>$69.990 CLP</strong>
                <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group mx-auto">
                    <button type="button" className="btn btn-sm btn-outline-secondary">
                    Agregar al carro
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>

        </div>
    </div>
    </div>
    </>
  );
};

export default Home;