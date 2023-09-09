import { environment } from 'src/environments/environment';

export abstract class AppConfig {
  static OAUTH_API_URL = environment.OAUTH_API_URL;
  static CARCLEAN_API_URL = environment.CARCLEAN_API_URL;
}
