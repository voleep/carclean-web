import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BloggerPost } from './blogger-post.type';

type BloggerResponse = {
  items: BloggerPost[];
};

@Injectable()
export class BloggerService {
  private readonly CARCLEAN_APP_KEY = 'AIzaSyA9idi3oQJFfqgDv0MGiiQhYklR0J1ic4E';

  private readonly endpoint = `https://www.googleapis.com/blogger/v3/blogs/3364500233745961277/posts?key=${this.CARCLEAN_APP_KEY}&fields=items(title, url, content)&maxResults=6`;

  private readonly firstImgRE = new RegExp(`<img.*?src=["|'](.*?)["|']`);

  constructor(private http: HttpClient) {}

  getRecentPosts(): Observable<BloggerPost[]> {
    return this.http.get<BloggerResponse>(this.endpoint).pipe(
      map((response) => {
        return response.items.map((item) => {
          return {
            ...item,
            imageUrl: this.firstImgRE.exec(item.content)?.at(1),
          };
        });
      })
    );
  }
}
