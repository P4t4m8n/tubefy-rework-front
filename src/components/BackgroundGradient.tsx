import { useRef } from "react";
import { useGradient } from "../hooks/useGradient";
import { useEffectUpdate } from "../hooks/useEffectUpdate";

export default function BackgroundGradient() {
  const gradient = useGradient();
  const ref = useRef<HTMLDivElement>(null);

  useEffectUpdate(() => {
    if (ref.current) {
      ref.current.classList.remove("show");

      setTimeout(() => {
        if (ref.current) {
          ref.current.classList.add("show");
          ref.current.style.background = gradient || "";
        }
      }, 200);
    }
  }, [gradient]);

  return <div ref={ref} className={`background-gradient`}></div>;
}
