import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import AddCommas from "./utils/AddCommas";

import "./App.css";

const cryptoAPI = process.env.REACT_APP_CRYPTO_API;

export default function App() {
  const [result, setResult] = useState([]);
  const [sortMethod, setSortMethod] = useState({
    sortBy: "market_cap_rank",
    decending: true,
  });

  const fetchData = async () => {
    const list = [];
    try {
      await axios.get(cryptoAPI).then((response) => {
        for (var i in response.data) {
          list.push(response.data[i]);
        }
        setResult(list);
      });
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const organizeData = (term) => {
    console.log("Term: ", term);
    console.log("SortBy: ", sortMethod.sortBy);
    if (sortMethod.sortBy === term) {
      setSortMethod({
        ...sortMethod,
        decending: !sortMethod.decending,
      });
    } else {
      setSortMethod({
        sortBy: term,
        decending: true,
      });
    }
    console.log("result: ", result);
    const sortedData = [...result];
    if (term === "market_cap_rank") {
      sortedData.sort((a, b) =>
        a.market_cap_rank > b.market_cap_rank ? 1 : -1
      );
    } else if (term === "name") {
      sortedData.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (term === "current_price") {
      sortedData.sort((a, b) => (a.current_price > b.current_price ? 1 : -1));
    } else if (term === "price_change_percentage_24h") {
      sortedData.sort((a, b) =>
        a.price_change_percentage_24h > b.price_change_percentage_24h ? 1 : -1
      );
    }
    setResult(sortedData);
    console.log("Data: ", result);
  };

  useEffect(() => {
    fetchData();
    setInterval(() => {
      fetchData();
    }, 10000);
  }, []);

  // console.log("Result: ", result);

  if (!result) return null;

  return (
    <div className="content">
      <table className="coin-table">
        <thead className="coin-table-head">
          <tr className="coin-table-head-row">
            <th className="coin-rank">
              <div
                className="coin-table-head-icon"
                onClick={() => organizeData("market_cap_rank")}
              >
                #
              </div>
              {sortMethod.sortBy === "market_cap_rank" ? (
                sortMethod.decending === true ? (
                  <FaCaretDown />
                ) : (
                  <FaCaretUp />
                )
              ) : null}
            </th>
            <th className="coin-name">
              <div
                className="coin-table-head-icon"
                onClick={() => organizeData("name")}
              >
                Coin
              </div>
              {sortMethod.sortBy === "name" ? (
                sortMethod.decending === true ? (
                  <FaCaretDown />
                ) : (
                  <FaCaretUp />
                )
              ) : null}
            </th>
            <th className="coin-price">
              <div
                className="coin-table-head-icon"
                onClick={() => organizeData("current_price")}
              >
                Price
              </div>
              {sortMethod.sortBy === "current_price" ? (
                sortMethod.decending === true ? (
                  <FaCaretDown />
                ) : (
                  <FaCaretUp />
                )
              ) : null}
            </th>
            <th className="coin-24h-change">
              <div
                className="coin-table-head-icon"
                onClick={() => organizeData("price_change_percentage_24h")}
              >
                24h
              </div>
              {sortMethod.sortBy === "price_change_percentage_24h" ? (
                sortMethod.decending === true ? (
                  <FaCaretDown />
                ) : (
                  <FaCaretUp />
                )
              ) : null}
            </th>
            <th className="coin-mkt-cap">
              <div
                className="coin-table-head-icon"
                onClick={() => organizeData("market_cap_rank")}
              >
                Mkt Cap
              </div>
              {sortMethod.sortBy === "market_cap_rank" ? (
                sortMethod.decending === true ? (
                  <FaCaretDown />
                ) : (
                  <FaCaretUp />
                )
              ) : null}
            </th>
          </tr>
        </thead>
        <tbody className="coin-table-body">
          {result.map((item, i) => (
            <tr className="coin-table-body-row" key={i}>
              <td
                className="coin-rank"
                key={`rank-${i}`}
              >{`${item.market_cap_rank}`}</td>

              <td className="coin-name" key={`name-${i}`}>
                <div className="coin-img-container">
                  <img
                    className="coin-img"
                    key={`img-${i}`}
                    src={item.image}
                    alt={`${item.id}`}
                  />
                </div>
                <div className="coin-name-name">{`${item.name}`}</div>
                <div className="coin-symbol">{`${item.symbol.toUpperCase()}`}</div>
              </td>
              <td className="coin-price" key={`price-${i}`}>
                {`$${AddCommas(item.current_price)}`}
              </td>
              <td className="coin-24h-change" key={`24h-change-${i}`}>
                {`${AddCommas(item.price_change_percentage_24h.toFixed(2))}%`}
              </td>
              <td className="coin-mkt-cap" key={`market-cap-${i}`}>
                {`$${AddCommas(item.market_cap)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
