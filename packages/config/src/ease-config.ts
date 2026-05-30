export interface EaseConfigOptions {
  log?: (message: string) => void;
  onError?: (e: Error) => void;
}

class EaseConfig {
  private _log: (message: string) => void = (msg) => console.log(`[ease-config] ${msg}`);
  private _onError: (error: Error) => void = (err) => { throw err; };

  /**
   * @example
   * easeConfig.configure({
   *   log: (msg) => logger.info(msg),
   *   onError: (err) => {
   *     Sentry.captureException(err);
   *     throw err;
   *   },
   * });
   */
  configure(options: EaseConfigOptions): void {
    if (options.log) this._log = options.log;
    if (options.onError) this._onError = options.onError;
  }

  log(message: string): void {
    this._log(message);
  }

  handleError(error: Error): never {
    this._onError(error);
    throw error;
  }

  throw(message: string): never {
    return this.handleError(new Error(message));
  }
}

export const easeConfig = new EaseConfig();