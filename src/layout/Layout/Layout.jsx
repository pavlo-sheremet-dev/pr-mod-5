import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import styles from './Layout.module.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {

  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>{<Outlet />}</main>

      <Footer />
      <ToastContainer />
    </div>
  );
};
