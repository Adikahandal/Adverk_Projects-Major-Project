import { Component ,OnInit} from '@angular/core';
import { FormGroup , FormBuilder, FormControl } from "@angular/forms";
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  empDetail!:FormGroup;
  empObj: Employee = new Employee();
  empList :Employee[]=[];
  
  constructor(private formBuilder: FormBuilder, private empService : EmployeeService ){  }
  
  
  ngOnInit():void{

    this.getAllEmployee();
    
  this.empDetail = this.formBuilder.group({
    id:[''],
    name:[''],
    salary:[''],
    email:['']
  });
  }

  
    
  
  add_employee(){

    console.log(this.empDetail);
    this.empObj.id = this.empDetail.value.id;
    this.empObj.name = this.empDetail.value.name;
    this.empObj.salary = this.empDetail.value.salary;
    this.empObj.email = this.empDetail.value.email;

    this.empService.add_employee(this.empObj).subscribe(res=>{
      console.log(res);
      this.getAllEmployee();
    },err=>{
      console.log(err);
    })
  }
  getAllEmployee(){
    this.empService.getAllEmployee().subscribe(res=>{
      this.empList=res;
    },err=>{
      console.log("error while fetching data.")
    });
  }
  editemployee(emp: Employee): void{
    this.empDetail.controls['id'].setValue(emp.id);
    this.empDetail.controls['name'].setValue(emp.name);
    this.empDetail.controls['email'].setValue(emp.email);
    this.empDetail.controls['salary'].setValue(emp.salary);

  }
  updateEmployee(){
    this.empObj.id = this.empDetail.value.id;
    this.empObj.name = this.empDetail.value.name;
    this.empObj.salary = this.empDetail.value.salary;
    this.empObj.email = this.empDetail.value.email; 

    this.empService.updateEmployee(this.empObj).subscribe(res=>{
     console.log(res);
     this.getAllEmployee();
    },err=>{
      console.log(err);
    });
    }
  
  deleteemployee(emp: Employee){
    this.empService.deleteEmployee(emp).subscribe(res=>{
      console.log(res);
      alert('Employee deleted successfully');
      this.getAllEmployee();
    },err =>{
      console.log(err);
    });
  }
  

}
