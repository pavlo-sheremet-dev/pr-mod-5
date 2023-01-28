import { SearchForm } from "../components/SearchForm";
import { Section } from "../components/Section";
import { CocktailsList } from "../components/CocktailsList";
import { Loader } from "../components/Loader";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchByName } from "../api/cocktail-service";
import { toast } from "react-toastify";

export const Cocktails = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";

  const [cocktails, setCocktails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    setError("");
    searchByName(query)
      .then(setCocktails)
      .catch((e) => setError("something goes wrong"))
      .finally(() => {
        setIsLoading(false);
      });
  }, [query]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <>
      <Section>
        <h1 className="uppercase text-4xl text-gray-600 text-center">
          Search Cocktails
        </h1>
        <SearchForm />
        {cocktails.length > 0 && <CocktailsList cocktails={cocktails} />}
        {isLoading && <Loader />}
      </Section>
    </>
  );
};
