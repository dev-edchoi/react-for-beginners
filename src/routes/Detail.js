import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState([]);
    const [movieDetail, setMovieDetail] = useState([]);

    const getMovie = async () => {
        const json = await (
            await fetch(
                `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
            )
        ).json();
        setMovieDetail(json.data.movie);
        setIsLoading(false);
    };
    console.log(movieDetail);
    useEffect(() => {
        getMovie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.hole}>
            {isLoading ? (
                <h1>Now Loading....</h1>
            ) : (
                <div>
                    <h1>
                        Title : {movieDetail.title} (평점 : {movieDetail.rating}
                        )
                    </h1>
                    <img
                        src={movieDetail.medium_cover_image}
                        alt="movie"
                        className={styles.img}
                    />
                    <p className={styles.p} style={{fontSize:"20px"}}>
                        개봉 : {movieDetail.year} / 장르 :{" "}
                        {movieDetail.genres.map((gen, index) => (
                            <span key={index}>{gen + ", "}</span>
                        ))}
                    </p>
                    <div className={styles.description}>
                        <p className={styles.p}>
                            영화 설명 : {"\n" + movieDetail.description_full}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detail;
