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
        <div>
            <h1 className={styles.title}>Este es el main</h1>
            <p className={styles.description}>Esto aún está en desarrollo</p>
            <div className={styles.buttonContainer}/>
        </div>
    )

    
}

export default Home;