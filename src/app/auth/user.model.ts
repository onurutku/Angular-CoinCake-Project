export class User {
  constructor(
    public email: string,
    public password: string,
    private _token: string,
    private _tokenExpirateDate: Date
  ) {}
  get token() {
    if (!this._tokenExpirateDate || new Date() > this._tokenExpirateDate) {
      return null;
    } else {
      return this._token;
    }
  }
}
