import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">{{ 'copyright' | sysinfo }} <b><a href="{{ 'appCreatorUrl' | sysinfo }}" target="_blank">{{ 'appCreatorName' | sysinfo }}</a></b></span>
    <div class="socials">
      <!--<a href="https://github.com/filipditrich/" target="_blank" class="ion ion-social-github"></a>-->
    </div>
  `,
})
export class FooterComponent {
}
