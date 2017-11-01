import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { Employees } from '../../employees';
import { ProfileService } from '../profile.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { PasswordValidation } from '../../admin/adduser/password-validation';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnInit {

  form : FormGroup;
  ObservData: Observable<Employees>;
  employees: Employees = new Employees();
  currentUser: Employees;
  errorMsg:string;
  id:string;
  reply:string;

  constructor(
      formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private datePipe: DatePipe,
      private profileService: ProfileService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      this.form = formBuilder.group({
        em_id: new FormControl({value: '', disabled:true}, Validators.required),
        job_fam_name: new FormControl({value: '', disabled:true}, Validators.required),
        team_name: new FormControl({value: '', disabled:true}, Validators.required),
        business_title: new FormControl({value: '', disabled:true}, Validators.required),
        job_pro_name: new FormControl({value: '', disabled:true}, Validators.required),
        hiredate: new FormControl({value: '', disabled:true}, Validators.required),
        name: new FormControl({value: '', disabled:false}, Validators.required),
        lname: new FormControl({value: '', disabled:false}, Validators.required),
        email: new FormControl({value: '', disabled:false}, [
          Validators.required,
          Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}")
        ]),
        tel: new FormControl({value: '', disabled:false}, [
          Validators.maxLength(10),
          Validators.pattern('[0][0-9]{9}')
        ]),
        car_id: new FormControl({value: '', disabled:false}, Validators.required),
        password: new FormControl({value: '', disabled:false}, [
          Validators.minLength(6),
          Validators.required
        ]),
        reply: new FormControl({value:''}, Validators.required)

      },
      {
        validator: PasswordValidation.MatchPassword
      })
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.id = params['id'];
      // console.log(this.id);
      if(this.id != this.currentUser.em_id) {
        alert("User not matching.");
        this.router.navigate(['/login']);
      }
      else if (this.id) {
        this.getProfile(this.id);
      }

    });
  }

  getProfile(id) {
    this.ObservData = this.profileService.getUserById(id);
    this.ObservData.subscribe(
      user => {
        this.employees = user[0]
        this.employees.hiredate = this.datePipe.transform(this.employees.hiredate, 'd MMMM yyyy')
        // console.log(this.employees)
      },
      err => {
        this.errorMsg = <any>err
      }
    )
  }

  EditProfile() {
    // console.log(this.form.value)
    this.ObservData = this.profileService.editUserId(this.form.value, this.employees.em_id)
    this.ObservData.subscribe(user => {
      console.log(user)
      alert("Edit profile complete.");
      window.location.reload();

    },
    err => {
      this.errorMsg = <any>err
    })
  }
}
