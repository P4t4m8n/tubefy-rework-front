import { useRef } from "react";
import { useModel } from "../../../hooks/useModel";
import { CheckSVG, SortSVG } from "../../svg/SVGs";
import GeneralBtn from "../../Menus/GeneralBtn";

interface Props {
  sortPlaylists: (sortBy: "recently_added" | "alphabetical") => void;
  currentSortBy: string;
}
export default function UserLibraryFilterSortModel({
  sortPlaylists,
  currentSortBy,
}: Props) {
  const sortModelRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModel(sortModelRef);

  const onSortClick = (sortBy: "recently_added" | "alphabetical") => {
    sortPlaylists(sortBy);
    setIsModelOpen(false);
  };

  return (
    <div ref={sortModelRef} className="user-library-sort-model-con">
      <GeneralBtn
        onModelBtnClick={() => setIsModelOpen((prev) => !prev)}
        btnSvg={<SortSVG />}
        className="user-library-sort-model-btn"
      />
      {isModelOpen && (
        <div className="user-library-sort-model">
          <h2>Sort by</h2>
          <button onClick={() => onSortClick("recently_added")}>
            <h2>Recently added</h2>
            {currentSortBy === "recently_added" && <CheckSVG />}
          </button>
          <button onClick={() => onSortClick("alphabetical")}>
            <h2>Alphabetical</h2>
            {currentSortBy === "alphabetical" && <CheckSVG />}
          </button>
        </div>
      )}
    </div>
  );
}
