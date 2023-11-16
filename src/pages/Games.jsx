import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

const Games = () => {
  const [data, setData] = useState({});
  const [games, setGames] = useState("");
  const[loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  // eslint-disable-next-line no-undef
  const api = import.meta.env.VITE_API_KEY;
  const url = `https://api.rawg.io/api/games?key=${api}&search=${games}`;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Adjust the format as needed
  };
  
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[games])

  const searchGames = (event) => {
    if (event.key == "Enter") {
      fetchData();
      setLoading(false)
      // setGames("");
    }
  };

  if(!games){
    <Spinner />
  }


  return (
    <>
      <div className="flex justify-center items-center"> 
        <input
          value={games}
          type="text"
          onChange={(e) => setGames(e.target.value)}
          onKeyDown={searchGames}
          placeholder="Search"
          className="w-72 h-10 rounded-2xl text-2xl p-6 placeholder:text-white mt-5"
        />
      </div>
      {loading ? (
        <Spinner />
      ) : 
      <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mx-10 justify-center items-center">
        {data.results && data.results.map((game) => (
          game.background_image && (
          <Link key={game.id} to={`/game/${game.id}`} className="flex justify-center items-center">
            <div className="w-80 my-10 flex bg-zinc-700 hover:border hover:border-white  rounded-lg " style={{ width: '300px', height: '300px' }}>
              <div className="image">
                <img src={game.background_image} className="" alt="game" style={{ width: '95%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="info ml-2 py-5 w-64">
                <p className="font-bold text-xl mb-5">{game.name}</p>
                <p className="py-1">Rating<span className="font-bold ml-1">{game.rating}</span></p>
                <p className="font-bold py-1">{formatDate(game.updated)}</p>
                
              </div>
            </div>
          </Link>
        )))}
      </div>
}
    </>
  );
};

export default Games;
