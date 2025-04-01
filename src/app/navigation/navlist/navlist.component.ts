import { Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { NavItem } from '../navlist.types'
import { NAV_LIST } from '../navlist.constants'

@Component({
  selector: 'app-navlist',
  imports: [RouterLink, MatButtonModule, MatListModule],
  templateUrl: './navlist.component.html',
  styleUrl: './navlist.component.scss',
})
export class NavlistComponent {
  navList = signal<NavItem[]>(NAV_LIST)
}
