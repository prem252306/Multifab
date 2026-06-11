import { useRef } from "react";

export default function MagneticButton({
  children
}) {

  const ref = useRef();

  const move = (e) => {

    const rect =
      ref.current.getBoundingClientRect();

    const x =
      e.clientX -
      rect.left -
      rect.width / 2;

    const y =
      e.clientY -
      rect.top -
      rect.height / 2;

    ref.current.style.transform =
      `translate(${x * 0.2}px,${y * 0.2}px)`;

  };

  const leave = () => {
    ref.current.style.transform =
      "translate(0,0)";
  };

  return (

    <button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className="
      px-8
      py-4
      bg-orange-500
      text-white
      rounded-full
      "
    >

      {children}

    </button>

  );

}