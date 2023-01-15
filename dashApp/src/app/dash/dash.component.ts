import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AcademyService } from '../academy.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  constructor(public service:AcademyService) { }

  chartmonth:any;
  chart:any=[];
  labelMonth:any=[];
  labelCount:any=[];

  ngOnInit(): void {

    this.service.getStudentCount().subscribe(res=>{
      this.chartmonth = res;
      if(this.chartmonth!=null){
        for(let i=0;i<this.chartmonth.length;i++){
          this.labelMonth.push(this.chartmonth[i].month);
          this.labelCount.push(this.chartmonth[i].studentCount)
          console.log(this.labelCount);
        }
      }
    });
 

    const barChart = new Chart("reg-line-chart", {
      type: "line",
      data: {
        labels: this.labelMonth,
        datasets: [{
          label: "Students",
          tension: 0,
          borderWidth: 0,
          pointRadius: 5,
          pointBackgroundColor: "rgba(255, 255, 255, .8)",
          pointBorderColor: "transparent",
          borderColor: "rgba(255, 255, 255, .8)",
          // borderColor: "rgba(255, 255, 255, .8)",
          // borderWidth: 4,
          // backgroundColor: "transparent",
          fill: true,
          data: this.labelCount,
          // maxBarThickness: 6

        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            grid: {
              // drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              // borderDash: [5, 5],
              color: 'rgba(255, 255, 255, .2)'
            },
            ticks: {
              display: true,
              color: '#f8f9fa',
              padding: 10,
              font: {
                size: 14,
                // weight: 300,
                family: "Roboto",
                style: 'normal',
                lineHeight: 2
              },
            }
          },
          x: {
            grid: {
         
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              // borderDash: [5, 5]
            },
            ticks: {
              display: true,
              color: '#f8f9fa',
              padding: 10,
              font: {
                size: 14,
                // weight: 300,
                family: "Roboto",
                style: 'normal',
                lineHeight: 2
              },
            }
          },
        },
      },
    });

  //   var regData = {
  //     labels: [this.labelMonth],
  //     datasets: [
  //         {
  //             data: [this.labelCount],
  //             backgroundColor: [
  //                 "#FF6384",
  //                 "#63FF84",
  //                 "#84FF63",
  //                 "#8463FF",
  //                 "#6384FF"
  //             ]
  //         }]
  // };
  
  // const barChart = new Chart( "reg-line-chart", {
  //   type: 'line',
  //   data: regData
  // });
  }

}
