import { DBContext, DBRequest } from "./DatabaseContext";
import { useContext } from "react";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// prove out data access for online and offline.  offline needs to be queued up, but ideally all callers can await like when online
export const getStuffLocallyOrRemote = async (
  online: boolean,
  request: string,
  context: {
    asyncQueue: (request: DBRequest) => Promise<any>;
    ready: boolean;
  }
) => {
  let returnVal = "somehow no returnVal";
  if (online) {
    const response = await fetch("https://www.google.ca", {
      mode: "no-cors", // 'cors' by default
    });
    returnVal = "online data";
  } else {
    //offline

    // get access to queue:
    const dbcontext = context;

    let asyncReturnVal = null;

    //build task for queue
    const asyncDBAction = async () => {
      await delay(5000);
      return "offline data";
    };
    //push to queue
    returnVal = await dbcontext.asyncQueue({
      asyncTask: asyncDBAction,
      sql: "banana",
    });
  }
  return returnVal;
};
