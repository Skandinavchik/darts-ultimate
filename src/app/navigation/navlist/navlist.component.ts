import { Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { NavItem } from '../navlist.type'
import { NAV_LIST } from '../navlist.constant'

@Component({
  selector: 'app-navlist',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './navlist.component.html',
  styleUrl: './navlist.component.scss',
})
export class NavlistComponent {
  navList = signal<NavItem[]>(NAV_LIST)
}
