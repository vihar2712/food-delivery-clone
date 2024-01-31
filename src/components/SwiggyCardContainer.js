import { useContext } from "react";
import { ALT_IMAGE_URL, SWIGGY_IMAGE_URL } from "../utils/links";
import UserContext from "../utils/UserContext";

const SwiggyCardContainer = (props) => {
  // console.log(props.resData.info);

  const { name, cloudinaryImageId, avgRating, cuisines, costForTwo, sla } =
    props.resData.info;

  const { loggedInUser, loginTime } = useContext(UserContext);
  return (
    <div className="p-2">
      <img
        src={SWIGGY_IMAGE_URL + cloudinaryImageId}
        alt={name}
        className="h-[150px] w-full rounded-md"
      />
      <h4 className="font-bold text-lg text-center">{name}</h4>
      <h4>{cuisines.join(", ")}</h4>
      <h4> Ratings: {avgRating ? avgRating : "New"}</h4>
      <h4>{costForTwo}</h4>
      <h4>ETA: {sla.slaString}</h4>
      <h4>
        User: {loggedInUser} at {loginTime}
      </h4>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="bg-black absolute text-white rounded-md mt-1 p-1">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default SwiggyCardContainer;
