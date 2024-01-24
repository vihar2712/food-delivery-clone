const SwiggyCardContainer = (props) => {
    const {name,cloudinaryImageId,avgRating,cuisines,costForTwo} = props.resData.info
    
  return (
    <div className="res-card">
      <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+cloudinaryImageId} />
      <h4>{name}</h4>
      <h4>{cuisines.map((c) => c + ", ")}</h4>
      <h4> Ratings: {avgRating}</h4>
      <h4>{costForTwo}</h4>
    </div>
  );
};

export default SwiggyCardContainer;