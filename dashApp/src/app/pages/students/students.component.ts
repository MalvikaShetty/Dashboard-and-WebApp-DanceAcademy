import { Component, OnInit } from '@angular/core';
import { AcademyService } from '../../Services/academy.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(public service:AcademyService) { }

  ngOnInit(): void {

    this.service.getStyleDetails();
    this.service.listStyleInfo; 
    this.service.getPermInst();
    this.service.listpermInst;
  }

  modalStudentAdd(){
    
  }
}
