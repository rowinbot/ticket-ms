import { DbConfig } from '../config.ts';
import { DbProvider } from './common.ts';

type Class<T> = new (...args: any[]) => T;

/**
 * A container for a database provider (Pg, mongo, etc...) that is lazily initialized.
 */
export class LazyDbProviderContainer<P extends DbProvider> {
  #provider: P | undefined;

  config: DbConfig | undefined;
  providerClass: Class<P>;

  constructor(providerClass: Class<P>) {
    this.providerClass = providerClass;
  }

  setup(config: DbConfig) {
    const Provider = this.providerClass;

    this.config = config;
    this.#provider = new Provider(this.config);
  }

  get provider(): P {
    if (!this.#provider) {
      throw new Error(
        'Before using the provider, you must call setup with the db config.',
      );
    }
    return this.#provider!;
  }
}
