export class UserData {
  constructor(
    public id: string,
    public coin: {
      coinId: number;
      coinName: string;
      amount: number;
      bought: number;
      boughtDate: Date;
    }
  ) {}
}
