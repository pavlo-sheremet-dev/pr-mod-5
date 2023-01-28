import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { GoBackBtn } from "../components/GoBackBtn";
import { CocktailInfo } from "../components/CocktailInfo";
import { useLocation } from "react-router-dom";
import { routes } from "../routes";
import { useParams } from "react-router-dom";
import { getCocktailDetail } from "../api/cocktail-service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CocktailDetail = () => {
  const { cocktailId } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (!cocktailId) return;
    setIsLoading(true);
    setError("");
    getCocktailDetail(cocktailId)
      .then(setDetails)
      .catch((e) => setError("something goes wrong"))
      .finally(() => {
        setIsLoading(false);
      });
  }, [cocktailId]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  console.log(location)

  return (
    <Section>
    <GoBackBtn path={location.state?.from ?? '/'}/>
      <h1 className="uppercase text-4xl text-gray-600 text-center">
        {details && <CocktailInfo {...details} />}
      </h1>
      {isLoading && <Loader />}
    </Section>
  );
};
