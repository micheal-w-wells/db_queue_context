import React, { useEffect, useState } from "react";
import PQueue from "p-queue/dist";

export interface DBRequest {
  sql: string;
  asyncTask: () => Promise<any>;
}

const theQueue = new PQueue({ concurrency: 1 });

export const DBContext = React.createContext({
  asyncQueue: async (request: DBRequest) => {
    let x: unknown;
    return x;
  },
  ready: false,
});

export const DBProvider = (props: any) => {
  const [ready, setIsReady] = useState(false);

  const processRequest = async (dbRequest: DBRequest) => {
    const returnPromise = theQueue.add(dbRequest.asyncTask);
    console.log("pushing to queue");
    console.log("queue length: " + theQueue.size);
    return returnPromise;
  };

  useEffect(() => {
    console.log("setup context provider");
    setIsReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <DBContext.Provider value={{ asyncQueue: processRequest, ready: true }}>
          {props.children}
        </DBContext.Provider>
      ) : (
        props.children
      )}
    </>
  );
};
