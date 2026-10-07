import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Project } from '../models/project.model';

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'insurly',
    slug: 'insurly',
    title: 'Insurly',
    subtitle: 'Quote Manager',
    description: 'Instantly generate quotes for car insurances (more types coming soon).',
    detailedDescription: 'Insurly takes a user\'s details and requests quotes from multiple insurance providers in parallel, then compares the results and surfaces the best offer to the user. Built with a FastAPI Python backend exposing a REST API, deployed on Cloudflare Workers, and an Angular frontend hosted on Cloudflare Pages.',
    uiUrl: 'https://insurly-5ut.pages.dev/',
    apiUrl: 'https://insurly-api.wiliam334.workers.dev',
    category: 'Insurance',
    iconName: 'shield',
    status: 'Live',
    techStack: ['Python', 'Angular', 'Cloudflare', 'FastAPI', 'REST'],
    links: [
      { label: 'Live Application', url: 'https://insurly-5ut.pages.dev/', type: 'ui', icon: 'open_in_new' },
      { label: 'REST API', url: 'https://insurly-api.wiliam334.workers.dev', type: 'api', icon: 'api' },
      { label: 'GitHub Repository', url: 'https://github.com/wilferraciolli/insurly', type: 'github', icon: 'code' },
      { label: 'Documentation', url: 'https://insurly-api.wiliam334.workers.dev/docs', type: 'docs', icon: 'menu_book' },
      { label: 'Health Check', url: 'https://insurly-api.wiliam334.workers.dev/api/health', type: 'external', icon: 'monitor_heart' }
    ],
    keyFeatures: [
      'Single form to capture driver and vehicle details for a car insurance quote',
      'Fetches and compares quotes from multiple insurance providers at once',
      'Surfaces the best-value quote to the user, with more insurance types planned',
      'REST API backend with a live health-check endpoint'
    ]
  },
  {
    id: 'resource-management',
    slug: 'resource-management',
    title: 'Resource Management',
    subtitle: 'Resource Allocation Manager',
    description: 'Manage and assign resources within a business — currently used to manage bed assignments within a hospital, but adaptable to track and assign any kind of resource.',
    detailedDescription: 'Resource Management is a generic resource-tracking and assignment system. Its first real-world use case is managing bed assignments within a hospital, but the underlying model is flexible enough to manage any resource a business needs to allocate. Built with a FastAPI Python backend exposing a REST API, deployed on Cloudflare Workers, and an Angular frontend hosted on Cloudflare Pages.',
    uiUrl: 'https://resource-management-ui.pages.dev/',
    apiUrl: 'https://resource-management-api.wiliam334.workers.dev',
    category: 'Business Operations',
    iconName: 'inventory_2',
    status: 'Live',
    techStack: ['Python', 'Angular', 'Cloudflare', 'FastAPI', 'REST'],
    links: [
      { label: 'Live Application', url: 'https://resource-management-ui.pages.dev/', type: 'ui', icon: 'open_in_new' },
      { label: 'REST API', url: 'https://resource-management-api.wiliam334.workers.dev', type: 'api', icon: 'api' },
      { label: 'GitHub Repository', url: 'https://github.com/wilferraciolli/resource-management', type: 'github', icon: 'code' },
      { label: 'Documentation', url: 'https://resource-management-api.wiliam334.workers.dev/docs', type: 'docs', icon: 'menu_book' },
      { label: 'Health Check', url: 'https://resource-management-api.wiliam334.workers.dev/api/health', type: 'external', icon: 'monitor_heart' }
    ],
    keyFeatures: [
      'Tracks and assigns resources within a business, currently bed assignments in a hospital',
      'Generic resource model adaptable to other kinds of business resources',
      'REST API backend with a live health-check endpoint'
    ]
  },
  {
    id: 'wiltech-labs-ui-libraries',
    slug: 'wiltech-labs-ui-libraries',
    title: 'Wiltech Labs UI Libraries',
    subtitle: 'Shared Angular Component Library',
    description: 'The shared Angular component and design-system libraries that power every UI across Wiltech Labs, published as public npm packages.',
    detailedDescription: 'Wiltech Labs UI Libraries is the set of reusable Angular packages — components, design tokens, and shared utilities — that every application in this portfolio is built on. Published under the Wiltech Labs npm organization so the same look, feel, and behavior stay consistent across every project.',
    category: 'Shared Libraries',
    iconName: 'widgets',
    status: 'Live',
    techStack: ['Angular', 'TypeScript', 'npm'],
    links: [
      { label: 'npm Organization', url: 'https://www.npmjs.com/org/wiltech-labs', type: 'external', icon: 'open_in_new' },
      { label: 'GitHub Repository', url: 'https://github.com/wilferraciolli/ngx-libraries', type: 'github', icon: 'code' }
    ],
    keyFeatures: [
      'Shared Angular component library consumed by every Wiltech Labs application',
      'Centralized design tokens and styling for a consistent look and feel',
      'Published as versioned public packages under the @wiltech-labs npm organization'
    ]
  },
  {
    id: 'wiltech-labs-python-libraries',
    slug: 'wiltech-labs-python-libraries',
    title: 'Wiltech Labs Python Libraries',
    subtitle: 'Shared Python Library',
    description: 'The shared Python libraries and utilities that power every backend service across Wiltech Labs.',
    detailedDescription: 'Wiltech Labs Python Libraries is the set of reusable Python packages — shared utilities, common models, and conventions — that every FastAPI backend in this portfolio is built on, keeping backend services consistent and avoiding duplicated code across projects.',
    category: 'Shared Libraries',
    iconName: 'deployed_code',
    status: 'Live',
    techStack: ['Python', 'pip'],
    links: [
      { label: 'PyPI Package', url: 'https://pypi.org/project/wiltech-labs-rest/', type: 'external', icon: 'open_in_new' },
      { label: 'GitHub Repository', url: 'https://github.com/wilferraciolli/py-libraries', type: 'github', icon: 'code' }
    ],
    keyFeatures: [
      'Shared Python utilities and common models consumed by every Wiltech Labs backend',
      'Keeps conventions and patterns consistent across FastAPI services',
      'Published as versioned Python packages'
    ]
  },
  {
    id: 'ai-analytics-agent',
    slug: 'ai-analytics-agent',
    title: 'Nexus AI Intelligence Platform',
    subtitle: 'Autonomous multi-modal analytics & conversational intelligence',
    description: 'An advanced conversational AI analytics system providing real-time data insights, predictive forecasting, and automated workflow orchestrations.',
    detailedDescription: 'Nexus AI Intelligence Platform connects directly to enterprise data warehouses to provide natural language querying, vector semantic search, and autonomous data summarization. Powered by high-performance Python microservices, pgvector for semantic retrieval, and Angular with reactive Signal architecture on the frontend.',
    uiUrl: 'https://nexus-ai.wiltechlabs.io',
    apiUrl: 'https://api.wiltechlabs.io/v1/analytics',
    category: 'AI & Machine Learning',
    iconName: 'psychology',
    status: 'Live',
    techStack: ['Python', 'Angular', 'AI', 'Postgres', 'FastAPI', 'pgvector', 'Docker'],
    links: [
      { label: 'Live Application', url: 'https://nexus-ai.wiltechlabs.io', type: 'ui', icon: 'open_in_new' },
      { label: 'REST & GraphQL API', url: 'https://api.wiltechlabs.io/v1/analytics/docs', type: 'api', icon: 'api' },
      { label: 'GitHub Repository', url: 'https://github.com/wiltechlabs/nexus-ai-intelligence', type: 'github', icon: 'code' },
      { label: 'System Documentation', url: 'https://docs.wiltechlabs.io/nexus-ai', type: 'docs', icon: 'menu_book' }
    ],
    keyFeatures: [
      'Multi-modal LLM agent orchestration with Python LangGraph',
      'Real-time streaming telemetry and predictive metrics',
      'Sub-millisecond vector similarity search using Postgres & pgvector',
      'High-performance Angular 22 UI with zoneless signal state management'
    ],
    architectureNotes: [
      'Frontend: Angular Standalone Components, Material 3 Design, NgRx SignalStore',
      'Backend: Python 3.12, FastAPI, Celery, Redis queue',
      'Database: PostgreSQL 16 with pgvector extension',
      'Security: Clerk enterprise SSO & JWT bearer authorization'
    ]
  },
  {
    id: 'clerk-auth-saas-core',
    slug: 'clerk-auth-saas-core',
    title: 'Pulse SaaS Core & Identity Portal',
    subtitle: 'Unified enterprise user management, tenancy & RBAC engine',
    description: 'Scalable multi-tenant authentication and team collaboration gateway with seamless Clerk integration, organization switching, and audit logging.',
    detailedDescription: 'Pulse SaaS Core provides the foundational auth, billing, and member governance infrastructure for Wiltech Labs applications. Built with Clerk authentication, fine-grained role-based access control, Postgres relational persistence, and modern reactive Angular interfaces.',
    uiUrl: 'https://pulse.wiltechlabs.io',
    apiUrl: 'https://api.wiltechlabs.io/v1/identity',
    category: 'Security & Auth',
    iconName: 'verified_user',
    status: 'Live',
    techStack: ['Angular', 'Clerk', 'Postgres', 'Python', 'Tailwind', 'Docker', 'REST API'],
    links: [
      { label: 'Identity Portal', url: 'https://pulse.wiltechlabs.io', type: 'ui', icon: 'open_in_new' },
      { label: 'API Reference', url: 'https://api.wiltechlabs.io/v1/identity/docs', type: 'api', icon: 'api' },
      { label: 'OpenAPI Spec', url: 'https://api.wiltechlabs.io/v1/identity/openapi.json', type: 'docs', icon: 'description' }
    ],
    keyFeatures: [
      'Clerk passwordless, Passkeys, OAuth2 and Enterprise SAML SSO',
      'Multi-tenant workspace isolation with role-based policies',
      'Automated audit event logging and compliance reporting',
      'Instant session validation with decentralized JWT verification'
    ],
    architectureNotes: [
      'Auth Provider: Clerk SDK with Angular Angular router guards',
      'Backend: Python asynchronous services with strict pydantic validation',
      'Storage: PostgreSQL partitioned tenant schemas',
      'Deployment: Kubernetes cluster with automated TLS termination'
    ]
  },
  {
    id: 'omni-data-pipeline',
    slug: 'omni-data-pipeline',
    title: 'OmniStream Data & Metrics Engine',
    subtitle: 'Real-time telemetry streaming, ingestion & visualization system',
    description: 'Distributed event processing pipeline capturing high-throughput metrics, transformations, and live dashboards for distributed systems.',
    detailedDescription: 'OmniStream ingests, processes, and stores millions of events daily. It combines asynchronous Python ingestion workers with PostgreSQL time-series indexing and an Angular visual analytics console for real-time monitoring and alerting.',
    uiUrl: 'https://omnistream.wiltechlabs.io',
    apiUrl: 'https://api.wiltechlabs.io/v1/stream',
    category: 'Cloud Infrastructure',
    iconName: 'hub',
    status: 'Beta',
    techStack: ['Angular', 'Python', 'Postgres', 'AI', 'WebSockets', 'Clerk', 'Docker'],
    links: [
      { label: 'Console Dashboard', url: 'https://omnistream.wiltechlabs.io', type: 'ui', icon: 'open_in_new' },
      { label: 'Streaming Ingest API', url: 'https://api.wiltechlabs.io/v1/stream/docs', type: 'api', icon: 'api' },
      { label: 'Metrics Explorer', url: 'https://omnistream.wiltechlabs.io/explore', type: 'external', icon: 'query_stats' }
    ],
    keyFeatures: [
      'Sub-second telemetry ingestion and streaming WebSockets updates',
      'Time-series aggregations with automated anomaly detection via AI models',
      'Configurable alert triggers with multi-channel dispatch',
      'Interactive canvas and SVG charts optimized for 60fps rendering'
    ],
    architectureNotes: [
      'Processing Engine: Python AsyncIO with background consumer pools',
      'Frontend: Angular 22, Material 3 elevation surfaces and charts',
      'Data Layer: PostgreSQL hypertables and Redis caching layer',
      'Integration: Webhook ingestion with cryptographic HMAC verification'
    ]
  }
];

export interface ProjectState {
  projects: Project[];
  selectedProjectId: string | null;
  searchFilter: string;
  selectedTechFilter: string | null;
}

const initialState: ProjectState = {
  projects: INITIAL_PROJECTS,
  selectedProjectId: null,
  searchFilter: '',
  selectedTechFilter: null,
};

export const ProjectStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    allTechStacks: computed(() => {
      const set = new Set<string>();
      for (const p of store.projects()) {
        p.techStack.forEach((t) => set.add(t));
      }
      return Array.from(set).sort();
    }),
    filteredProjects: computed(() => {
      const search = store.searchFilter().trim().toLowerCase();
      const tech = store.selectedTechFilter();

      return store.projects().filter((project) => {
        const matchesSearch =
          !search ||
          project.title.toLowerCase().includes(search) ||
          project.subtitle.toLowerCase().includes(search) ||
          project.description.toLowerCase().includes(search) ||
          project.techStack.some((t) => t.toLowerCase().includes(search));

        const matchesTech = !tech || project.techStack.includes(tech);

        return matchesSearch && matchesTech;
      });
    }),
    selectedProject: computed(() => {
      const id = store.selectedProjectId();
      if (!id) return null;
      return store.projects().find((p) => p.id === id || p.slug === id) ?? null;
    }),
    projectCount: computed(() => store.projects().length),
  })),
  withMethods((store) => ({
    selectProject(id: string | null): void {
      patchState(store, { selectedProjectId: id });
    },
    setSearchFilter(searchFilter: string): void {
      patchState(store, { searchFilter });
    },
    setSelectedTechFilter(selectedTechFilter: string | null): void {
      patchState(store, { selectedTechFilter });
    },
    resetFilters(): void {
      patchState(store, { searchFilter: '', selectedTechFilter: null });
    },
    getProjectByIdOrSlug(idOrSlug: string): Project | undefined {
      return store.projects().find((p) => p.id === idOrSlug || p.slug === idOrSlug);
    }
  }))
);
