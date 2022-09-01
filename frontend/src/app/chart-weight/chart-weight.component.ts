import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Weight} from "../models/weight.model";
import {Subscription} from "rxjs";
import {EChartsOption} from "echarts";

@Component({
  selector: 'app-chart-weight',
  templateUrl: './chart-weight.component.html',
  styleUrls: ['./chart-weight.component.css']
})
export class ChartWeightComponent implements OnInit {
  _chartOption!: EChartsOption;
  subscription!:Subscription;
   weights:Weight[]= new Array;
  constructor(private http:UserService) { }

  ngOnInit(): void {
    this.subscription = this.http.getWeightHistory().subscribe(data=>{this._initBasicLineEchart(data)})
    this.http.getWeightHistory().subscribe(weight => this.weights = weight);
  }

  _initBasicLineEchart(chartData:Weight[]){
  this._chartOption={
    tooltip:{
      show:true
    },
    background: 'transparent',
      xAxis: {
        type: 'category',
        data: chartData.reverse().map(w =>({
          value:w.date.toString()
        }))
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: chartData.map(w=>({
            value:w.weight
          })),
          type: 'line'
        }
      ]
  };
  }
}
