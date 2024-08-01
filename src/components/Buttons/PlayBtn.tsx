import { ISong } from "../../models/song.model";

interface Props {
  song: ISong;
}
export default function PlayBtn({ song }: Props) {
  console.log("song:", song);
  return <div>PlayBtn</div>;
}
