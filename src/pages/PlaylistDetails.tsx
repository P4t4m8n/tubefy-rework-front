import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
import { getUser, getUserPlaylistsState } from "../store/getStore";

export default function PlaylistDetails() {
  const [playlist, setPlaylist] = useState<IPlaylistDetailed | null>(null);
  const params = useParams<{ id: string; isLiked?: string }>();
  const location = useLocation();
  const isLiked =
    new URLSearchParams(location.search).get("isLiked") === "true";

  const userPlaylists = getUserPlaylistsState();
  const userId = getUser()?.id;

  const playlistsData = userPlaylists.map((playlist) => ({
    playlistsId: playlist.id,
    playlistsName: playlist.name,
    playlistImg: playlist.imgUrl,
  }));

  useEffect(() => {
    if (params.id) loadPlaylist(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const loadPlaylist = async (id: string) => {
    try {
      let playlist;
      if (isLiked) {
        playlist = await playlistService.getUserLikedSongsPlaylistById(id);
      } else {
        playlist = await playlistService.get(id);
      }
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

    shares,
  } = playlist;

  const heroProps = {
    imgUrl,
    name,
    description: "",
    username: owner.username,
    avatarUrl: owner?.imgUrl || "",
    songs: songs.length,
    duration,
    shares: shares.count,
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

  const isOwnerId = owner.id === userId ? owner.id : "";

  return (
    <section className="playlists-details">
      <PlaylistDetailsHero {...heroProps} />
      <div className="playlist-details-actions">
        <PlayBtn item={playlist} />
        <LikeBtn item={playlist} />
        <GenericModel btnSvg={<DotsSVG />} items={modelItems} />
      </div>
      <PlaylistSongsList
        isOwnerId={isOwnerId}
        songs={songs}
        userPlaylistsData={playlistsData}
        playlistId={playlist.id}
        setPlaylist={setPlaylist}
      />
    </section>
  );
}
