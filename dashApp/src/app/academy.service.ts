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
import { InstructorInfo } from './models/Instructors/instructorInfo.models';

@Injectable({
  providedIn: 'root'
})
export class AcademyService {

  constructor(private http:HttpClient) { }

  // readonly classbase="https://academyapi20230120111324.azurewebsites.net/api/Classes"
  readonly classbase="https://localhost:44316/api/Classes"
  formDataStyle:StyleInfo=new StyleInfo();
  listStyleInfo: StyleInfo[]=[];

  formDataProg:Programs=new Programs();
  listProg: Programs[]=[];
  
  formDataProgDays:ProgramDays=new ProgramDays();
  listProgDays: ProgramDays[]=[];
  
  formDataStudentProg:StudentProgramCount=new StudentProgramCount();
  listStudentProgramCount: StudentProgramCount[]=[];

  listProgInstDaysView: any[]=[];
  
  // readonly studentbase="https://academyapi20230120111324.azurewebsites.net/api/Students"
  readonly studentbase ="https://localhost:44316/api/Students"
  formDataStudentInfo:StudentInfo=new StudentInfo();
  listStudentInfo: StudentInfo[]=[];

  formDataStudentClasses:StudentClasses=new StudentClasses();
  listStudentClasses: StudentClasses[]=[];

  formDataStudentFees:StudentFees=new StudentFees();
  listStudentFees: StudentFees[]=[];

  formDataStudentCount:StudentInfo=new StudentInfo();
  listStudentCount: StudentInfo[]=[];

  // readonly instructbase="https://academyapi20230120111324.azurewebsites.net/api/instructor"
  readonly instructbase= "https://localhost:44316/api/instructor"
  formDataInst:InstructorInfo=new InstructorInfo();
  listInst: InstructorInfo[]=[];

  formDataPermInst:InstructorInfo=new InstructorInfo();
  listpermInst: InstructorInfo[]=[];

  formDataFreelanceInst:InstructorInfo=new InstructorInfo();
  listFreelanceInst: InstructorInfo[]=[];

  listInstWithStyleName:  InstructorInfo[]=[];

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

  updateProgDetails(): Observable<any>{
    return this.http.put<any>(this.classbase+'/updateprog/'+ this.formDataProg.programId , this.formDataProg);
  }

  deleteProgDetails(id:any): Observable<any>{
    return this.http.delete<any>(this.classbase+'/deleteprog/'+ id);
  }

    // PROGRAMDAYS

    postProgDays(progd:ProgramDays): Observable<any>{
      return this.http.post<any>(this.classbase+"/addprogday", this.formDataProgDays);
    }
  
    getProgDays(progId:any){
      this.http.get(this.classbase+"/getprogday/"+ progId).toPromise().then(res=> this.listProgDays = res as ProgramDays[]);
     
    }

  
  // STUDENTS

  postStudentDetails(prog:StudentInfo): Observable<any>{
    return this.http.post<any>(this.studentbase+"/addstudent", this.formDataProg);
  }

  getStudentDetails(){
    this.http.get(this.studentbase+"/getstudent").toPromise().then(res=> this.listStudentInfo = res as StudentInfo[]);
   
  }

  getStudentCount(){
    return this.http.get(this.studentbase+"/getstudentscount");
   
  }

    // STUDENTS CLASSES

    postStudentClasses(prog:StudentClasses): Observable<any>{
      return this.http.post<any>(this.studentbase+"/addstudentclass", this.formDataStudentClasses);
    }
  
    getStudentClasses(){
      this.http.get(this.studentbase+"/getstudentclass").toPromise().then(res=> this.listStudentClasses = res as StudentClasses[]);
    }

    getStudentCountEachProg(){
      return this.http.get(this.studentbase+"/getstudentscounteachprog");
    }

    //INSTRUCTORS

    getInst(){
      return this.http.get(this.instructbase+"/getinst").toPromise().then(res=> this.listInst = res as InstructorInfo[]);
     
    }

    getInstWithStyleName(){
      return this.http.get(this.instructbase+"/getinstwithstylenames").toPromise().then(res=> this.listInstWithStyleName = res as InstructorInfo[]);
     
    }

    getPermInstCount(){
      return this.http.get(this.instructbase+"/getperminstcount");
    }
    
    getFreelanceInstCount(){
      return this.http.get(this.instructbase+"/getfreelanceinstcount");
    }

    getPermInst(){
      return this.http.get(this.instructbase+"/getpermanentinst").toPromise().then(res=> this.listpermInst = res as InstructorInfo[]);
     
    }

    getFreelanceInst(){
      return this.http.get(this.instructbase+"/getfreelanceinst").toPromise().then(res=> this.listFreelanceInst = res as InstructorInfo[]);
     
    }

    postInstDetails(inst:InstructorInfo): Observable<any>{
      return this.http.post<any>(this.instructbase+"/addinst", this.formDataInst);
    }

    updateInstDetails(): Observable<any>{
      return this.http.put<any>(this.instructbase+'/updateinst/'+ this.formDataInst.instId , this.formDataInst);
    }
  
    deleteInstDetails(id:any): Observable<any>{
      return this.http.delete<any>(this.instructbase+'/deleteint/'+ id);
    }
  

    //DASHBOARD GET VIEW PROGRAM INSTRUCTOR AND DAYS

    getProgramView(){
      return this.http.get(this.classbase+"/getprogramview").toPromise().then(res=> this.listProgInstDaysView = res as any[]);
     
    }

    
}
