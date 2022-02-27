import axios from "axios";

const cryptoAPI = process.env.REACT_APP_CRYPTO_API;

export default async function FetchCryptoPrices(setData) {
  const list = [];
  try {
    await axios.get(cryptoAPI).then((response) => {
      for (var i in response.data) {
        list.push(response.data[i]);
      }
      setData(list);
      console.log("list in FetchCryptoPrices: ", list);
    });
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
}
