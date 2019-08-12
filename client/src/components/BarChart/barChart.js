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
            .range([0, 200]);

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
            .attr("x", (d, i) => i * 25)
            .attr("y", d => 200 - yScale(d))
            .attr("height", d => yScale(d))
            .attr("width", 25)
            .attr("transform", (d, i) => {
                let translate = [10 * i, 0]
                return "translate(" + translate + ")";
            });
    }

    render() {
        return (
            <div className="container">
                <svg 
                    ref={node => this.node = node}
                    width={500} 
                    height={500}
                >
                </svg>
            </div>
        )
    }
}

export default BarChart;