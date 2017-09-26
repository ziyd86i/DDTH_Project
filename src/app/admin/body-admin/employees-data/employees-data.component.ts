import { Component, OnInit,ViewChild, enableProdMode } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Employees } from '../../../employees';
import { ManagedService } from '../../managed.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
declare var $ :any;

@Component({
  selector: 'employees-data',
  templateUrl: './employees-data.component.html',
  styleUrls: ['./employees-data.component.css']
})
export class EmployeesDataComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  ObservableEmp: Observable<Employees[]>;
  employees: Employees[];
  dtTrigger: Subject<any> = new Subject();
  errorMsg: string;


  constructor(private managedService: ManagedService) { }

  ngOnInit():void {

    this.getUsers();

  }

  getUsers(): void {

    this.ObservableEmp = this.managedService.getEmployees();
    this.ObservableEmp.subscribe(
              employees => {
                this.employees = employees
                this.dtTrigger.next();
                // $(document).ready(function() {
                //   $('#emp-table').DataTable();
                // } );
              },
              err => this.errorMsg = <any>err
    );
    // for(let users of this.employees){
    //   console.log(users.name);
    // }

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
