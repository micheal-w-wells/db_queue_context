import React, { useContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DBContext, DBProvider } from "./DatabaseContext";
import { Button } from "@material-ui/core";

import { getStuffLocallyOrRemote } from "./useDataAccess";

const DataOnline = (props: any) => {
  const dbContext = useContext(DBContext);

  const [queryResult, setQueryResult] = useState(
    "ONLINE COMPONENT initial value - before query"
  );

  const onClick = async () => {
    const returnVal = await getStuffLocallyOrRemote(
      true,
      "request stuff",
      dbContext
    );
    setQueryResult(returnVal);
  };

  return (
    <>
      <Button variant="contained" onClick={onClick}>
        get data
      </Button>
      {queryResult}
    </>
  );
};

const DataOffline = (props: any) => {
  const dbContext = useContext(DBContext);

  const [queryResult, setQueryResult] = useState(
    "OFFLINE COMPONENT initial value - before query"
  );

  const onClick = async () => {
    const returnVal = await getStuffLocallyOrRemote(
      false,
      "request stuff",
      dbContext
    );
    setQueryResult(returnVal);
  };

  return (
    <>
      <Button variant="contained" onClick={onClick}>
        get data
      </Button>
      {queryResult}
    </>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DBProvider>
          <DataOnline />
          <DataOffline />
        </DBProvider>
      </header>
    </div>
  );
}

export default App;
