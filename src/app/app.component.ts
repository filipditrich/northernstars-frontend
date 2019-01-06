import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { ToasterConfig } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map, filter, mergeMap } from 'rxjs/operators';
import 'style-loader!angular2-toaster/toaster.css';
import { sysInfo } from './@shared/helpers';

@Component({
  selector: 'ngx-app',
  template: `
    <toaster-container [toasterconfig]="config"></toaster-container>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {

  public config: ToasterConfig;

  constructor(private analytics: AnalyticsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();

    // toaster config
    this.config = new ToasterConfig({
      showCloseButton: true,
      preventDuplicates: true,
      mouseoverTimerStop: true,
      tapToDismiss: true,
    });

    // page title change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
    ).subscribe((event) => {
      let title: string;
      if (event['title']) {
        title = `${sysInfo('appName')} » ${event['title']}`;
      } else {
        title = `${sysInfo('appName')}`;
      }
      this.titleService.setTitle(title);
    });
  }

}
