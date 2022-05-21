import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import "./App.css";

function App() {
  const [xValue, setXValue] = useState([]);
  const [yValue, setYValue] = useState([]);

  const apiCall = async () => {
    let API_KEY = "81WVUHQDVUVSZDYO";
    const symbol = "AMZN";
    let myDataX = [];
    let myDataY = [];

    await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        for (var key in data["Time Series (Daily)"]) {
          myDataX.push(key);
          myDataY.push(data["Time Series (Daily)"][key]["1. open"]);
        }
        setXValue(myDataX);
        setYValue(myDataY);
      })
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    apiCall();
  }, []);
  return (
    <div className="App">
      <h1>Stock Tracker</h1>
      <Plot
        data={[
          {
            x: xValue,
            y: yValue,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
          { x: xValue, y: yValue },
        ]}
        layout={{ width: 720, height: 440, title: "A Fancy Plot" }}
      />
    </div>
  );
}

export default App;
