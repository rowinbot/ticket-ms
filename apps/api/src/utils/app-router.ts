import { Router } from 'express';

export abstract class AppRouter {
  #router = Router({ mergeParams: true });

  constructor() {}

  get router(): Router {
    return this.#router;
  }
}
