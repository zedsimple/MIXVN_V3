import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'mix-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @HostBinding('class') classes = 'fixed-top';

  constructor() { }

  ngOnInit() {
  }

}
