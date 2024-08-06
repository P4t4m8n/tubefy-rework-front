import { Link } from "react-router-dom";
import { searchGenres } from "../../util/constants.util";
import { utilService } from "../../util/util.util";

export default function SearchIndexGenresList() {
  return (
    <section className="genre-list">
      <h2>Browse all</h2>
      <ul>
        {searchGenres.map((genre) => (
          <li
            style={{ backgroundColor: utilService.getRandomColor() }}
            key={genre}
          >
            <Link to={`/search/${genre}`}>
              <p>{genre}</p>
              <img src={`genresImgs/${genre}.jpeg`} alt={`genre ${genre}`} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
