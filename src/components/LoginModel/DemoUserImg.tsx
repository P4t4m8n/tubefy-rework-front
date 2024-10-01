export default function DemoUserImg({ imgUrl }: { imgUrl: string }) {
  return (
    <img
      width="80"
      height="80"
      decoding="async"
      src={imgUrl}
      alt={"demo user "}
      onLoad={(e) => {
        (e.target as HTMLImageElement).style.scale = "1";
        (e.target as HTMLImageElement).style.opacity = "1";
      }}
    />
  );
}
