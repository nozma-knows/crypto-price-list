import axios from "axios";

export default async function FetchCryptoData(route) {
  console.log("route: ", route);
  const list = [];
  try {
    await axios.get(route).then((response) => {
      for (var i in response.data) {
        list.push(response.data[i]);
      }
      console.log("list: ", list);
      return list;
    });
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
}
