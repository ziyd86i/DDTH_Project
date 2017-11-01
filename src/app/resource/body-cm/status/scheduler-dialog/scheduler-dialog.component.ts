import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Workplan } from '../../../../workplan';
import { Employees } from '../../../../employees';
import { DatePipe, SlicePipe } from '@angular/common';
import { ResourceService } from '../../../resource.service';
import { MdDialog } from '@angular/material';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'scheduler-dialog',
  templateUrl: './scheduler-dialog.component.html',
  styleUrls: ['./scheduler-dialog.component.css']
})
export class SchedulerDialog implements OnInit {

  currentDate: Date = new Date();
  switchModeNames: string[];
  ObservableWork: Observable<Workplan>;
  workplan: Workplan = new Workplan();
  current: Employees = JSON.parse(localStorage.getItem('currentUser'));
  errorMsg: string;

  constructor(private resourceService: ResourceService,
              private datePipe: DatePipe,
              public dialogRef: MdDialogRef<SchedulerDialog>,
              @Inject(MD_DIALOG_DATA) public work_data: any) {

                this.switchModeNames = ["Tabs", "Drop-Down Menu"];


               }

  ngOnInit() {
    console.log(this.current)
    this.GetcurrentWorkplan();
  }

  GetcurrentWorkplan() {
    this.ObservableWork = this.resourceService.getWorkplanID(this.work_data.em_id)
    this.ObservableWork.subscribe(
      workplan => {
        this.workplan = workplan
      },
      err => {
        this.errorMsg = <any>err
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
      dataField: 'ticket_name',
      editorOptions: {
        items: this.workplan,
        displayExpr: "ticket_name",
        valueExpr: "ticket_name",
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
}
