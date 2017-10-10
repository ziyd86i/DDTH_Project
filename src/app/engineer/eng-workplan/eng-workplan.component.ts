import { NgModule, Component, enableProdMode, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { EngineerService } from '../engineer.service';
import { Observable } from 'rxjs/Observable';
import { Workplan } from '../../workplan';
import { Employees } from '../../employees';
import { DatePipe, SlicePipe } from '@angular/common';
import { DxSchedulerComponent } from 'devextreme-angular';

@Component({
  selector: 'eng-workplan',
  templateUrl: './eng-workplan.component.html',
  styleUrls: ['./eng-workplan.component.css']
})
export class EngWorkplanComponent {
  //  @ViewChild(DxSchedulerComponent) scheduler: DxSchedulerComponent;
  currentDate: Date = new Date();
  switchModeNames: string[];

  ObservWork: Observable<Workplan[]>;
  // ObservEng: Observable<Employees[]>;
  workplan: Workplan[];
  current: Employees = JSON.parse(localStorage.getItem('currentUser'));
  errorMsg: string;

  constructor(
    private engineerService: EngineerService,
    private datePipe: DatePipe) {
    this.switchModeNames = ["Tabs", "Drop-Down Menu"];

    this.GetcurrentWorkplan();

  }

  ngOnInit() {


  }

  GetcurrentWorkplan() {
    // console.log(this.current);
    this.ObservWork = this.engineerService.GetcurrentWorkplan(this.current.em_id);
    this.ObservWork.subscribe(
      workplan => {
        this.workplan = workplan;
        for (let i = 0; i < workplan.length; i++) {
          this.workplan[i].date = this.datePipe.transform(this.workplan[i].date, 'short');
          this.workplan[i].end_date = this.datePipe.transform(this.workplan[i].end_date, 'short');
          console.log(this.workplan[i].date);

        }
        console.log(this.workplan);
      },
      err => {
        this.errorMsg = <any>err;
      }
    )
  }

  FormCreated(data) {
    let form = data.form

    form.option("items", [{
      label: {
        text: 'SO Number'
      },
      editorType: 'dxTextBox',
      dataField: 'so_number',
      editorOptions: {
        items: this.workplan,
        displayExpr: "so_number",
        valueExpr: "so_number"
      }
    },
    {
      label: {
        text: 'Ticket ID'
      },
      editorType: 'dxTextBox',
      dataField: 'ticket_id',
      editorOptions: {
        items: this.workplan,
        displayExpr: "ticket_id",
        valueExpr: "ticket_id",
      }
    },
    {
      label: {
        text: 'Case Owner'
      },
      editorType: 'dxTextBox',
      dataField: 'owner',
      editorOptions: {
        items: this.workplan,
        displayExpr: "owner",
        valueExpr: "owner",
      }
    },
    {
      label: {
        text: 'Customer'
      },
      editorType: 'dxTextBox',
      dataField: 'customer_name',
      editorOptions: {
        items: this.workplan,
        displayExpr: "customer_name",
      }
    },
    {
      label: {
        text: 'Personal Contact'
      },
      editorType: 'dxTextBox',
      dataField: 'person_contact',
      editorOptions: {
        items: this.workplan,
        displayExpr: "person_contact",
      }
    },
    {
      label: {
        text: 'Telephone'
      },
      editorType: 'dxTextBox',
      dataField: 'tel',
      editorOptions: {
        items: this.workplan,
        displayExpr: "teleplone",
      }
    },
    {
      dataField: "date",
      editorType: "dxDateBox",
      editorOptions: {
        type: "datetime",
        items: this.workplan,
        startDateExpr: "date",
        onValueChanged: (change) => {
          console.log(change.value);
          //  this.workplan.date = change.value;
        }
      }
    },
    {
      dataField: "end_date",
      editorType: "dxDateBox",
      editorOptions: {
        type: "datetime",
        items: this.workplan,
        displayExpr: "end_date",
        onValueChanged: (change) => {
          console.log(change.value);
          // this.workplan[].end_date
        }
      }
    },
    {
      label: {
        text: 'Description'
      },
      dataField: 'description',
      editorType: "dxTextArea",
      editorOptions: {
        items: this.workplan,
        displayExpr: "description"
      }
    }
    ])
  }

  addWorkplan(data) {
    console.log(data);
    console.log(data.appointmentData);

    this.ObservWork = this.engineerService.addWorkplan(data.appointmentData)
    this.ObservWork.subscribe(
      workplan => {
        this.workplan = workplan
      },
      err => {
        this.errorMsg = <any>err;
      }
    )
  }


}
