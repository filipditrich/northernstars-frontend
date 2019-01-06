import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { MENU_ITEMS } from './root-menu';

@Component({
  selector: 'ngx-root',
  styleUrls: ['root.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class RootComponent {
  public menu: NbMenuItem[] = MENU_ITEMS;
}
