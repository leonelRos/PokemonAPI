import React, { useEffect, useState } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination.";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [curPageUrl, setCurPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(curPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c))
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
      });

    return () => cancel();
  }, [curPageUrl]);

  function goToNextPage() {
    setCurPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurPageUrl(prevPageUrl);
  }

  if (loading) return "Espera...";

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
      />
    </>
  );
}

export default App;
