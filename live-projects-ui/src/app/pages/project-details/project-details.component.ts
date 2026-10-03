import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProjectStore } from '../../store/project.store';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-details',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatTooltipModule,
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailsComponent {
  private readonly store = inject(ProjectStore);

  readonly id = input.required<string>();

  readonly project = computed<Project | undefined>(() => {
    const projectId = this.id();
    return this.store.getProjectByIdOrSlug(projectId);
  });

  getStatusClass(status?: string): string {
    if (!status) return '';
    switch (status.toLowerCase()) {
      case 'live':
        return 'status-live';
      case 'beta':
        return 'status-beta';
      default:
        return 'status-dev';
    }
  }
}
