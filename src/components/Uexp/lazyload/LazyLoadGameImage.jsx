import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image }) {
    return (
        <LazyLoadImage
            src={image}
            alt="Game"
            effect="blur"
            className="rounded-xl shadow-lazy"
            wrapperProps={{
                style: {
                    TransitionDelay: "0.5s",
                }
            }}
            
        />
    );
}