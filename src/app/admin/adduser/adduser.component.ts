import { Component, OnInit } from '@angular/core';
import { Employees } from '../../employees';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ManagedService } from '../managed.service';
import { Observable } from 'rxjs/Observable';
import { Router,ActivatedRoute } from '@angular/router';
import { PasswordValidation } from './password-validation';
import { DatePipe } from '@angular/common';
import { NguiDatetime } from '@ngui/datetime-picker';



@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  form : FormGroup;
  // @ViewChild('f') signUpForm: NgForm;
  submitted = false;
  defaultType = 'engineer';
  defaultTeam = 505;
  defaultSkill = 'Networking';
  defaultSkill_1 = '';
  defaultSkill_2 = '';
  defaultProfile = 201;
  defaultBusiness = 301;
  defaultFamily =103;
  employees: Employees[] = Array<Employees>();
  users: Employees = new Employees();
  title: string;
  editted = false;
  ManagedEmp: Observable<Employees[]>;
  ManagedUser :Observable<Employees>;
  errorMsg: string;
  reply: string;

  // employees = {
  //   em_id : 0,
  //   name: '',
  //   lname: '',
  //   birth: '',
  //   tel: 0,
  //   email: '',
  //   skill: '',
  //   cid: 0,
  //   type: '',
  //   dep_id: 0,
  //   position_id: 0,
  //   car_id: '',
  //   username: '',
  //   password: '',
  // }


  constructor(
    formBuilder: FormBuilder,
    private managedService: ManagedService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {

    this.form = formBuilder.group({
      em_id: ['', [
        Validators.required,
        Validators.pattern('[ST][AH][0-9]{4,}')

      ]],
      name: ['', [
        Validators.required,
      ]],
      lname: ['',[
        Validators.required,
      ]],
      // birth: [],
      tel: ['',[
        Validators.maxLength(10),
        Validators.pattern('[0][0-9]{9}')
      ]],
      hiredate: ['',Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}")
      ]],
      skill_id: ['',Validators.required],
      skill_id1: ['',Validators.required],
      skill_id2: ['',Validators.required],
      type: ['',Validators.required],
      job_fam_id: ['',Validators.required],
      job_pro_id: ['',Validators.required],
      business_id: ['',Validators.required],
      team_id: ['',Validators.required],
      car_id: [''],
      username: ['',Validators.required],
      password: ['',[
        Validators.minLength(6),
        Validators.required
      ]],
      reply: ['', [
        Validators.required
      ]],


    },
    {
      validator: PasswordValidation.MatchPassword
    });
  }



  ngOnInit() {

    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      console.log(id);

      this.title = id ? 'Edit User': 'Add User';

      if(id) {
        this.getDataById(id);

      }

    });




    // var id = this.route.params.subscribe(params => {
    //   var id = params['em_id'];
    //
    //   this.title = id ? 'Edit User' : 'Add User';
    //
    //   if (!id)
    //     return;
    //
    //   this.managedService.getUser(id)
    //     .subscribe(
    //       users => this.users = users,
    //       response => {
    //         if (response.status == 404) {
    //           this.router.navigate(['NotFound']);
    //         }
    //       });
    // });
  }

  redirect() {
    this.router.navigateByUrl('/admin');
    window.location.reload();
  }

  managedEmployees() {
    if(this.editted) { this.editUser(this.form); }
    else if(!this.editted) { this.addUser(this.form); }
  }

  addUser(form) {
        // console.log(form.value.hiredate);
        console.log("Submitted success!");
        // console.log(form.value);
        form.value.hiredate = form.value.hiredate.toString();
        this.ManagedUser = this.managedService.addUser(form.value)
        this.ManagedUser.subscribe(
          users => {
            this.users = users;

          },
          err =>  this.errorMsg = <any>err
        );

        this.redirect();

  }

  editUser(form) {
    console.log("This is the edit function !!!");
    // console.log(form.value);
    // console.log(form.value.hiredate);
    form.value.hiredate = form.value.hiredate.toString();
    // console.log(form.value.hiredate)
    this.ManagedUser = this.managedService.editUser(form.value, form.value.em_id)
    this.ManagedUser.subscribe(
      users => {
        this.users = users;

      },
      err =>  this.errorMsg = <any>err
    );
    this.redirect();
  }

  getDataById(id) {

    this.ManagedUser = this.managedService.getUserById(id)
      this.ManagedUser.subscribe(
      users => {
        console.log(users),
        this.users = users[0];
        //set format date
        this.users.hiredate = this.datePipe.transform(this.users.hiredate, 'yyyy-MM-dd');
        console.log(this.users.hiredate);
        this.defaultSkill = this.users.skill_id;
        this.defaultType = this.users.type;
        this.defaultTeam = this.users.team_id;
        this.defaultProfile = this.users.job_pro_id;
        this.defaultBusiness = this.users.business_id;
        this.defaultFamily = this.users.job_fam_id;
        this.defaultSkill_1 = this.users.skill_id1;
        this.defaultSkill_2 = this.users.skill_id2;

      },
      err => this.errorMsg = <any>err
    );

    this.editted = true;

  }





}
