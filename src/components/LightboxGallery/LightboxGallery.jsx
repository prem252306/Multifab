import { useState } from "react";

export default function LightboxGallery() {

  const images = [
    "https://images.unsplash.com/photo-1565008447742-97f6f38c985c",
    "https://images.unsplash.com/photo-1581092335397-9583eb92d232",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
    "https://images.unsplash.com/photo-1567789884554-0b844b597180"
  ];

  const [selected, setSelected] = useState(null);

  return (
    <section className="py-32 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-black text-center mb-16">
          Project Gallery
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {images.map((img, index) => (

            <img
              key={index}
              src={img}
              alt=""
              onClick={() =>
                setSelected(img)
              }
              className="
              cursor-pointer
              rounded-2xl
              h-72
              w-full
              object-cover
              hover:scale-105
              transition-all
              duration-300
              "
            />

          ))}

        </div>

      </div>

      {selected && (

        <div
          onClick={() =>
            setSelected(null)
          }
          className="
          fixed
          inset-0
          bg-black/90
          flex
          items-center
          justify-center
          z-[99999]
          "
        >

          <img
            src={selected}
            alt=""
            className="
            max-h-[90vh]
            max-w-[90vw]
            rounded-2xl
            "
          />

        </div>

      )}

    </section>
  );
}