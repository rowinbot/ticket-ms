import { GlobalDB } from './db.ts';

export abstract class AppResolver {
  getDb() {
    return GlobalDB.provider.init();
  }
}
