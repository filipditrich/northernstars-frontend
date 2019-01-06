import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <div class="w-100 d-flex flex-wrap justify-content-between">
      <span>{{ 'copyright' | sysinfo }} <a href="{{ 'appCreatorUrl' | sysinfo }}" class="link">{{ 'appOwnerName' | sysinfo }}</a></span>
      <span>by <a href="{{ 'appCreatorUrl' | sysinfo }}" class="link">{{ 'appCreatorName' | sysinfo }}</a></span>
    </div>
  `,
})
export class FooterComponent {
}
