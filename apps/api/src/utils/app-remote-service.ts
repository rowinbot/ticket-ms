import { AppService } from './app-service.ts';

export abstract class AppRemoteService extends AppService {
  /**
   * This would be a good place to get a global database connection
   * to make it available to every service.
   */
}
