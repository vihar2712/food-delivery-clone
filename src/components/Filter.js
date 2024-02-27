import { cuisines } from "../utils/cuisines";
import { useDispatch, useSelector } from "react-redux";
import { filterCuisineArr } from "../utils/filterSlice";

const Filter = ({ showFilterFn, filteredCuisineFn, resetFn }) => {
  const dispatch = useDispatch();
  let checkedCuisines = useSelector((store) => store.filter?.cuisineArr);
  // console.log(checkedCuisines);
  let filterCuisines = [...checkedCuisines];
  const applyFilterFn = () => {
    filterCuisines.length > 0 ? filteredCuisineFn(filterCuisines) : resetFn();
    dispatch(filterCuisineArr(filterCuisines));
    showFilterFn(false);
  };
  const applyReset = () => {
    resetFn();
    showFilterFn(false);
    dispatch(filterCuisineArr([]));
  };
  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      filterCuisines.push(value);
    } else {
      filterCuisines = filterCuisines.filter((cuisine) => cuisine !== value);
    }
  };
  return (
    <>
      <div className="h-full w-full fixed top-0 flex flex-col items-center  bg-gray-700 opacity-50 z-20 "></div>
      <div className="h-full fixed top-0 w-full flex justify-center items-center z-30 ">
        <div className="w-6/12 bg-white p-2">
          <h1 className="ms-2 text-md font-medium text-green-700">
            FILTER BY CUISINE
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              applyFilterFn();
            }}
          >
            <div className="flex flex-col p-2 h-[200px] overflow-auto">
              {cuisines.map((cuisine) => (
                <div className="flex items-center" key={cuisine}>
                  <input
                    id={cuisine}
                    type="checkbox"
                    value={cuisine}
                    name="cuisine"
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                    onChange={(e) => handleChange(e)}
                    defaultChecked={checkedCuisines.includes(cuisine)}
                  />
                  <label
                    htmlFor={cuisine}
                    className="ms-2 text-md font-medium text-green-900"
                  >
                    {cuisine}
                  </label>
                </div>
              ))}
            </div>
            <button className="bg-green-600 p-2 m-2 hover:shadow-lg rounded-md text-white font-medium">
              Apply
            </button>
            <button
              className="bg-white border-2 border-green-600 p-2 m-2 hover:shadow-lg rounded-md font-medium"
              onClick={() => applyReset()}
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Filter;
