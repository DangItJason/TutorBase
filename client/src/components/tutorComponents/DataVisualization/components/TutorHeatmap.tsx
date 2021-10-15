import React from "react";
import { Container,Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import CountUp from 'react-countup';
import { Heatmap } from "@ant-design/charts";
import { ListItem } from "@antv/component";

// Represents one day in heatmap calendar
export interface IHeatmapData {
    date:string;
    week: number;
    day: number;
    month: number;
    hours: number;
}
export interface IParams {
    dateMap : Map<number, number>;
}
export const TutorHeatmap = (params: IParams) => {
    const secondsPerDay = 60*60*24;
    let heatmapData:Array<IHeatmapData> = [];
    let currentYear:Date = new Date();
    currentYear.setHours(0);
    currentYear.setMinutes(0);
    currentYear.setSeconds(0);
    currentYear.setMilliseconds(0);
    let date:Date = new Date(currentYear);
    date.setFullYear(currentYear.getFullYear()-1);
    let week = 0;
    while (date.getTime() <= currentYear.getTime()) {
        let hours = 0;
        if (params.dateMap.has(date.getTime()))
            hours = (params.dateMap.get(date.getTime()))!;
      heatmapData.push({
        date: date.toDateString(),
        week: week,
        day: date.getDay(),
        month: date.getMonth(),
        hours: hours
    });
    if (date.getDay() == 6)
      week++;
    date.setDate(date.getDate() + 1);
    }
    let heatmapConfig = {
      color: ['#ffffff', '#3cab52'], 
        height : 500, 
        data: heatmapData,
        autoFit: false,
        xField: 'week',
        yField: 'day',
        colorField: 'hours',
        reflect: 'y' as 'y',
        shape: 'boundary-polygon',
        meta: {
          day: {
            type: 'cat',
            values: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday'],
          },

          week: { type: 'cat' },
          hours: { sync: true },
          date: { type: 'cat' },
        },
        yAxis: { grid: null },
        tooltip: {
          title: 'date',
          fields: ['hours'],
          showMarkers: true,
        },
        interactions: [{ type: 'element-active' }],
        xAxis: {
          position: 'top' as 'top',
          tickLine: null,
          line: null,
          label: {
            offset: 12,
            style: {
              fontSize: 14,
              fill: '#666',
              textBaseline: 'top' as 'top',
            },
            formatter: function formatter(val:string, item:ListItem, index:number) {
              let startMonth = new Date();
              startMonth.setFullYear(startMonth.getFullYear()-1);
              let newUNIX = startMonth.getTime()/1000 + parseInt(val) * 7 * secondsPerDay;
              let thisTime = new Date(newUNIX * 1000);
              let month = thisTime.getMonth();
              let ret = "";

              if (month === 0) {
                ret = "JAN";
              }
              else if (month === 1) {
                ret =  "FEB";
              }
              else if (month === 2) {
                ret =  "MAR";
              }
              else if (month === 3) {
                ret =  "APR";
              }
              else if (month === 4) {
                ret =  "MAY";
              }
              else if (month === 5) {
                ret =  "JUN";
              }
              else if (month === 6) {
                ret =  "JUL";
              }
              else if (month === 7) {
                ret =  "AUG";
              }
              else if (month === 8) {
                ret =  "SEP";
              }
              else if (month === 9) {
                ret =  "OCT";
              }
              else if (month === 10) {
                ret =  "NOV";
              }
              else if (month === 11) {
                ret =  "DEC";
              }
              return ret + " " + thisTime.getFullYear();
            },
          },
        },
      };
      return (
        <Heatmap {...heatmapConfig}  />
      );
}
export default TutorHeatmap;