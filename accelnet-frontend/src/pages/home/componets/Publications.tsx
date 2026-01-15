import { useEffect, useMemo, useState, useCallback } from "react";
import { ImageWithFallback } from "../../../componets/ImageWithFallback";

export function OrgHero(){
  const images = useMemo(
    () =>[],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const INTERVAL_TIME_MS = 6 * 1000;

  const goTo = useCallback(
    (index: number) => {
      const safeIndex = ((index % images.length) + images.length) % images.length;
      setCurrentIndex(safeIndex);
    },
    [images.length]
  );

  const next = useCallback(() =>{
    setCurrentIndex((i)=> (i+1)%images.length)
  }, [images.length]);

  const prev = useCallback(() =>{
    setCurrentIndex((i)=> (i-1 + images.length)%images.length);
  }, [images.length]);

  useEffect(()=>{
    const timer = setInterval(() => {
      setCurrentIndex((i)=> (i+1)%images.length);
    }, INTERVAL_TIME_MS);
    return () => clearInterval(timer);
  }, [images.length]);


  return(
    
  );
}