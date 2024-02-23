import { SWIGGY_MENU_URL } from "../utils/links";
import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  // const [resMenu, setResMenu] = useState([]);
  useEffect(() => {
    // console.log("useEffect of useRestaurantMenu called");

    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(SWIGGY_MENU_URL + resId);
    const jsonData = await data.json();
    // console.log(jsonData);

    setResInfo(jsonData.data);
  };
  return resInfo;
};

export default useRestaurantMenu;
