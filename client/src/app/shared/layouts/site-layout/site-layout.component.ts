import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {MaterialMSG} from '../../msg.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {
  navList = [
    {title: 'Overview', url: '/overview'},
    {title: 'Analytics', url: '/analytics'},
    {title: 'History', url: '/history'},
    {title: 'Add order', url: '/order'},
    {title: 'Products', url: '/products'}
  ];
  @ViewChild('floating') floating: ElementRef;

  constructor(
    private auth: AuthService,
    private  router: Router
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    MaterialMSG.floatingActionButton(this.floating);
  }

  logout(e: Event) {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
