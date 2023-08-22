export class ServiceResult<T> {
  constructor(
    public success: boolean,
    public data?: T,
    public error?: string,
  ) {}
}
