import { useState } from "react";
import { useNavigate } from "react-router";

export default function SearchForm({classes}) {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");



  const handleSearch = (e) => {
    e.preventDefault();
    if( typeof search === "string" && search.trim().length !== 0) {
      navigate(`/search/${search}`);
      setSearch("");
    }

  }


    return (
      <div className={classes}>
        <form onSubmit={handleSearch} className="flex w-40">
          <label className="input">
  <button type="submit" className="hover:scale-150 ">
  <svg className="h-[1em] opacity-50 hover:cursor-pointer hover:opacity-100 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
              </svg>
              </button>
            <input type="search" required placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
</label>

        </form>
        </div>
    );
}