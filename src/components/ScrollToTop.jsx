import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(()=>{

     window.scrollTo(0,0, {behaviour: 'smooth'})
  },[pathname])

};

export default ScrollToTop;
