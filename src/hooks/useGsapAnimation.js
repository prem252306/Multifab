import { useEffect } from "react";
import gsap from "gsap";

export default function useGsapAnimation(
  selector
) {
  useEffect(() => {
    gsap.from(selector, {
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: 0.2
    });
  }, [selector]);
}