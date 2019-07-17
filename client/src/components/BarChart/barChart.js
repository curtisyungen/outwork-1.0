import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";
import "./barChart.css";

class BarChart extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount = () => {
        this.createBarChart();
    }

    createBarChart = () => {
        let node = this.node;
        let dataMax = max(this.props.data)
        let yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.size[1]]);

        select(node)
            .selectAll("rect")
            .data(this.props.data)
            .enter()
            .append("rect");

        select(node)
            .selectAll("rect")
            .data(this.props.data)
            .exit()
            .remove();

        select(node)
            .selectAll("rect")
            .data(this.props.data)
            .style("fill", "#000")
            .attr("x", (d, i) => i * 25)
            .attr("y", d => this.props.size[1] - yScale(d))
            .attr("height", d => yScale(d))
            .attr("width", 25)
            .attr("transform", (d, i) => {
                let translate = [10 * i, 0]
                return "translate(" + translate + ")";
            });
    }

    render() {
        return (
            <div className="barChartContainer">
                <svg 
                    ref={node => this.node = node}
                    // className="bar"
                    width={500} 
                    height={500}>
                </svg>
            </div>
        )
    }
}

export default BarChart;