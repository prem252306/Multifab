import {
  FaFacebook,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-4 gap-12">

          <div>
            <h2 className="text-3xl font-bold">
              MultiFab
            </h2>

            <p className="mt-4 text-gray-400">
              Engineering Excellence
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>Home</li>
              <li>About</li>
              <li>Products</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">
              Contact
            </h3>

            <p>Ahmedabad, Gujarat</p>
            <p>info@multifab.com</p>
          </div>

          <div>
            <h3 className="font-bold mb-4">
              Follow Us
            </h3>

            <div className="flex gap-4 text-2xl">

              <FaFacebook />

              <FaInstagram />

              <FaLinkedin />

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}