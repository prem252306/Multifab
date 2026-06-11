import {
  FaBox,
  FaImages,
  FaEnvelope,
  FaUsers
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function AdminSidebar() {

  return (

    <div className="
    w-72
    bg-slate-950
    text-white
    min-h-screen
    p-6
    ">

      <h2 className="
      text-3xl
      font-bold
      mb-10
      ">
        UNITEC
      </h2>

      <div className="
      flex
      flex-col
      gap-6
      ">

        <Link to="/admin/products">
          <FaBox />
          Products
        </Link>

        <Link to="/admin/gallery">
          <FaImages />
          Gallery
        </Link>

        <Link to="/admin/contacts">
          <FaEnvelope />
          Contacts
        </Link>

        <Link to="/admin/careers">
          <FaUsers />
          Careers
        </Link>

      </div>

    </div>
  );
}