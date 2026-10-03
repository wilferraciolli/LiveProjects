import { TestBed } from '@angular/core/testing';
import { ProjectStore } from './project.store';

describe('ProjectStore', () => {
  let store: InstanceType<typeof ProjectStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(ProjectStore);
    store.resetFilters();
  });

  it('should initialize with 3 projects', () => {
    expect(store.projects().length).toBe(3);
    expect(store.projectCount()).toBe(3);
  });

  it('should list all available tech stacks', () => {
    const tech = store.allTechStacks();
    expect(tech).toContain('Python');
    expect(tech).toContain('Angular');
    expect(tech).toContain('Clerk');
    expect(tech).toContain('AI');
    expect(tech).toContain('Postgres');
  });

  it('should filter projects by search query', () => {
    store.setSearchFilter('Pulse');
    expect(store.filteredProjects().length).toBe(1);
    expect(store.filteredProjects()[0].title).toContain('Pulse');

    store.setSearchFilter('non-existent-query-xyz');
    expect(store.filteredProjects().length).toBe(0);
  });

  it('should filter projects by tech stack', () => {
    store.setSelectedTechFilter('AI');
    const filtered = store.filteredProjects();
    expect(filtered.length).toBeGreaterThanOrEqual(1);
    expect(filtered.every(p => p.techStack.includes('AI'))).toBe(true);
  });

  it('should find project by id or slug', () => {
    const project = store.getProjectByIdOrSlug('ai-analytics-agent');
    expect(project).toBeDefined();
    expect(project?.title).toBe('Nexus AI Intelligence Platform');
  });

  it('should select project by id', () => {
    store.selectProject('clerk-auth-saas-core');
    expect(store.selectedProject()?.id).toBe('clerk-auth-saas-core');
  });
});
