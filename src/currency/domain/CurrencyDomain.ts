export class CurrencyDomain {
  constructor(
    public readonly from: string,
    public readonly to: string,
    private readonly _fromLabel: string,
    private readonly _toLabel: string,
    public readonly conversionRate: number,
  ) {}

  get fromLabel() {
    return this._fromLabel || this.from;
  }

  get toLabel() {
    return this._toLabel || this.to;
  }
}
