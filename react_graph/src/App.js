import React, { useEffect, useState } from "react";
import "./App.css";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";

function ProcessData() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("/cpu")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return data;
}

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: [
            [Date.now() - 150000, 30.95],
            [Date.now() - 155000, 35.95],
          ],
        },
      ],
      options: {
        chart: {
          id: "area-datetime",
          type: "area",
          height: 350,
          zoom: {
            autoScaleYaxis: true,
          },
        },
        annotations: {
          yaxis: [
            {
              y: 30,
              borderColor: "#999",
              label: {
                show: true,
                text: "CPU Utilization",
                style: {
                  color: "#fff",
                  background: "#00E396",
                },
              },
            },
          ],
          //   xaxis: [
          //     {
          //       x: new Date("14 Nov 2012").getTime(),
          //       borderColor: "#999",
          //       yAxisIndex: 0,
          //       label: {
          //         show: true,
          //         text: "Rally",
          //         style: {
          //           color: "#fff",
          //           background: "#775DD0",
          //         },
          //       },
          //     },
          //   ],
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: "hollow",
        },
        xaxis: {
          type: "datetime",
          min: Date.now() - 60000,
          tickAmount: 6,
          labels: {
            format: "h:mm TT",
          },
        },
        yaxis: {
          labels: {
            /**
             * Allows users to apply a custom formatter function to yaxis labels.
             *
             * @param { String } value - The generated value of the y-axis tick
             * @param { index } index of the tick / currently executing iteration in yaxis labels array
             */
            formatter: function (val, index) {
              return Math.round(val) + "%";
            },
          },
        },
        tooltip: {
          x: {
            format: "h:mm TT",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        },
      },

      selection: "one_minute",
    };
  }

  updateData(timeline) {
    this.setState({
      selection: timeline,
    });

    switch (timeline) {
      case "one_minute":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          Date.now() - 60000,
          Date.now()
        );
        break;
      case "five_minutes":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          Date.now() - 300000,
          Date.now()
        );
        break;
      case "fifteen_minutes":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          Date.now() - 900000,
          Date.now()
        );
        break;
      case "half_hour":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          Date.now() - 1800000,
          Date.now()
        );
        break;
      case "hour":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          Date.now() - 3600000,
          Date.now()
        );
        break;
      //   case "All":
      //     ApexCharts.exec(
      //       "area-datetime",
      //       "zoomX",
      //       Date.now() - 3600000,
      //       Date.now()
      //     );
      //     break;
      default:
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div id="chart">
        <div class="toolbar">
          <button
            id="one_minute"
            onClick={() => this.updateData("one_minute")}
            className={this.state.selection === "one_minute" ? "active" : ""}
          >
            1M
          </button>
          &nbsp;
          <button
            id="five_minutes"
            onClick={() => this.updateData("five_minutes")}
            className={this.state.selection === "five_minutes" ? "active" : ""}
          >
            5M
          </button>
          &nbsp;
          <button
            id="fifteen_minutes"
            onClick={() => this.updateData("fifteen_minutes")}
            className={
              this.state.selection === "fifteen_minutes" ? "active" : ""
            }
          >
            15M
          </button>
          &nbsp;
          <button
            id="half_hour"
            onClick={() => this.updateData("half_hour")}
            className={this.state.selection === "half_hour" ? "active" : ""}
          >
            30M
          </button>
          &nbsp;
          <button
            id="hour"
            onClick={() => this.updateData("hour")}
            className={this.state.selection === "hour" ? "active" : ""}
          >
            60M
          </button>
          {/* &nbsp;
          <button
            id="All"
            onClick={() => this.updateData("All")}
            className={this.state.selection === "All" ? "active" : ""}
          >
            ALL
          </button> */}
        </div>

        <div id="chart-timeline">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    );
  }
}

function App() {
  const [data, setData] = React.useState([]);
  const [selection, setSelection] = React.useState("");
  console.log(selection);
  var chart = new Chart();

  React.useEffect(() => {
    fetch("/cpu")
      .then((res) => res.json())
      .then((data) => setData(data));

    setSelection(chart.state.selection);

    const interval = setInterval(async () => {
      fetch("/cpu")
        .then((res) => res.json())
        .then((data) => setData(data));

      setSelection(chart.state.selection);

      await fetch("/add");
    }, 5000);
  }, []);

  chart.state.series = [
    {
      data: data,
    },
  ];

  //   chart.state.selection = selection;
  //   console.log(selection);
  return chart.render();
}

export default App;
