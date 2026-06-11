import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";
import products from "../../data/products";

export default function Products() {
  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-6xl font-bold mb-10">
            Products
          </h1>

          <div className="grid md:grid-cols-3 gap-10">

            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}