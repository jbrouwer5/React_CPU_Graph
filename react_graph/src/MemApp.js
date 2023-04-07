import React, { useEffect, useState } from "react";
import "./App.css";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";

// A Chart object which provides the framework for the graph
class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          // data will be added after the class is instantiated
          data: [],
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
                text: "Mem Utilization",
                style: {
                  color: "#fff",
                  background: "#61dafb",
                },
              },
            },
          ],
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
          //   one minute (60000 ms) is the default
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

  // updateData provides functions to change the time range we look at
  // These called when the corresponding buttons are clicked on
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
      default:
    }
  }

  //   componentDidMount() {
  //     this.interval = setInterval(() => 5000);
  //   }

  //   componentWillUnmount() {
  //     clearInterval(this.interval);
  //   }

  //   returns the html for the graph
  render() {
    return (
      <div id="chart">
        <div class="toolbar">
          <button
            id="one_minute"
            onClick={() => this.updateData("one_minute")}
            className={this.state.selection === "one_minute" ? "active" : ""}
          >
            1min
          </button>
          &nbsp;
          <button
            id="five_minutes"
            onClick={() => this.updateData("five_minutes")}
            className={this.state.selection === "five_minutes" ? "active" : ""}
          >
            5mins
          </button>
          &nbsp;
          <button
            id="fifteen_minutes"
            onClick={() => this.updateData("fifteen_minutes")}
            className={
              this.state.selection === "fifteen_minutes" ? "active" : ""
            }
          >
            15mins
          </button>
          &nbsp;
          <button
            id="half_hour"
            onClick={() => this.updateData("half_hour")}
            className={this.state.selection === "half_hour" ? "active" : ""}
          >
            30mins
          </button>
          &nbsp;
          <button
            id="hour"
            onClick={() => this.updateData("hour")}
            className={this.state.selection === "hour" ? "active" : ""}
          >
            60mins
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

function MemApp() {
  const [memData, setMemData] = React.useState([]);
  const [memSelection, setMemSelection] = React.useState("");
  console.log(memSelection);
  var memChart = new Chart();
  memChart.state.options.annotations.yaxis.label = {
    show: true,
    text: "Mem Utilization",
    style: {
      color: "#fff",
      background: "#61dafb",
    },
  };

  React.useEffect(() => {
    fetch("/mem")
      .then((res) => res.json())
      .then((memData) => setMemData(memData));

    setMemSelection(memChart.state.memSelection);

    // refreshes every 5 seconds and pulls new
    // data from the backend
    const interval = setInterval(async () => {
      fetch("/mem")
        .then((res) => res.json())
        .then((memData) => setMemData(memData));

      setMemSelection(memChart.state.selection);

      await fetch("/memAdd");
    }, 5000);
  }, []);

  memChart.state.series = [
    {
      data: memData,
    },
  ];

  return memChart.render();
}

export default MemApp;
