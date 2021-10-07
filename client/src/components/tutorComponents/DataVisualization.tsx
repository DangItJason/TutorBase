import React from "react";
import { Container,Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import CountUp from 'react-countup';
import { Heatmap } from "@ant-design/charts";
import { ListItem } from "@antv/component";
export interface IHeatmapData {
    date:string;
    week: number;
    day: number;
    month: number;
    hours: number;

}

export const DataVisualization = () => {
    const secondsPerDay = 60*60*24;
    let heatmapData:Array<IHeatmapData> = [];
    let currentYear:Date = new Date();
    let date:Date = new Date(currentYear)
    date.setFullYear(currentYear.getFullYear()-1);
    let week = 0;
    while (date.getTime() <= currentYear.getTime()) {
      heatmapData.push({
        date: date.toDateString(),
        week: week,
        day: date.getDay(),
        month: date.getMonth(),
        hours: Math.floor(Math.random()*8)
    });
    if (date.getDay() == 6)
      week++;
    date.setDate(date.getDate() + 1);
    }
    let heatmapConfig = {
      width : 1080, 
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
              fontSize: 12,
              fill: '#666',
              textBaseline: 'top' as 'top',
            },
            formatter: function formatter(val:string, item:ListItem, index:number) {
              let startMonth = new Date();
              startMonth.setFullYear(startMonth.getFullYear()-1);
              let newUNIX = startMonth.getTime()/1000 + parseInt(val) * 7 * secondsPerDay;
              let thisTime = new Date(newUNIX * 1000);
              let month = thisTime.getMonth();
              if (month === 0) {
                return "JAN";
              }
              else if (month === 1) {
                return "FEB";
              }
              else if (month === 2) {
                return "MAR";
              }
              else if (month === 3) {
                return "APR";
              }
              else if (month === 4) {
                return "MAY";
              }
              else if (month === 5) {
                return "JUN";
              }
              else if (month === 6) {
                return "JUL";
              }
              else if (month === 7) {
                return "AUG";
              }
              else if (month === 8) {
                return "SEP";
              }
              else if (month === 9) {
                return "OCT";
              }
              else if (month === 10) {
                return "NOV";
              }
              else if (month === 11) {
                return "DEC";
              }
              return "";
            },
          },
        },
      };
    return (
        <Container fluid className="background" style={{marginBottom:'10em'}}>
        <Row className="title" >
          <div className="profile-text" style={{marginTop:'0.5em'}}>Profile Data</div>
        </Row>
        <hr></hr>
        <Row xs="2" className="parent">

        </Row>
        <div style={{display:'flex', flexDirection:'row'}}>
                <div style={{display:'flex', flexDirection:'column', flex:'1 1 0px'}}>
                    <Card body>
                    <CardTitle tag="h5">Hours Tutored</CardTitle>
                    <CardText>
                        <h1>
                        <CountUp 
                            end={68} 
                            useEasing={true}
                            duration={4}
                            />
                            </h1>
                        </CardText>
                    
                    </Card>
                </div>
                
                <div style={{display:'flex', flexDirection:'column', flex:'1 1 0px'}}>
                <Card body>
                    <CardTitle tag="h5">Earnings</CardTitle>
                    <CardText>
                        <h1>
                        <CountUp 
                            decimals={2}
                            prefix="$"
                            end={1426.25} 
                            useEasing={true}
                            

                            duration={4}/>
                            </h1>
                        </CardText>
                    
                    </Card>
                </div>
            </div>
        
            <div style={{display:'flex', flexDirection:'row'}}>
            <Heatmap {...heatmapConfig} />
            </div>
            </Container>
    );
}

export default DataVisualization;