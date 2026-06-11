import Tilt from "react-parallax-tilt";

export default function TiltCard({ children, className = "", maxAngle = 10, borderRadius = "24px" }) {
  return (
    <Tilt
      className={`relative ${className}`}
      tiltMaxAngleX={maxAngle}
      tiltMaxAngleY={maxAngle}
      perspective={1200}
      glareEnable={true}
      glareMaxOpacity={0.18}
      glareColor="rgba(255,255,255,0.7)"
      glarePosition="all"
      glareBorderRadius={borderRadius}
      scale={1.02}
      transitionSpeed={1200}
      gyroscope={true}
    >
      {children}
    </Tilt>
  );
}
