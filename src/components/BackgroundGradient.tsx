import { useGradient } from "../hooks/useGradient";

export default function BackgroundGradient() {
  const gradient = useGradient();

  return (
    <div
      style={{
        background: `${gradient ? gradient : ""}`,
      }}
      className={`background-gradient ${gradient ? "show" : ""}`}
    ></div>
  );
}
