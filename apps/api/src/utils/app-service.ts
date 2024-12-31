import { GlobalDB } from './db.ts';

export abstract class AppService {
  protected getDb() {
    return GlobalDB.provider.init();
  }
}
