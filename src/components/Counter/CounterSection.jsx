import CountUp from "react-countup";

export default function CounterSection() {
  return (
    <section className="py-20 bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">

        <div className="text-center">
          <h2 className="text-5xl font-bold">
            <CountUp end={25} duration={3} />+
          </h2>
          <p>Years Experience</p>
        </div>

        <div className="text-center">
          <h2 className="text-5xl font-bold">
            <CountUp end={500} duration={3} />+
          </h2>
          <p>Projects</p>
        </div>

        <div className="text-center">
          <h2 className="text-5xl font-bold">
            <CountUp end={150} duration={3} />+
          </h2>
          <p>Clients</p>
        </div>

        <div className="text-center">
          <h2 className="text-5xl font-bold">
            <CountUp end={50} duration={3} />+
          </h2>
          <p>Countries</p>
        </div>

      </div>

    </section>
  );
}