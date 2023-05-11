import { createContext, useState } from "react";

export const LoaderContext = createContext({});
export const LoaderContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const loaderVisible = () => {
    document.querySelector(".loader").classList.add("loader-visible");
  };
  const loaderInVisible = () => {
    document.querySelector(".loader").classList.remove("loader-visible");
  };
  return (
    <LoaderContext.Provider
      value={{ isLoading, setIsLoading, loaderVisible, loaderInVisible }}
    >
      {props.children}
    </LoaderContext.Provider>
  );
};
