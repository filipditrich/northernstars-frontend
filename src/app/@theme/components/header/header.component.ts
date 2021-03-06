import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { filter } from 'rxjs/operators';
import { UserService } from '../../../@core/data/users.service';
import { SecurityService } from '../../../@core/services/security.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/data/layout.service';
import { translate } from '../../../@shared/helpers';
import { IUser } from '../../../@shared/models';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  public user: IUser;

  userMenu = [
    { title: translate('LOG_OUT') },
  ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private router: Router) {

    // handles item menu click event
    menuService.onItemClick()
      .pipe(filter(({ tag }) => tag === tag))
      .subscribe(bag => {
        switch (bag.item.title) {
          case translate('LOG_OUT'): this.router.navigate([ '/auth/logout' ]); break;
        }
      });

  }

  ngOnInit(): void {
    this.user = SecurityService.getUser();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
