import "./App.css";
import Header from "./components/header";
import Table from "./components/table";
import { createContext, useState } from "react";
import { Crypto } from "./components/table";

interface Data {
  data: Crypto[];
  setData: (data: Crypto[]) => void;
}
export const DataContext = createContext<Data>({
  data: [],
  setData: () => {}
});

function App() {
  const [data, setData] = useState<Crypto[]>([]);

  return (
    <div>
      <DataContext.Provider value={{ data, setData }}>
        <Header />
        <Table />
      </DataContext.Provider>
    </div>
  );
}

export default App;
