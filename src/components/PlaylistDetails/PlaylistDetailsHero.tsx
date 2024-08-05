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
      <div className="station-header-info">
        <h3>{name}</h3>
        <h4>{description}</h4>
        <div>
          <img src={avatarUrl}></img>
          <p>{username || "TubeFy"}</p>
          <p>
            {songs} <span>songs</span>
          </p>
          <p>
            <span>Duration</span> {duration}
          </p>
        </div>
      </div>
    </header>
  );
}
