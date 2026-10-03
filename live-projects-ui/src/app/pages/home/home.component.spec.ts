import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProjectStore } from '../../store/project.store';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([]), ProjectStore],
    }).compileComponents();
  });

  it('should render hero title and 3 project cards', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero-title')?.textContent).toContain('High-Performance');
    const cards = compiled.querySelectorAll('app-project-card');
    expect(cards.length).toBe(3);
  });

  it('should filter projects when typing in search input', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const store = TestBed.inject(ProjectStore);
    fixture.detectChanges();

    const searchInput = fixture.nativeElement.querySelector('.custom-search-input') as HTMLInputElement;
    searchInput.value = 'OmniStream';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(store.filteredProjects().length).toBe(1);
    const cards = fixture.nativeElement.querySelectorAll('app-project-card');
    expect(cards.length).toBe(1);
  });
});
