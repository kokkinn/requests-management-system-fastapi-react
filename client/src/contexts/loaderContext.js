import { createContext, useState } from "react";

export const LoaderContext = createContext({});
export const LoaderContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const loaderVisible = () => {
    const loader = document.querySelector("#loader");
    loader.classList.add("loader-visible");
  };
  const loaderInVisible = () => {
    const loader = document.querySelector("#loader");
    loader.classList.remove("loader-visible");
  };
  return (
    <LoaderContext.Provider
      value={{ isLoading, setIsLoading, loaderVisible, loaderInVisible }}
    >
      {props.children}
    </LoaderContext.Provider>
  );
};
