import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(window.navigator.onLine);
  // console.log("useOnlineStatus called", onlineStatus);
  // console.log(window.navigator.onLine, "---------", onlineStatus);

  useEffect(() => {
    // console.log("useEffect callled inside status");

    window.addEventListener("offline", () => {
      // debugger;
      // console.log("bye offline user");

      setOnlineStatus(false);
    });
    window.addEventListener("online", () => {
      // console.log("Hello online user");

      setOnlineStatus(true);
    });
  }, []);
  // console.log("chupppp");

  return onlineStatus;
};

export default useOnlineStatus;
