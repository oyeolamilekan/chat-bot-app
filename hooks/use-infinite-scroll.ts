import { useState, useEffect, useCallback } from "react";

export const useInfiniteScroll = (callback: () => void) => {
  const [isFetching, setIsFetching] = useState(false);

  const memoizedCallback = useCallback(() => {
    const fetchData = async () => {
      await callback();
      setIsFetching(false);
    };

    fetchData();
  }, [callback]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight =
        "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const documentHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      const windowBottom = windowHeight + window.scrollY;

      if (windowBottom >= documentHeight && !isFetching) {
        setIsFetching(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching, setIsFetching]);

  useEffect(() => {
    if (!isFetching) return;

    memoizedCallback();
  }, [isFetching, memoizedCallback]);

  return { isFetching, setIsFetching };
};
