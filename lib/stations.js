import stations from "../hydro-stations.json";
import measurements from "../measurements.json";

export function getStations() {
  return stations;
}

export function getStationUrls() {
  return stations.map((s) => {
    return {
      params: {
        url: s.url,
      },
    };
  });
}

export function getStationData(url) {
  const stationData = stations.find((s) => s.url === url);

  return stationData;
}

export function getChartData(url) {
  const id = stations.find((s) => s.url === url).id;
  const data = measurements[id];

  // [{'time': 'value'}, {'time': 'value'}, {'time': 'value'}, {'time': 'value'}]
  const last3days = data.slice(-14);

  return {
    labels: last3days.map((v) => Object.keys(v)),
    datasets: [
      {
        label: "Water level",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: last3days.map((v) => +Object.values(v)),
      },
    ],
  };
}
