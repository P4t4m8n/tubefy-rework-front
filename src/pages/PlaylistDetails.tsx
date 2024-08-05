import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { playlistService } from "../services/playlist.service";
import { Loader } from "../components/Loader";
import { IPlaylistDetailed } from "../models/playlist.model";
import PlaylistDetailsHero from "../components/PlaylistDetails/PlaylistDetailsHero";
import PlayBtn from "../components/Buttons/PlayBtn";
import { LikeBtn } from "../components/Buttons/LikeBtn";
import { IGenericModelItem } from "../models/app.model";
import { DotsSVG, LibrarySVG } from "../components/svg/SVGs";
import GenericModel from "../components/GenericComponents/GenericModel";
import PlaylistSongsList from "../components/PlaylistSongList/PlaylistSongsList";

export default function PlaylistDetails() {
  const [playlist, setPlaylist] = useState<IPlaylistDetailed | null>(null);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (params.id) loadPlaylist(params.id);
  }, [params.id]);

  const loadPlaylist = async (id: string) => {
    try {
      const playlist = await playlistService.get(id);
      console.log("playlist:", playlist);
      setPlaylist(playlist);
    } catch (error) {
      console.error(error);
    }
  };

  if (!playlist) return <Loader />;

  const {
    name,
    imgUrl,
    owner,
    songs,
    duration,
    description,
    isLikedByUser,
    id,
  } = playlist;

  const heroProps = {
    imgUrl,
    name,
    description,
    username: owner.username,
    avatarUrl: owner.avatarUrl,
    songs: songs.length,
    duration,
  };

  const modelItems: IGenericModelItem[] = [
    {
      svg: <LibrarySVG />,
      text: "Add to library",
      link: "/playlist/edit",
    },
    {
      svg: <LibrarySVG />,
      text: "Another action",
      onClick: () => console.log("Another action clicked"),
    },
  ];

  return (
    <section className="playlists-details">
      <PlaylistDetailsHero {...heroProps} />
      <div className="playlist-details-actions">
        <PlayBtn item={playlist} />
        <LikeBtn isLiked={isLikedByUser} itemId={id} />
        <GenericModel btnSvg={<DotsSVG />} items={modelItems} />
      </div>
      <PlaylistSongsList songs={songs} />
    </section>
  );
}
