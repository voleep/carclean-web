import {
  Component,
  Injector,
  OnInit,
  computed,
  effect,
  signal,
} from '@angular/core';
import { BloggerService } from './blogger.service';
import { firstValueFrom } from 'rxjs';
import { BloggerPost } from './blogger-post.type';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-blogger-stories',
  templateUrl: 'blogger-stories.component.html',
  styleUrls: ['blogger-stories.component.scss'],
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [BloggerService],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class BloggerStoriesComponent implements OnInit {
  postList = signal<BloggerPost[]>([]);
  currentPost = computed(() => {
    return this.postList().at(this.currentPostIndex());
  });
  currentPostIndex = signal(0);
  currentProgress = signal(0);

  constructor(
    private injector: Injector,
    private bloggerService: BloggerService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const postList = await firstValueFrom(
        this.bloggerService.getRecentPosts()
      );
      this.postList.set(postList.filter((post) => Boolean(post.imageUrl)));
      effect(
        (onCleanup) => {
          const postLength = this.postList().length;
          if (!postLength) {
            return;
          }
          this.currentPostIndex();
          const interval = setInterval(() => {
            if (this.currentProgress() >= 100) {
              this.handleGoNextPost();
              return;
            }
            this.currentProgress.update((value) => (value += 0.5));
          }, 50);

          onCleanup(() => {
            clearInterval(interval);
          });
        },
        { injector: this.injector }
      );
    } catch (error) {}
  }

  handleGoNextPost(): void {
    this.currentProgress.set(0);
    if (this.currentPostIndex() === this.postList().length - 1) {
      this.currentPostIndex.set(0);
      return;
    }
    this.currentPostIndex.update((value) => value + 1);
  }

  handleGoPreviousPost(): void {
    this.currentProgress.set(0);
    if (this.currentPostIndex() === 0) {
      this.currentPostIndex.set(this.postList.length);
      return;
    }
    this.currentPostIndex.update((value) => value - 1);
  }

  getProgressByIndex(index: number): number {
    const currentIndex = this.currentPostIndex();
    if (index < currentIndex) return 100;
    if (index > currentIndex) return 0;
    return this.currentProgress();
  }
}
