import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function SitioLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="min-h-[60vh]">{children}</div>
      <Footer />
    </>
  );
}
