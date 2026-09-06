/**
 * Failure the UI can show. Map HTTP and unexpected errors here.
 */
export class AppException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppException';
  }
}
