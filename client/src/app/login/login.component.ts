import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MaterialMSG} from '../shared/msg.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public show = false;
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

    this.route.queryParams.subscribe((params: Params) => {
      if (params.registered) {
        MaterialMSG.message('Use your email and password to login');
      } else if (params.accessDenied) {
        MaterialMSG.message('You should been registered to access this page');
      } else if (params.sessionExpired) {
        MaterialMSG.message('Your session is expired. Login please again.');
      }
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
      () => {
        this.router.navigate(['/overview']);
      },
      (e) => {
        this.form.enable();
        MaterialMSG.message(e.error.message);
      }
    );
  }
}
