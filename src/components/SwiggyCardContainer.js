import { ALT_IMAGE_URL, SWIGGY_RESTUARANT_IMAGE_URL } from "../utils/links";

const SwiggyCardContainer = (props) => {
  // console.log(props.resData.info);

  const { name, cloudinaryImageId, avgRating, cuisines, costForTwo } =
    props.resData.info;

  return (
    <div className="res-card">
      <img src={SWIGGY_RESTUARANT_IMAGE_URL + cloudinaryImageId} alt={name} />
      <h4>{name}</h4>
      <h4>{cuisines.join(", ")}</h4>
      <h4> Ratings: {avgRating ? avgRating : "New"}</h4>
      <h4>{costForTwo}</h4>
    </div>
  );
};

export default SwiggyCardContainer;
