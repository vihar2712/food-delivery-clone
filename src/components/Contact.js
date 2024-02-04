const Contact = () => {
  return (
    <div className="w-6/12 mx-auto mt-10">
      <h1 className="font-bold text-2xl">Contact Us page</h1>
      <div>
        <input
          type="text"
          placeholder="name"
          className="border border-black p-2 m-2"
        />
        <input
          type="text"
          placeholder="email"
          className="border border-black p-2 m-2"
        />
        <label className="p-2 m-2">Male</label>
        <input type="radio" placeholder="gender" name="gender" value="male" />
        <label className="p-2 m-2">Female</label>
        <input type="radio" placeholder="gender" name="gender" value="female" />
        <label className="p-2 m-2">None</label>
        <input type="radio" placeholder="none" name="gender" value="none" />
        <button className="border border-black p-2 m-2 bg-gray-200 rounded-md">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Contact;
