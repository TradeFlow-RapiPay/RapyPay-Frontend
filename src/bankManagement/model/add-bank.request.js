export class AddBankRequest {
    constructor(bankName='', tea=0.0, tcea=0.0, additionalInfo='' ) {
        this.bankName = bankName;
        this.tea = tea;
        this.tcea = tcea;
        this.additionalInfo = additionalInfo;
    }
}