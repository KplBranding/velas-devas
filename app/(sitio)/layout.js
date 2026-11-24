import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function SitioLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </>
  );
}
