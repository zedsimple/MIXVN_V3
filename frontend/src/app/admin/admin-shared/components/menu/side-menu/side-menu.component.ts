import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mix-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  isCollapsed = false;

  constructor() { }

  ngOnInit() {

  }
}
