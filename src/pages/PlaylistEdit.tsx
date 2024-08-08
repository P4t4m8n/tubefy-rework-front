import { useParams } from "react-router-dom";
import { IPlaylistDetailed } from "../models/playlist.model";
import { useEffect, useState } from "react";
import { playlistService } from "../services/playlist.service";
import { getEmptyPlaylist } from "../util/playlist.util";
import { IUser } from "../models/user.model";

interface Props {
  user?: { user: IUser };
}

export default function PlaylistEdit({ user }: Props) {
  console.log("user:", user!.user);
  const [playlistToEdit, setPlaylistToEdit] =
    useState<IPlaylistDetailed | null>(null);
  const { id } = useParams();
  console.log("playlistToEdit:", playlistToEdit);

  useEffect(() => {
    if (id) {
      loadPlaylist(id);
    } else {
      setPlaylistToEdit(getEmptyPlaylist(user!.user));
    }
  }, [id, user]);

  const loadPlaylist = async (id: string) => {
    try {
      const playlist = await playlistService.get(id);
      setPlaylistToEdit(playlist);
    } catch (error) {
      console.error("error:", error);
    }
  };

  return <div>PlaylistEdit</div>;
}
