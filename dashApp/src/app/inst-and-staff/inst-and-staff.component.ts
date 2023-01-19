import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AcademyService } from '../academy.service';
import { InstructorInfo } from '../models/Instructors/instructorInfo.models';
import { TableFilterPipe } from './table-filter.pipe';

@Component({
  selector: 'app-inst-and-staff',
  templateUrl: './inst-and-staff.component.html',
  styleUrls: ['./inst-and-staff.component.css']
})
export class InstAndStaffComponent implements OnInit {

  constructor(public service:AcademyService) { }

  gender: string='';
  TableFilterPipe;
  addInst=false;
  updateInst=false;
  display="none";
  active = "Active";
  inactive = "Inactive";

  ngOnInit(): void {

  //   this.service.getEpmloyees().subscribe(
  //     data => (
  //         this.employees = data,
  //         this.allEmployees=data //You don't want to override you search data with all employee list
  //     ),
  //     error => (this.errorMsg = error)
  //   );
  // }

  // applyFilter(filterValue: string) {
  //    let filterValueLower = filterValue.toLowerCase();
  //    if(filterValue === '' ) {
  //        this.employees=this.allEmployees;
  //    } 
  //    else {
  //      this.employees = this.allEmployees.filter((employee) => employee.name.includes(filterValueLower)
  //    }
  // }
  
    this.service.getStyleDetails();
    this.service.listStyleInfo; 
    this.service.getInst();
    this.service.listInst;
  }

  populateForm(selectedRecord:InstructorInfo){
    this.service.formDataInst =Object.assign({},selectedRecord) ;
  }

  onCloseHandled(){
    this.addInst=false;
    this.updateInst=false;
    this.display="none";
  }

  //ADD INSTRUCTOR

  modalInstructorAdd() {
    this.addInst = true;
    this.display = "block";
  }

  insertInstructor(form:NgForm){
    this.service.postInstDetails(this.service.formDataInst)
    .subscribe(
      (res: any) => {
        alert("Yay instructor added")
        console.log(res);
        }, //Bind to view
      (err: any) => {
              console.log(err);
            });
      this.onCloseHandled();
  }

  //UPDATE INSTRUCTOR

  modalInstructorUpdate() {
    this.updateInst = true;
    this.display = "block";
  }


  updateInstructor(form:NgForm){
    this.service.updateInstDetails().subscribe(
      res=>{
        // this.service.formDataProg=ngValue
        // this.service.getProjDetails();
        alert('Details updated')
      },err=>{console.log(err)}
    );
    // this.resetForm(form);
    this.onCloseHandled();
}

  //DELETE INSTRUCTOR


  onDeleteInst(id:any){
  if(confirm("Are you sure you want to delete?")==true){
    this.service.deleteInstDetails(id).subscribe(
      res=>{
        alert('Deleted details')
      },err=>{console.log(err)}
    )
  }
  else{
    alert("Nothing deleted");
  }
  this.onCloseHandled();
}


  

}
