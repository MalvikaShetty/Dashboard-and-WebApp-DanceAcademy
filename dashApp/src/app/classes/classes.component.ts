import { Component, OnInit } from '@angular/core';
// import { pipe } from 'rxjs';
// import {Chart} from 'node_modules/chart.js'
import Chart from 'chart.js/auto';
import { collapsibleCard } from 'src/assets/js/main.js'
import { AcademyService } from '../academy.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  expand =false;
  expandProgram=false;
  display = "none";
  up:boolean[]=[];
  count=0;
  previ=0;

  constructor(public service:AcademyService) { }

  ngOnInit(): void {

    collapsibleCard();

    this.service.getStyleDetails();
    this.service.listStyleInfo;

    // this.service.getProgDetails();
    // this.service.listProg;
   
   

    var oilData = {
      labels: [
        'Red', 'Orange', 'Yellow', 'Green', 'Blue'
      ],
      datasets: [
          {
              data: [133.3, 86.2, 52.2, 51.2, 50.2],
              backgroundColor: [
                  "#FF6384",
                  "#63FF84",
                  "#84FF63",
                  "#8463FF",
                  "#6384FF"
              ]
          }]
  };
  
  const barChart = new Chart( "bar-chart", {
    type: 'bar',
    data: oilData
  });


  var oilData = {
    labels: [
      'Red', 'Orange', 'Yellow', 'Green', 'Blue'
    ],
    datasets: [
        {
            data: [133.3, 86.2, 52.2, 51.2, 50.2],
            backgroundColor: [
                "#FF6384",
                "#63FF84",
                "#84FF63",
                "#8463FF",
                "#6384FF"
            ]
        }]
};

const pieChart = new Chart( "pie-chart", {
  type: 'pie',
  data: oilData,
  options: {
    responsive: false,
    maintainAspectRatio: false,
}
});


  }

  onCloseHandled(){
    this.expandProgram = false;
    this.display = "none";
  }

  onClickStyle(styleId:any, i : any){
    if(this.count==1){
      this.up[this.previ]=false;
      this.count=0;
      return;
    }
    this.previ=i;
    this.count=1;
    this.up[i]=true;
    this.service.getProgById(styleId);
    this.service.listProg;
  }

  onClickPD(progName:any){
    this.expandProgram = true;
    this.display = "block";
    // this.expandProgram=!this.expandProgram;
    this.service.getProgDays(progName);
    this.service.listProgDays;
  }

  modalProgramOpen() {
    
  }
 
}
