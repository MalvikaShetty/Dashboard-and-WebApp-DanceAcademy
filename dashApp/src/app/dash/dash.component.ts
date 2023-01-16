import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Chart, { Colors } from 'chart.js/auto';
import { withLatestFrom } from 'rxjs';
import { AcademyService } from '../academy.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})


export class DashComponent implements OnInit {

  constructor(public service:AcademyService, private cdr: ChangeDetectorRef) { }
  transform(val:string , length:number):string {
    return val.length > length ? `${val.substring(0, length)} ...` : val
  }
  // chartmonth:any;
  chart:any;
  labelMonth:any[]=[];
  labelCount:any[]=[];
  labelProgram:any[]=[];
  labelCountperProgram:any[]=[];
  year:any;
  instPermCount:any;
  instFreeCount:any;
  totalStudents=0;

  ngOnInit(): void {
    this.service.getPermInstCount().subscribe((data)=>this.instPermCount =data);
    this.service.getFreelanceInstCount().subscribe((data)=>this.instFreeCount =data);

    this.service.getStudentCountEachProg().subscribe(res=>{
      this.chart = res;
      if(this.chart!=null){
        for(let i=0;i<this.chart.length;i++){
         this.totalStudents+=this.chart[i].studentCount;
        }
      }
    });

    this.service.getProgramView();
    this.service.listProgInstDaysView;
    

    // window.dispatchEvent(new Event('resize'));
    this.service.getStudentCount().subscribe(res=>{
      this.chart = res;
      if(this.chart!=null){
        this.year = this.chart[0].year;
        for(let i=0;i<this.chart.length;i++){
          this.labelMonth.push(this.chart[i].month);
          this.labelCount.push(this.chart[i].studentCount)
        }
      }
    });

    this.service.getStudentCountEachProg().subscribe(res=>{
      this.chart = res;
      if(this.chart!=null){
        for(let i=0;i<this.chart.length;i++){
          this.labelProgram.push(this.chart[i].programName);
          this.labelCountperProgram.push(this.chart[i].studentCount)
        }
      }
    });
    
   
    this.RenderChart(this.labelMonth,this.labelCount,"line","Students","reg-line-chart");
    this.RenderPie(this.labelProgram,this.labelCountperProgram,"pie","Students","pie-EachClass-chart");
    this.cdr.markForCheck();
    // for(let i=0;i<this.labelMonth.length;i++){
    // if (this.labelMonth[i]==1){ "Jan"}
    // else if (this.labelMonth[i]==2){ "Feb"}
    // else if (this.labelMonth[i]==3){ "Mar"}
    // else if (this.labelMonth[i]==4){ "Apr"}
    // else if (this.labelMonth[i]==5){ "May"}
    // else if (this.labelMonth[i]==6){ "June"}


    
  }
 
  RenderChart(datalabel:any,data:any,type:any,label:any,id:any){
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels:["Jan","Feb"],
        datasets: [{
          label: label,
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
          data: data,
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
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
              color: 'rgba(255, 255, 255, .2)'
            },
            ticks: {
              display: true,
              color: '#fff',
              padding: 10,
              font: {
                size: 14,
                weight: 300,
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
    // myChart.update();
    
  }

  RenderPie(datalabel:any,dataAll:any,type:any,label:any,id:any){
    const Data = {
      labels: datalabel,
      datasets: [
          {
              data: dataAll,
              label:label,
              backgroundColor: [
                  "#92d1a3",
                  "#4aba69",
                  "#209e43",
                  "#8463FF",
                  "#6384FF"
              ]
          }]
  };
  
  const pieChart = new Chart( id, {
    type: type,
    data: Data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
            display: true,
            labels: {
                color: 'rgb(255, 255, 255)'
            }
        }
      },
    }
 
  });
  }


  
}
