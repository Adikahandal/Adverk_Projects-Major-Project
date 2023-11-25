import { Injectable } from '@angular/core';
import { HttpClient ,HttpClientModule } from "@angular/common/http";
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  addEmpURL: string;
  getEmpURL :string;
  updateEmpURL: string;
  deleteEmpURL:string;

  constructor(private http: HttpClient) { 

    this.addEmpURL = 'https://localhost:9091/emp/add_Employee'
    this.getEmpURL = 'https://localhost:9091/emp/getAll'
    this.updateEmpURL='https://localhost:9091/emp/updateEmployee'
    this.deleteEmpURL='https://localhost:9091/emp/deleteEmployeeById'
  }

  add_employee(emp : Employee): Observable<Employee>{

    return this.http.post<Employee>(this.addEmpURL,emp);

  }

  getAllEmployee(): Observable<Employee[]>{

    return this.http.get<Employee[]>(this.getEmpURL);

  }

  updateEmployee(emp : Employee): Observable<Employee[]>{
    return this.http.put<Employee[]>(this.updateEmpURL,emp);


  }
  deleteEmployee(emp : Employee): Observable<Employee[]>{
    return this.http.delete<Employee[]>(this.deleteEmpURL+'/'+emp.id);


  }

}
