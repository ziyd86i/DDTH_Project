import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ServiceService } from '../../../service.service';
import { Employees } from '../../../employees';
import { ManagedService } from '../../managed.service';

@Component({
  selector: 'employees-data',
  templateUrl: './employees-data.component.html',
  styleUrls: ['./employees-data.component.css']
})
export class EmployeesDataComponent implements OnInit {

  ObservableEmp: Observable<Employees[]>;
  employees: Employees[];
  errorMsg: string;

  constructor(private employeeService:ServiceService, private managedService: ManagedService) { }

  ngOnInit() {

    this.getUsers();

  }

  getUsers(): void {
    this.ObservableEmp = this.employeeService.getEmployees();
    this.ObservableEmp.subscribe(
              employees => this.employees = employees,
              err => this.errorMsg = <any>err
    );
  }

  deleteUser(users) :void {

    console.log(users);
    if (confirm("Are you sure you want to delete " + users.name + "?")) {

      this.managedService.deleteUser(users.em_id)
        .subscribe(null,
          err => {
            alert("Could not delete user.");
            // Revert the view back to its original state
          });
    }
  }

}
