import { IsString } from 'class-validator';

export class ReturnBookRequest {
  @IsString()
  loanId: string;

  constructor(loanId: string) {
    this.loanId = loanId;

    if (!loanId || loanId.trim().length === 0) {
      throw new Error('Loan ID is required');
    }
  }

  validate(): void {
    if (!this.loanId || this.loanId.trim().length === 0) {
      throw new Error('Loan ID is required');
    }
  }

  toReturnPayload(returnDate: Date): { loanId: string; returnDate: Date } {
    return {
      loanId: this.loanId,
      returnDate,
    };
  }

  static createFromPartial(data: { loanId?: string }): ReturnBookRequest {
    if (!data.loanId || data.loanId.trim().length === 0) {
      throw new Error('Loan ID is required');
    }
    return new ReturnBookRequest(data.loanId);
  }
}