interface Props {
  imgUrl: string;
  name: string;
  description: string;
  username: string;
  avatarUrl: string;
  songsLength: number;
  duration: string;
}

export default function PlaylistDetailsHero({
  imgUrl,
  name,
  description,
  username,
  avatarUrl,
  songsLength,
  duration,
}: Props) {
  return (
    <header className="playlist-details-hero">
      <img src={imgUrl || "/default-playlist.png"} alt={name} />
      <div className="playlist-details-hero-info">
        <h3>{name}</h3>
        <h4>{description}</h4>
        <div className="playlist-details-hero-info-owner">
          <img src={avatarUrl || "/default-user.png"}></img>
          <p>{username || "TubeFy"}</p>
          <p>{songsLength} songs</p>
          <p>About {duration}</p>
        </div>
      </div>
    </header>
  );
}
