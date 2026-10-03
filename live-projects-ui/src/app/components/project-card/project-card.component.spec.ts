import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjectCardComponent } from './project-card.component';
import { Project } from '../../models/project.model';

describe('ProjectCardComponent', () => {
  const mockProject: Project = {
    id: 'test-project',
    slug: 'test-project',
    title: 'Test Project Title',
    subtitle: 'Test Project Subtitle',
    description: 'Test Project Description',
    uiUrl: 'https://test.wiltechlabs.io',
    apiUrl: 'https://api.test.wiltechlabs.io',
    links: [
      { label: 'Live UI', url: 'https://test.wiltechlabs.io', type: 'ui' },
      { label: 'API Endpoint', url: 'https://api.test.wiltechlabs.io', type: 'api' }
    ],
    techStack: ['Python', 'Angular', 'Clerk', 'Postgres', 'AI'],
    status: 'Live',
    category: 'AI & Machine Learning',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render project header, subtitle, and description', () => {
    const fixture = TestBed.createComponent(ProjectCardComponent);
    fixture.componentRef.setInput('project', mockProject);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-title')?.textContent).toContain('Test Project Title');
    expect(compiled.querySelector('.card-subtitle')?.textContent).toContain('Test Project Subtitle');
    expect(compiled.querySelector('.description-text')?.textContent).toContain('Test Project Description');
  });

  it('should render tech stack chips', () => {
    const fixture = TestBed.createComponent(ProjectCardComponent);
    fixture.componentRef.setInput('project', mockProject);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const chips = compiled.querySelectorAll('.tech-chip');
    expect(chips.length).toBe(5);
    expect(chips[0].textContent).toContain('Python');
  });

  it('should render direct clickable links and details button', () => {
    const fixture = TestBed.createComponent(ProjectCardComponent);
    fixture.componentRef.setInput('project', mockProject);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.external-link-btn');
    expect(links.length).toBe(2);
    expect((links[0] as HTMLAnchorElement).target).toBe('_blank');

    const detailsBtn = compiled.querySelector('.see-more-btn');
    expect(detailsBtn).toBeTruthy();
  });
});
