import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const GameDetails = () => {
  const [gameDetails, setGameDetails] = useState("");
  const { id } = useParams();
  const[loading, setLoading] = useState(true);

  const api = import.meta.env.VITE_API_KEY;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Adjust the format as needed
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${api}`
        );
        setGameDetails(response.data);
        setLoading(false)
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  return (
    <>
      {loading ? <Spinner /> :
      <div
        style={{
          backgroundImage: `url(${gameDetails.background_image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="h-[790px] xl:h-[738px] flex justify-center items-center"
      >
        <div className="xl:flex md:flex lg:flex">
          <div >
            <div
              className="container w-full xl:w-3/4 relative  xl:ml-20 xl:lg:md:top-0 rounded-xl p-3 backdrop-blur-sm bg-white/30 xl:lg:md-10 border border-gray-600"
              style={{ color: `#${gameDetails.saturated_color}` }}
            >
              <h1 className="mb-3 text-3xl font-bold ">{gameDetails.name}</h1>
              <p className="my-3 text-2xl "><span className="font-semibold">Rating: </span> {gameDetails.rating}</p>
              <p className="my-3 text-2xl ">
               <span className="font-semibold">Updated On: </span>{formatDate(gameDetails.updated)}
              </p>
              {gameDetails.ratings && (
                <ul className="my-3 text-xl grid md:lg:xl:grid-cols-2 list-disc ml-4">
                  {gameDetails.ratings.map((rate) => (
                    <li key={rate.id}>
                      {rate.title} : {rate.percent}%
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="hidden xl:grid md:grid justify-center items-center">
              {gameDetails.tags && (
                <ul className="my-3 text-xl xl:md:visible grid xl:grid-cols-5 md:grid-cols-10 lg:grid-cols-9  ml-4 p-5 text-center">
                  {gameDetails.tags.slice(0, 18).map((tag) => (
                    <li
                      className="rounded-2xl border border-white/50 bg-gray-300 m-3 p-1 text-base backdrop-blur-sm bg-white/30 font-semibold "
                      style={{color:`#${gameDetails.dominant_color}`}}
                      key={tag.id}
                    >
                      {tag.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
}
    </>
  );
};

export default GameDetails;
