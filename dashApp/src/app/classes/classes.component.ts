import { Component, OnInit } from '@angular/core';
// import { pipe } from 'rxjs';
// import {Chart} from 'node_modules/chart.js'
import Chart from 'chart.js/auto';
import { collapsibleCard } from 'src/assets/js/main.js'
import { AcademyService } from '../academy.service';
import { NgForm } from '@angular/forms';
import { Programs } from '../models/Classes/programs.models';
import { StyleInfo } from '../models/Classes/styleInfo.models';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  constructor(public service:AcademyService) { }

  display = "none";
  up:boolean[]=[];
  count=0;
  previ=0;
  expandProgram=false;
  addStyle=false;
  addProgram=false;
  updateProgram=false;
  delProgram=false;
  valueStyleId=0;
 

  ngOnInit(): void {
    
    this.service.getStyleDetails();
    this.service.listStyleInfo; 

    var regData = {
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
    type: 'line',
    data: regData
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

  takeStyleId(id:any){
    return this.valueStyleId=id;
  }
//   compareFn(c1: Programs, c2: StyleInfo): boolean {
//     return c1 && c2 ? c1.styleId === c2.styleId : c1 === c2;
// }

  onCloseHandled(){
    this.expandProgram = false;
    this.addStyle = false;
    this.addProgram=false;
    this.updateProgram=false;
    this.delProgram=false;
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
    this.service.getProgDays(progName);
    this.service.listProgDays;
  }

  // ADD STYLE

  modalStyleAdd() {
    this.addStyle = true;
    this.display = "block";
  }

  insertStyle(form:NgForm){
    this.service.postStyleDetails(this.service.formDataStyle)
    .subscribe(
      (res: any) => {
        alert("Yay entry added")
        this.service.getStyleDetails();
        console.log(res);
        }, //Bind to view
      (err: any) => {
              console.log(err);
            });
      this.onCloseHandled();
  }

  //DELETE STYLE

  //ADD PROGRAM

  modalProgramAdd() {
    this.addProgram = true;
    this.display = "block";
  }

  insertProgram(form:NgForm){
    this.service.formDataProg.styleId==this.valueStyleId;
    this.service.postProgDetails(this.service.formDataProg)
    .subscribe(
      (res: any) => {
        alert("Yay entry added")
        console.log(res);
        }, //Bind to view
      (err: any) => {
              console.log(err);
            });
      this.onCloseHandled();
  }

  //UPDATE PROGRAM

  modalProgramUpdate() {
    this.updateProgram = true;
    this.display = "block";
  }

  populateFormProg(selectedRecord:Programs){
    this.service.formDataProg =Object.assign({},selectedRecord) ;
  }

  updateProg(form:NgForm){
    this.service.updateProgDetails().subscribe(
      res=>{
        // this.service.formDataProg=ngValue
        // this.service.getProjDetails();
        alert('Details updated')
      },err=>{console.log(err)}
    );
    // this.resetForm(form);
    this.onCloseHandled();
}

  //DELETE PROGRAM

  modalProgramDelete() {
    this.delProgram = true;
    this.display = "block";
  }

onDeleteProg(id:any){
  if(confirm("Are you sure you want to delete?")==true){
    this.service.deleteProgDetails(id).subscribe(
      res=>{
        // this.service.getProjDetails();
        alert('Deleted details')
      },err=>{console.log(err)}
    )
  }
  else{
    alert("Nothing deleted");
  }
  this.onCloseHandled();
}



  //ADD PROGRAM DAYS
 
}
