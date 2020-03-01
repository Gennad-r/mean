/* tslint:disable */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MaterialMSG} from "../shared/msg.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  private regSubs: Subscription;
  public form: FormGroup;
  public show = false;

  constructor(
    private auth: AuthService,
    private  router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(32)])
    });
  }

  ngOnDestroy(): void {
    if (this.regSubs) {
      this.regSubs.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();
    this.regSubs = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      },
      (e) => {
        this.form.enable();
        MaterialMSG.message(e.error.message);
      }
    );
  }
}
