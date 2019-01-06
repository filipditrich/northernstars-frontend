import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by"><b><a href="https://northernstars.cz" target="_blank">App Creator</a></b> &copy;2021</span>
    <div class="socials">
      <!--<a href="https://github.com/filipditrich/" target="_blank" class="ion ion-social-github"></a>-->
    </div>
  `,
})
export class FooterComponent {
}
