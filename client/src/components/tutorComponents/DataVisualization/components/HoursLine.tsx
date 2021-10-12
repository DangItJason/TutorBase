import React from "react";
import { Container,Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import CountUp from 'react-countup';
import { Datum, Heatmap, Line } from "@ant-design/charts";
import { ListItem } from "@antv/component";

// Represents one day in heatmap calendar
export interface IGraphData {
    date:string;
    time:number;
    hours: number;
}
export interface IParams {
    dateMap : Map<number, number>;
    fromTime : Date;
}
export const HoursLine = (params: IParams) => {
    let graphData:Array<IGraphData> = [];
    let currentYear:Date = new Date();
    currentYear.setHours(0);
    currentYear.setMinutes(0);
    currentYear.setSeconds(0);
    currentYear.setMilliseconds(0);
    let date:Date = new Date(params.fromTime);
    let week = 0;
    let totalHours = 0;
    while (date.getTime() <= currentYear.getTime()) {
        let hours = 0;
        if (params.dateMap.has(date.getTime()))
            hours = (params.dateMap.get(date.getTime()))!;
        totalHours += hours;
      graphData.push({
        date: date.toDateString(),
        time: date.getTime(),
        hours: totalHours
    });
    if (date.getDay() == 6)
      week++;
    date.setDate(date.getDate() + 1);
    }
    const config = { 
        data : graphData ,
        color: '#3cab52',
        xField : 'time' , 
        yField : 'hours' ,  
        tooltip: {
          title: 'date',
          fields: ['hours'],
          showMarkers: false,
          formatter: function formatter(datum:Datum) {
            let val = datum.hours;
            let value = Math.round(val * 100) / 100;
            return {name: "Total Hours Tutored", value: value.toString()};
          }
        },
        state : { 
          active : { 
            style : { 
              shadowBlur : 4 , 
              stroke : '#000' , 
              fill : 'red' , 
            } ,
          } ,
        } ,
        xAxis: {
          tickLine: null,
          line: null,
          label: {
            offset: 24,
            style: {
              fontSize: 20,
              fill: '#666',
            },
            formatter: function formatter(val:string, item:ListItem, index:number) {
              let valInt = parseInt(val);
              let time = new Date(valInt);
              let month = time.getMonth();
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
              return ret + " " + time.getFullYear();
            }
          }
        },
        Slider : { 
            start : 0.1, 
            end : 0.5,
          } ,
        interactions : [ { type : 'marker-active' } ] ,    
      } ;
      return (
        <Line { ... config } />
      );
}
export default HoursLine;