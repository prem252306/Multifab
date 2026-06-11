import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollTopButton() {

  const [show, setShow] = useState(false);

  useEffect(() => {

    const listener = () => {

      if (window.scrollY > 400) {
        setShow(true);
      } else {
        setShow(false);
      }

    };

    window.addEventListener("scroll", listener);

    return () =>
      window.removeEventListener("scroll", listener);

  }, []);

  return show ? (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      }
      className="
      fixed
      bottom-24
      right-6
      bg-orange-500
      text-white
      p-4
      rounded-full
      z-50
      "
    >
      <FaArrowUp />
    </button>
  ) : null;
}