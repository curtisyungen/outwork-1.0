import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";
import "./barChart.css";

class BarChart extends Component {

    componentDidMount = () => {
        if (this.props.data && this.props.data.length > 0) {
            this.createBarChart();
        }
    }

    createBarChart = () => {
        let node = this.node;
        let dataMax = max(this.props.data)

        // Scale chart
        let yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.height]);

        // Create rectangles
        select(node)
            .selectAll("rect")
            .data(this.props.data)
            .enter()
            .append("rect");

        // Insert data
        select(node)
            .selectAll("rect")
            .data(this.props.data)
            .exit()
            .remove();

        // Style rectangles
        select(node)
            .selectAll("rect")
            .data(this.props.data)
            .style("fill", "#424242")
            .style("border", "1x solid black")
            .attr("x", (d, i) => i * 15)
            .attr("y", d => this.props.height - yScale(d))
            .attr("height", d => yScale(d))
            .attr("width", 15)
            .attr("transform", (d, i) => {
                let translate = [5 * i, 0]
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
