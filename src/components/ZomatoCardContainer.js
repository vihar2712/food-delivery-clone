const ZomatoCardContainer = (props) => {
  const { cft, image, name, cuisine, rating } = props.resData.info;

  return (
    <div className="res-card">
      <img src={image.url} />
      <h4>{name}</h4>
      <h4>{cuisine.map((c) => c.name + ", ")}</h4>
      <h4> Ratings: {rating.rating_text}</h4>
      <h4>{cft.text}</h4>
      {/* <h4>ETA</h4> */}
    </div>
  );
};

export default ZomatoCardContainer;
