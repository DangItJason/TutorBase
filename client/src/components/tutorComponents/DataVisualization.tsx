import React from "react";
import { Container,Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import CountUp from 'react-countup';
import { Heatmap } from "@ant-design/charts";
export interface IHeatmapData {
    date:string;
    week: number;
    day: number;
    month: number;
    hours: number;

}

export const DataVisualization = () => {

    let heatmapData:Array<IHeatmapData> = [];
    for (let m = 0; m < 12; m++)
    {
        for (let w = 0; w < 4; w++)
        {
            for (let d = 0; d < 7; d++)
            {
                heatmapData.push({
                    date: "2021-01-01",
                    week: w,
                    day: d,
                    month: m,
                    hours: Math.floor(Math.random() * 8)
                });
            }
        }
    }
    let heatmapConfig = {
        data: heatmapData,
        autoFit: true,
        xField: 'week',
        yField: 'day',
        colorField: 'hours',
        reflect: 'y',
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
          showMarkers: false,
        },
        interactions: [{ type: 'element-active' }],
        xAxis: {
          position: 'top',
          tickLine: null,
          line: null,
          label: {
            offset: 12,
            style: {
              fontSize: 12,
              fill: '#666',
              textBaseline: 'top',
            },
            formatter: function formatter(val:number) {
              if (val === 0) {
                return 'JAN';
              } else if (val === 6) {
                return 'JUN';
              } else if (val === 12) {
                return 'DEC';
              } 
              return '';
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
                            end={100} 
                            useEasing={true}
                            duration={2.75}/>
                            </h1>
                        </CardText>
                    
                    </Card>
                </div>
                
                <div style={{display:'flex', flexDirection:'column', flex:'1 1 0px'}}>
                    <Card body>
                    <CardTitle tag="h5">Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
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