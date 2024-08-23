import { useRef } from "react";
import { useModel } from "../../../hooks/useModel";
import { CheckSVG, SortSVG } from "../../svg/SVGs";

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
      <button
        className="user-library-sort-model-btn"
        onClick={() => setIsModelOpen((prev) => !prev)}
      >
        <SortSVG />
      </button>
      {isModelOpen && (
        <div className="user-library-sort-model">
          <h2>Sort by</h2>
          <button onClick={() => onSortClick("recently_added")}>
            <span>Recently added</span>
            {currentSortBy === "recently_added" && <CheckSVG />}
          </button>
          <button onClick={() => onSortClick("alphabetical")}>
            <span>Alphabetical</span>
            {currentSortBy === "alphabetical" && <CheckSVG />}
          </button>
        </div>
      )}
    </div>
  );
}
