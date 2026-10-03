import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ProjectStore } from '../../store/project.store';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    ProjectCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly store = inject(ProjectStore);

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.store.setSearchFilter(input.value);
  }

  onTechSelect(tech: string | null): void {
    if (this.store.selectedTechFilter() === tech) {
      this.store.setSelectedTechFilter(null);
    } else {
      this.store.setSelectedTechFilter(tech);
    }
  }

  clearSearch(): void {
    this.store.resetFilters();
  }
}
