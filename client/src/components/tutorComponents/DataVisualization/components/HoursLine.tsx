import React from "react";
import { Container,Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import CountUp from 'react-countup';
import { Heatmap, Line } from "@ant-design/charts";
import { ListItem } from "@antv/component";

// Represents one day in heatmap calendar
export interface IGraphData {
    date:string;
    time:number;
    hours: number;
}
export interface IParams {
    dateMap : Map<number, number>;
}
export const HoursLine = (params: IParams) => {
    const secondsPerDay = 60*60*24;
    let graphData:Array<IGraphData> = [];
    let currentYear:Date = new Date();
    currentYear.setHours(0);
    currentYear.setMinutes(0);
    currentYear.setSeconds(0);
    currentYear.setMilliseconds(0);
    let date:Date = new Date(currentYear);
    date.setFullYear(currentYear.getFullYear()-1);
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
        tooltip : { showMarkers : false } ,   
        state : { 
          active : { 
            style : { 
              shadowBlur : 4 , 
              stroke : '#000' , 
              fill : 'red' , 
            } ,
          } ,
        } ,
        slider : { 
            start : 0.1 , 
            end : 0.5 , 
          } ,
        interactions : [ { type : 'marker-active' } ] ,    
      } ;
      return (
        <Line { ... config } />
      );
}
export default HoursLine;