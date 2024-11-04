import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useContext } from "react";
import { Icon } from "@iconify/react";
import { DataContext } from "../App";

export interface Crypto {
  id: string;
  name: string;
  tsupply: string;
  symbol: string;
  price_usd: string;
}

const Table = () => {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [start, setStart] = useState<number>(0);
  const {setData} = useContext(DataContext);

  const getCrypto = () => {
    return useQuery({
      queryKey: ["getCrypto"],
      queryFn: async () => {
        const res = await fetch(
          `https://api.coinlore.net/api/tickers/?start=${start}&limit=10`
        );
        return await res.json();
      },
    });
  };

 const { data, refetch, isLoading } = getCrypto();

  useEffect(() => {
    if (data) {
      setCryptoData(data.data);
      setData(data.data)
    }
  }, [data]);

  const handleNext = () => {
    setStart((prev) => prev + 10);
  };

  const handlePrev = () => {
    setStart((prev) => prev - 10);
  };

  useEffect(() => {
    refetch();
  }, [start]);

  return (
    <div>
      <div className="w-[600px] mx-auto shadow-[-1px_1px_5px_2px_rgba(0,0,0,0.1)] rounded-xl hidden md:block">

        {isLoading ? (
          <div className="py-10">
            <div className="loader"></div>
          </div>
        ) : (
          <table className="w-full ">
            <tr className="text-left">
              <th className="py-3 px-4">Coin</th>
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Total Supply</th>
            </tr>

            {cryptoData.map((items) => {
              return (
                <tr
                  key={items.id}
                  className="even:bg-[#001400] even:text-white"
                >
                  <td className="py-3 px-4 text-sm">{items.name}</td>
                  <td className="py-3 px-4 text-sm">{items.symbol}</td>
                  <td className="py-3 px-4 text-sm">{items.price_usd}</td>
                  <td className="py-3 px-4 text-sm">{items.tsupply}</td>
                </tr>
              );
            })}
          </table>
        )}

        <div className="flex justify-between items-center px-4 py-3">
          {start > 1 ? (
            <button
              onClick={handlePrev}
              className="bg-[#001400] text-sm border border-[#001400] text-white py-2 px-4 rounded-[20px] flex items-center gap-1 font-semibold hover:bg-white hover:text-black ease-in duration-200 "
            >
              <Icon icon="ooui:arrow-next-rtl" className="text-sm" />
              Prevous
            </button>
          ) : (
            <button />
          )}

          <button
            onClick={handleNext}
            className="bg-[#001400] text-sm border border-[#001400] text-white py-2 px-4 rounded-[20px] flex items-center gap-1 font-semibold hover:bg-white hover:text-black ease-in duration-200 "
          >
            Next <Icon icon="ooui:arrow-next-ltr" className="text-sm" />
          </button>
        </div>
      </div>

      <div>
        <MobileTable
          cryptoData={cryptoData}
          handlePrev={handlePrev}
          start={start}
          handleNext={handleNext}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

const MobileTable = ({
  cryptoData,
  handlePrev,
  handleNext,
  start,
  isLoading,
}: {
  cryptoData: Crypto[];
  handlePrev: () => void;
  handleNext: () => void;
  start: number;
  isLoading: boolean;
}) => {
  return (
    <div className="md:hidden">
      <div className="mx-5 my-5 shadow-[-1px_1px_5px_2px_rgba(0,0,0,0.1)] rounded-lg">
        {isLoading && (
          <div className="py-10">
            <div className="loader"></div>
          </div>
        )}

        {cryptoData.map((item) => {
          return (
            <div className="grid grid-cols-2 even:bg-[#001400] even:text-white w-full" key={item.id}>
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

        <div className="flex justify-between items-center px-4 py-3">
          {start > 1 ? (
            <button
              onClick={handlePrev}
              className="bg-[#001400] text-sm border border-[#001400] text-white py-2 px-4 rounded-[20px] flex items-center gap-1 font-semibold hover:bg-white hover:text-black ease-in duration-200 "
            >
              <Icon icon="ooui:arrow-next-rtl" className="text-sm" />
              Prevous
            </button>
          ) : (
            <button />
          )}

          <a href="#home">
            <button
              onClick={handleNext}
              className="bg-[#001400] text-sm border border-[#001400] text-white py-2 px-4 rounded-[20px] flex items-center gap-1 font-semibold hover:bg-white hover:text-black ease-in duration-200 "
            >
              Next <Icon icon="ooui:arrow-next-ltr" className="text-sm" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Table;
