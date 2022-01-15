export class UserData {
  constructor(
    public id: string,
    public email: string,
    public coins: [
      {
        coinId: number;
        coinName: string;
        amount: number;
        bought: number;
        boughtDate: Date;
      }
    ]
  ) {}
}
