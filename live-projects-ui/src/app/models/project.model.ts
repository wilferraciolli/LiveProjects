export interface ProjectLink {
  label: string;
  url: string;
  type: 'ui' | 'api' | 'github' | 'docs' | 'external';
  icon?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription?: string;
  uiUrl?: string;
  apiUrl?: string;
  links: ProjectLink[];
  techStack: string[];
  status: 'Live' | 'Beta' | 'In Development';
  category: string;
  iconName?: string;
  keyFeatures?: string[];
  architectureNotes?: string[];
}
