
interface Props {
  imgUrl: string;
  name: string;
  description: string;
  username: string;
  avatarUrl: string;
  songs: number;
  duration: string;
}

export default function PlaylistDetailsHero({
  imgUrl,
  name,
  description,
  username,
  avatarUrl,
  songs,
  duration,
}: Props) {
  return (
    <header className="playlists-details-hero">
      <img src={imgUrl} alt={name} />
      <div className="playlists-details-hero-info">
        <h3>{name}</h3>
        <h4>{description}</h4>
        <div className="playlists-details-hero-info-owner">
          <img src={avatarUrl || "/default-user.png"}></img>
          <p>{username || "TubeFy"}</p>
          <p>{songs} songs</p>
          <p>About {duration}</p>
        </div>
      </div>
    </header>
  );
}
