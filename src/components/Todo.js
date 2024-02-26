import { useState } from "react";

const Todolist = () => {
  const [itemIndex, setItemIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const [unchanged, setUnchanged] = useState([]);
  const [inputData, setInputData] = useState([]);
  const [removeData, setRemoveData] = useState([]);
  console.log(inputData, removeData);

  const handleInputItems = () => {
    const newObj = {
      inputText: inputText,
      number: itemIndex,
    };
    setInputData([...inputData, newObj]);
    setUnchanged([...inputData, newObj]);
    setItemIndex(itemIndex + 1);
    setInputText("");
  };

  const handleDeleteItem = (item) => {
    const inpData = inputData.filter((el) => el.number === item.number)[0];
    console.log(inpData);
    const delItem = inputData.filter((elem) => elem.number !== item.number);
    console.log(delItem);

    setInputData(delItem);
    setRemoveData([...removeData, inpData]);
  };

  const handleRestoreData = (item) => {
    inputData.splice(item.number, 0, item);
    setInputData(inputData);
    const filteredRemoveData = removeData.filter(
      (el) => el.number !== item.number
    );
    setRemoveData(filteredRemoveData);
  };

  return (
    <div className="w-6/12 mx-auto border-2 border-black p-4">
      <h1>Todo</h1>
      <div className="container">
        <input
          className=" border border-black"
          type="text"
          placeholder="add task here"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className=" border border-black" onClick={handleInputItems}>
          ADD
        </button>
      </div>
      <div className="items mt-5 bg-orange-200">
        {inputData.map((elem) => (
          <div key={elem.number}>
            <li>{elem.inputText}</li>
            <button
              className=" border border-black"
              onClick={() => handleDeleteItem(elem)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="restoreData mt-5 bg-green-200">
        <h1>Remove Items</h1>
        {removeData.map((elem) => (
          <div key={elem.number}>
            <li>{elem.inputText}</li>
            <button
              className=" border border-black"
              onClick={() => handleRestoreData(elem)}
            >
              Restore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todolist;
