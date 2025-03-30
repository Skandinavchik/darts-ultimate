import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MobileNavlistComponent } from './mobile-navlist.component'

describe('MobileNavlistComponent', () => {
  let component: MobileNavlistComponent
  let fixture: ComponentFixture<MobileNavlistComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavlistComponent],
    })
      .compileComponents()

    fixture = TestBed.createComponent(MobileNavlistComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
