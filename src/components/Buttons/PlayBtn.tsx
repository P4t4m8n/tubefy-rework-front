import { ISong } from "../../models/song.model";

interface Props {
  song: ISong;
}
export default function PlayBtn({ song }: Props) {
  return <div>PlayBtn</div>;
}
