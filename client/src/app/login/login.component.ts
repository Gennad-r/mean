import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private authSubs: Subscription;

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
    if (this.authSubs) {
      this.authSubs.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();
    this.authSubs = this.auth.login(this.form.value).subscribe(
      () => console.log('granted'),
      (e) => {
        this.form.enable();
        console.log(e);
      }
    );
  }
}
