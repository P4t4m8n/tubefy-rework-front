import { IGenericModelItem } from "../../models/app.model";
import GenericModel from "../GenericComponents/GenericModel";
import { CreatePlaylistSVG, LibrarySVG, PlusSVG } from "../svg/SVGs";

export default function CreatePlaylist() {
  const items: IGenericModelItem[] = [
    {
      svg: <CreatePlaylistSVG />,
      text: "Create a new playlist",
      link: "/playlist/edit",
    },
  ];
  return (
    <section className="user-library-header">
      <button className="your-library">
        <LibrarySVG />
        <span>Your Library</span>
      </button>

      <GenericModel items={items} btnSvg={<PlusSVG />} />
    </section>
  );
}
