interface Props {
  imgUrl: string;
  name: string;
  description: string;
  username: string;
  avatarUrl: string;
  songs: number;
  duration: string;
  shares: number;
}

export default function PlaylistDetailsHero({
  imgUrl,
  name,
  description,
  username,
  avatarUrl,
  songs,
  duration,
  shares,
}: Props) {
  return (
    <header className="playlists-details-hero">
      <img src={imgUrl} alt={name} />
      <div className="playlists-details-hero-info">
        <h3>{name}</h3>
        <h4>{description || ""}</h4>
        <div className="playlists-details-hero-info-owner">
          <img src={avatarUrl}></img>
          <p>{username || "TubeFy"}</p>
          <p>{shares} shares</p>
          <p>{songs} songs</p>
          <p>About {duration}</p>
        </div>
      </div>
    </header>
  );
}
