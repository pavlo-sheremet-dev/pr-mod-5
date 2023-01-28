import { CocktailsList } from "../components/CocktailsList";
import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { useState, useEffect } from "react";
import { getTrendingCocktails } from "../api/cocktail-service";
import { toast } from "react-toastify";

export const Home = () => {
  const [cocktails, setCocktails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError("");
    getTrendingCocktails()
      .then(setCocktails)
      .catch((e) => setError("something goes wrong"))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <>
      <Section>
        <h1 className="text-center font-black text-gray-700 text-4xl mb-10">
          Trending cocktails
        </h1>
        {cocktails.length > 0 && <CocktailsList cocktails={cocktails} />}
      </Section>
      {isLoading && <Loader />}
    </>
  );
};
