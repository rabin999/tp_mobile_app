/**
 * Application-owned failure type.
 *
 * Features and infrastructure should map unexpected errors here instead of
 * leaking implementation exceptions across layer boundaries.
 */
export class AppException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppException';
  }
}
