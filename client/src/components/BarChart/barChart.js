import React, { Component } from "react";
import { scaleLinear, scaleBand, axisLeft, axisBottom } from "d3";
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
        let svg = select(node);
        let data = this.props.data;
        let margin = { top: 20, right: 20, bottom: 20, left: 50 };
        let innerWidth = this.props.width - margin.left - margin.right;
        let innerHeight = this.props.height - margin.top - margin.bottom;

        let xValue = d => d.weekNum;
        let yValue = d => parseInt(d.miles);

        const xScale = scaleLinear()
            .domain([0, max(data, xValue)])
            .range([0, innerWidth]);

        const yScale = scaleBand()
            .domain(data.map(yValue))
            .range([0, innerHeight]);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        g.append("g").call(axisBottom(xScale))
            .attr("transform", `translate(0, ${innerHeight})`);

        g.append("g").call(axisLeft(yScale));

        g.selectAll("rect").data(data)
            .enter().append("rect")
                .attr("width", d => xScale(xValue(d)))
                .attr("height", yScale.bandwidth());

        // // Create rectangles
        // g.selectAll("rect")
        //     .data(this.props.data)
        //     .enter()
        //     .append("rect");

        // // Insert data
        // g.selectAll("rect")
        //     .data(this.props.data)
        //     .exit()
        //     .remove();

        // Style rectangles
        g.selectAll("rect")
            .data(data.map(yValue))
            .style("fill", "steelblue")
            // .attr("x", (d, i) => i * 15)
            .attr("y", innerHeight - yValue)
            .attr("height", d => yScale(d))
            .attr("width", 15)
            .attr("transform", (d, i) => {
                let translate = [15 * i, 0]
                return "translate(" + translate + ")";
            });
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