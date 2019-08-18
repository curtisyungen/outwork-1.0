import React, { Component } from "react";
import { scaleLinear, axisLeft, axisBottom } from "d3";
import { max } from "d3-array";
import { select } from "d3-selection";
import "./barChart.css";

const d3 = require("d3");

class BarChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            maxMiles: 0,
        }
    }

    componentDidMount = () => {
        if (this.props.data && this.props.data.length > 0) {

            let maxMiles = 0;
            for (var m in this.props.data) {
                maxMiles = Math.max(this.props.data[m].miles, maxMiles);
            }

            this.setState({
                maxMiles: Math.ceil((maxMiles + 1) / 10) * 10,
            }, () => {
                this.createBarChart();
            });
        }
    }

    createBarChart = () => {
        let node = this.node;
        let data = this.props.data;
        let margin = 50;
        let width = this.props.width;
        let height = this.props.height;
        let xValue = d => d.weekNum;
        let yValue = d => d.miles;
        let maxMiles = this.state.maxMiles;

        // X-axis scale
        let x = scaleLinear()
            .domain([0, max(data, xValue)])
            .range([0, width]);

        // Y-axis scale
        let y = scaleLinear()
            .domain([0, maxMiles])
            .range([this.props.height, 0]);

        // Insert and format data
        select(node).attr("width", width + 2 * margin)
            .attr("height", height + 2 * margin)
            .append("g")
            .attr("transform", "translate(" + margin + "," + margin + ")")
            .selectAll("rect")
            .data(data.map(yValue))
            .enter().append("rect")
            .attr("width", 8)
            .attr("height", function (d) { return height - y(d); })
            .attr("x", function (d, i) { return x(i); })
            .attr("y", function (d) { return y(d); })
            .attr("class", "bar");

        select(node).selectAll("rect")
            .on("click", function(d) {

                let val = Math.round(d * 100) / 100;
                // let xPos = parseFloat(d3.select(this).attr("x"));
                // let yPos = parseFloat(d3.select(this).attr("y"));
                // let height = parseFloat(d3.select(this).attr("height"));

                d3.selectAll("rect").attr("fill", "black");
                select(node).selectAll(".barText").remove();

                d3.select(this).attr("fill", "gold");

                select(node)
                    .append("text")
                    .attr("class", "barText")
                    .attr("text-anchor", "middle")
                    .attr("fill", "black")
                    .attr("x", (width + margin + margin) * 0.5)
                    .attr("y", margin - 10)
                    .text(`${val} miles`);
                    
            });
            
        let xAxis = axisBottom(x);
        let yAxis = axisLeft(y);

        // X-axis Labels
        select(node).append("g")
            .attr("transform", "translate(" + margin + "," + (height + margin) + ")")
            .attr("class", "axis")
            .call(xAxis);

        // Y-axis Labels
        select(node).append("g")
            .attr("transform", "translate(" + margin + "," + margin + ")")
            .attr("class", "axis")
            .call(yAxis);

        // X-axis Title
        select(node).append("text")
            .attr("class", "x-label")
            .attr("text-anchor", "end")
            .attr("x", width * 0.5 + margin)
            .attr("y", height + margin + margin - 5)
            .text("Weeks");

        // Y-axis Title
        select(node).append("text")
            .attr("class", "y-label")
            .attr("text-anchor", "end")
            .attr("x", height * -0.5 - (margin / 2))
            .attr("y", 0)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Miles");
    }

    render() {
        return (
            <div className="container barChartContainer">
                {this.props.data && this.props.data.length > 0 ? (
                    <svg
                        ref={node => this.node = node}
                        width={this.props.width}
                        height={this.props.height}
                    >
                    </svg>
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        )
    }
}

export default BarChart;
