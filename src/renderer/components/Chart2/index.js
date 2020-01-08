// @flow
/* eslint-disable react/no-unused-prop-types */

/**
 *                                   Chart
 *                                   -----
 *
 *                                    XX
 *                                   XXXX
 *                          X       XX  X
 *                         XXXX    XX   X
 *                        XX  X  XX     X
 *                       X    XXXX       X     XX    X
 *                      XX     XX        X   XX XX  XX
 *                     XX                XX XX   XXXX
 *                                        XX
 *                                        XX
 *  Usage:
 *
 *    <Chart
 *      data={data}
 *      color="#5f8ced"   // Main color for line, gradient, etc.
 *      height={300}      // Fix height. Width is responsive to container.
 *    />
 *
 *    `data` looks like:
 *
 *     [
 *       { date: '2018-01-01', value: 10 },
 *       { date: '2018-01-02', value: 25 },
 *       { date: '2018-01-03', value: 50 },
 *     ]
 *
 */

import React, { useRef, useLayoutEffect, useState } from "react";
import ChartJs from "chart.js";
import styled from "styled-components";
import Color from "color";

import useTheme from "~/renderer/hooks/useTheme";
import Tooltip from "./Tooltip";

import type { Data } from "./types";
import type { ThemedComponent } from "~/renderer/styles/StyleProvider";

export type Props = {
  data: Data,
  id?: string,
  height?: number,
  tickXScale: string,
  color?: string,
  hideAxis?: boolean,
  dateFormat?: string,
  isInteractive?: boolean,
  renderTooltip?: Function,
  renderTickY: (t: number) => string | number,
  onlyUpdateIfLastPointChanges?: boolean,
};

const ChartContainer: ThemedComponent<{}> = styled.div.attrs(({ height }) => ({
  style: {
    height,
  },
}))`
  position: relative;
`;

const Chart = ({ height, data, color, renderTickY, renderTooltip }: Props) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const theme = useTheme("colors.palette");
  const [tooltip, setTooltip] = useState();

  const chartData = {
    datasets: [
      {
        label: "all accounts",
        borderColor: color,
        backgroundColor: ({ chart }) => {
          const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height / 1.2);
          gradient.addColorStop(0, Color(color).alpha(0.4));
          gradient.addColorStop(1, Color(color).alpha(0.0));
          return gradient;
        },
        pointRadius: 0,
        borderWidth: 2,
        data: data.map(d => ({
          x: new Date(d.date),
          y: d.value,
        })),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: false,
      intersect: false,
      mode: "index",
      custom: tooltip => setTooltip(tooltip),
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          type: "time",
          gridLines: {
            display: false,
            color: theme.text.shade10,
            zeroLineColor: theme.text.shade10,
          },
          ticks: {
            fontColor: theme.text.shade60,
            fontFamily: "Inter",
            maxTicksLimit: 7,
          },
          time: {
            displayFormats: {
              quarter: "MMM YYYY",
            },
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: theme.text.shade10,
            borderDash: [5, 5],
            drawTicks: false,
            drawBorder: false,
          },
          ticks: {
            maxTicksLimit: 4,
            fontColor: theme.text.shade60,
            fontFamily: "Inter",
            padding: 10,
            callback: value => renderTickY(value),
          },
        },
      ],
    },
  };

  useLayoutEffect(() => {
    if (chartRef.current) {
      chartRef.current.data = chartData;
      chartRef.current.update(0);
    }
  }, [data]);

  useLayoutEffect(() => {
    chartRef.current = new ChartJs(canvasRef.current, {
      type: "line",
      data: chartData,
      options,
    });
  }, []);

  return (
    <ChartContainer height={height}>
      <canvas ref={canvasRef} />
      {tooltip ? (
        <Tooltip tooltip={tooltip} theme={theme} renderTooltip={renderTooltip} color={color} />
      ) : null}
    </ChartContainer>
  );
};

export default Chart;
