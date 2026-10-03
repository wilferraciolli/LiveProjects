import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjectDetailsComponent } from './project-details.component';
import { ProjectStore } from '../../store/project.store';

describe('ProjectDetailsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailsComponent],
      providers: [provideRouter([]), ProjectStore],
    }).compileComponents();
  });

  it('should render project details when valid id is passed', () => {
    const fixture = TestBed.createComponent(ProjectDetailsComponent);
    fixture.componentRef.setInput('id', 'ai-analytics-agent');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.project-title')?.textContent).toContain('Nexus AI Intelligence Platform');
    expect(compiled.querySelector('.project-subtitle')?.textContent).toContain('Autonomous multi-modal analytics');
    expect(compiled.querySelector('.primary-action-btn')).toBeTruthy();
    expect(compiled.querySelector('.tech-stack-badges')).toBeTruthy();
  });

  it('should render not found state when invalid id is passed', () => {
    const fixture = TestBed.createComponent(ProjectDetailsComponent);
    fixture.componentRef.setInput('id', 'non-existent-id');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.not-found-card')).toBeTruthy();
    expect(compiled.querySelector('.not-found-card h2')?.textContent).toContain('Project Not Found');
  });
});
