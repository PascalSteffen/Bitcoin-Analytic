import { Component, OnInit } from '@angular/core';
import {
  Chart, ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';

Chart.register(ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle);

@Component({
  selector: 'app-data-diagram',
  templateUrl: './data-diagram.component.html',
  styleUrls: ['./data-diagram.component.scss']
})
export class DataDiagramComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  inputDate: any = '2020-01-01';
  endDate: any;
  canvas: any;
  ctx: any
  coinPrice: any = []
  coinDate: any = []
  name: any;
  myChart: any;

  backgroundColor = [
    'rgb(254,255,254)',
  ]

  borderColor = [
    'rgb(197,252,231)',

  ]

  options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  constructor() {
    let today = new Date();
    today.setDate(new Date().getDate())
    this.endDate = today.toISOString().split('T')[0];
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 5, 0, 1);
    this.maxDate = today;
  }

  ngOnInit(): void {
    this.loadCoinData();
  }


  async loadCoinData() {
    let url = `https://data.nasdaq.com/api/v3/datasets/BCHAIN/MKPRU?start_date=${this.inputDate}&end_date=${this.endDate}&api_key=M69Bd6qf2tiPoCNSKyqE`;
    let response = await fetch(url);
    let responseAsJSON = await response.json();

    this.iteration(responseAsJSON)
    this.loadData();
  }


  /**
   * API iteration
   * @param APIData 
   */
  iteration(APIData: any) {
    for (let i = 0; i < APIData['dataset']['data'].length; i++) {
      const allData = APIData['dataset']['data'][i];
      this.coinPrice.push(allData[1])
      this.coinDate.push(allData[0])
      this.name = APIData['dataset']['name'];
    }
  }


  /**
   * clear canvas, clear the arrays and load a new canvas with the new Date.
   * 
   */
  onSubmit() {
    this.myChart.destroy();
    this.coinDate.splice(1);
    this.coinPrice.splice(1);
    this.loadCoinData();
    this.coinDate.pop();
    this.coinPrice.pop();
  }


  /**
   * create the Canvas with all datas.
   * 
   */
  loadData() {
    Chart.defaults.font.size = 15;
    Chart.defaults.color = 'white';
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.coinDate.reverse(),
        datasets: [{
          label: this.name,
          data: this.coinPrice.reverse(),
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
          borderWidth: 1
        }]
      },
      options: this.options
    });
  }
}