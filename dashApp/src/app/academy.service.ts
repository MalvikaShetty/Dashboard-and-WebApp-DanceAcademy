import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http'
import { Programs } from './models/Classes/programs.models';
import { Observable } from 'rxjs';
import { ProgramDays } from './models/Classes/programDays.models';
import { StyleInfo } from './models/Classes/styleInfo.models';
import { StudentProgramCount } from './models/Classes/studentsProgramCount.models';
import { StudentInfo } from './models/Students/studentsInfo.models';
import { StudentClasses } from './models/Students/studentClasses.models';
import { StudentFees } from './models/Students/studentFees.models';

@Injectable({
  providedIn: 'root'
})
export class AcademyService {

  constructor(private http:HttpClient) { }

  readonly classbase="https://localhost:7048/api/Classes"
  formDataStyle:StyleInfo=new StyleInfo();
  listStyleInfo: StyleInfo[]=[];

  formDataProg:Programs=new Programs();
  listProg: Programs[]=[];
  
  formDataProgDays:ProgramDays=new ProgramDays();
  listProgDays: ProgramDays[]=[];
  
  formDataStudentProg:StudentProgramCount=new StudentProgramCount();
  listStudentProgramCount: StudentProgramCount[]=[];
  
  readonly studentbase="https://localhost:7048/api/Students"
  formDataStudentInfo:StudentInfo=new StudentInfo();
  listStudentInfo: StudentInfo[]=[];

  formDataStudentClasses:StudentClasses=new StudentClasses();
  listStudentClasses: StudentClasses[]=[];

  formDataStudentFees:StudentFees=new StudentFees();
  listStudentFees: StudentFees[]=[];

  readonly instructbase="https://localhost:4200/api/instructors"
  // formDataProg:Programs=new Programs();
  // listProg: Programs[]=[];

  // formDataProg:Programs=new Programs();
  // listProg: Programs[]=[];


  // STYLE

  postStyleDetails(prog:StyleInfo): Observable<any>{
    return this.http.post<any>(this.classbase+"/addstyle", this.formDataStyle);
  }

  getStyleDetails(){
    this.http.get(this.classbase+"/getstyle").toPromise().then(res=> this.listStyleInfo = res as StyleInfo[]);
   
  }

  // PROGRAMS

  postProgDetails(prog:Programs): Observable<any>{
    return this.http.post<any>(this.classbase+"/addprogram", this.formDataProg);
  }

  getProgById(styleId:any){
    this.http.get(this.classbase+"/getprogram/"+ styleId).toPromise().then(res=> this.listProg = res as Programs[]);
   
  }

  // getProgDetails(){
  //   this.http.get(this.classbase+"/getprogram").toPromise().then(res=> this.listProg = res as Programs[]);
   
  // }

  // updateProjDetails(): Observable<any>{
  //   return this.http.put<any>(this.base+'/updateproj/'+ this.formDataProj.projId , this.formDataProj);
  // }

  // deleteProjDetails(id:any): Observable<any>{
  //   return this.http.delete<any>(this.base+'/deleteproj/'+ id);
  // }

    // PROGRAMDAYS

    postProgDays(progd:ProgramDays): Observable<any>{
      return this.http.post<any>(this.classbase+"/addprogday", this.formDataProgDays);
    }
  
    getProgDays(progName:any){
      this.http.get(this.classbase+"/getprogday/"+ progName).toPromise().then(res=> this.listProgDays = res as ProgramDays[]);
     
    }

  
  // STUDENTS

  postStudentDetails(prog:StudentInfo): Observable<any>{
    return this.http.post<any>(this.studentbase+"/addstudent", this.formDataProg);
  }

  getStudentDetails(){
    this.http.get(this.studentbase+"/getstudent").toPromise().then(res=> this.listStudentInfo = res as StudentInfo[]);
   
  }

    // STUDENTS CLASSES

    postStudentClasses(prog:StudentClasses): Observable<any>{
      return this.http.post<any>(this.studentbase+"/addstudentclass", this.formDataStudentClasses);
    }
  
    getStudentClasses(){
      this.http.get(this.studentbase+"/getstudentclass").toPromise().then(res=> this.listStudentClasses = res as StudentClasses[]);
     
    }
}
