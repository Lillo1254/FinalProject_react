import { Link } from "react-router";
import LazyLoadGameImage from "../../Uexp/lazyload/LazyLoadGameImage";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import playstationLogo from "../../../assets/images/play.jpg";
import windowsLogo from "../../../assets/images/windows.jpg";
import xboxLogo from "../../../assets/images/xbox.png";
// import { img, li } from "framer-motion/client";

export default function Card({
  title,
  image,
  dater,
  slug,
  description,
  publisher,
  parent_platforms,
}) {
  const location = useLocation();
  const isDetailPage = location.pathname.includes("/detail");
  const navigate = useNavigate();

  // console.log(xboxLogo)
  // console.log(playstationLogo)
  // console.log(windowsLogo)
  // console.log(parent_platforms)
  const platforms_slug = parent_platforms?.map((platform) => platform.platform.slug);

  return (
    <div translate="no" className="h-full">
      <div
        className={`card-surface p-4 rounded-2xl transition-transform duration-300 h-full flex flex-col justify-between items-center ${
          isDetailPage ? "shadow-detail" : "shadow-neon"
        }`}
      >
        <figure className="w-full flex justify-center relative">
          <LazyLoadGameImage image={image} className="rounded-lg" />
          <small className="absolute bottom-0 right-0 bg-primary bg-opacity-50 text-primary text-xs p-1 rounded-br-lg rounded-tl-lg">
            {publisher}
          </small>
        </figure>

        <div className="flex flex-col items-center text-center gap-2 mt-3 flex-1 w-full">
          {!isDetailPage && <h2 className="text-lg font-bold">{title}</h2>}

          {!isDetailPage && (
            <span className="text-sm text-primary">Date released: {dater}</span>
          )}

          {!isDetailPage && (
            <p className="text-sm text-primary line-clamp-3 mt-1">
              {" "}
              {description}{" "}
            </p>
          )}
        </div>

        <div>
          <ul className="flex gap-2">

          {platforms_slug?.includes('playstation') && (
             <li className=""> <img src={playstationLogo} alt="playstation-logo" className="w-12 h-12 rounded-full" /></li>
          )}
  {platforms_slug?.includes('pc') && (
    <li className=""><img src={windowsLogo} alt="windows-logo" className="w-12 h-12 rounded-full" /></li>
  )}
  {platforms_slug?.includes('xbox') && (
    <li className=""><img src={xboxLogo} alt="xbox-logo" className="w-12 h-12 rounded-full" /></li>
  )}

  </ul>


        </div>
        <div className="w-full flex justify-center mt-3">
          {!isDetailPage ? (
            <Link to={`/detail/${slug}`} className="btn btn-primary">
              Watch
            </Link>
          ) : (
            <div className="flex gap-2 justify-between w-100">
              <Link to={`/market`} className="btn btn-primary">
                Back to All Games
              </Link>
              <button onClick={() => navigate(-1)} className="btn btn-primary">
                Back page
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
