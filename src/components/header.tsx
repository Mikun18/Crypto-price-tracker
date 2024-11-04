import { Icon } from "@iconify/react";
import { useState, useContext } from "react";
import { DataContext } from "../App";

const Header = () => {
  const [search, setSeacrh] = useState<string>("");
  const { data } = useContext(DataContext);
  console.log(data);

  return (
    <div>
      <div
        className="flex py-3 px-5 items-center justify-between bg-[#001400]"
        id="home"
      >
        <h2 className="text-lg md:text-2xl text-white font-semibold w-[70%] md:w-auto">
          Crypto Price Tracker
        </h2>

        <div className="md:relative">
          <div className="flex items-center gap-1 border py-2 border-[#E2E8F0] bg-transparent rounded-xl px-3">
            <Icon icon="tabler:search" className="text-white text-2xl" />
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                className="focus:outline-none px-2 border-none bg-transparent w-full text-[#E2E8F0]"
                placeholder="Search Crypto"
                value={search}
                onChange={(e) => setSeacrh(e.target.value)}
              />
            </form>
          </div>

          <div className="w-[90%] md:w-full absolute z-[1000] right-0 md:right-auto mx-auto md:mx-0 bg-white shadow-lg px-0 rounded-md">
            {data
              .filter((filterItem) => {
                const searchTerm = search.toLowerCase();
                const cryptoName = filterItem.name.toLowerCase();

                return (
                  searchTerm &&
                  cryptoName.includes(searchTerm) &&
                  cryptoName !== searchTerm
                );
              })
              .map((item) => {
                return (
                  <div
                    className="grid grid-cols-2 even:bg-[#001400] even:text-white w-full"
                    key={item.id}
                  >
                    <div className="p-4">
                      <h3 className="font-semibold">Coin</h3>
                      <p className="text-sm">{item.name}</p>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold">Code</h3>
                      <p className="text-sm">{item.symbol}</p>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold">Price</h3>
                      <p className="text-sm">{item.price_usd}</p>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold">Total Supply</h3>
                      <p className="text-sm">{item.tsupply}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="my-7 md:w-[680px] mx-5 md:mx-auto ">
        <p className="text-sm md:text-lg text-center font-semibold">
          Welcome to the Crypto Price Tracker! Stay updated with live
          cryptocurrency prices. Browse the table below to see the latest
          values, trends, and movements in the crypto market. Happy tracking!
        </p>
      </div>
    </div>
  );
};

export default Header;
