import React, { Component } from "react";
import { scaleLinear, axisLeft, axisBottom } from "d3";
import { max } from "d3-array";
import { select } from "d3-selection";
import "./barChart.css";

class BarChart extends Component {

    componentDidMount = () => {
        console.log(this.props.data);
        if (this.props.data && this.props.data.length > 0) {
            this.createBarChart();
        }
    }

    createBarChart = () => {
        let node = this.node;
        let data = this.props.data;
        var margin = 20;
        var width = this.props.width;
        var height = this.props.height;
        let xValue = d => d.weekNum;
        let yValue = d => d.miles;

        var x = scaleLinear()
            .domain([0, max(data, xValue)])
            .range([0, width]);

        var y = scaleLinear()
            .domain(data.map(yValue))
            .range([this.props.height, 0]);

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
            .attr("y", function (d) { return y(d); });

        let xAxis = axisBottom(x);
        let yAxis = axisLeft(y);

        select(node).append("g")
            .attr("transform", "translate(" + margin + "," + (height + margin) + ")")
            .attr("class", "axis")
            .call(xAxis);

        select(node).append("g")
            .attr("transform", "translate(" + margin + "," + margin + ")")
            .attr("class", "axis")
            .call(yAxis);
    }

    render() {
        return (
            <div className="container barChartContainer">
                <svg
                    ref={node => this.node = node}
                    width={this.props.width}
                    height={this.props.height}
                >
                </svg>
            </div>
        )
    }
}

export default BarChart;
