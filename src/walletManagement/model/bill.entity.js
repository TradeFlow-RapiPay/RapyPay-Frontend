export class Bill {
    constructor(billNumber = '', netValue = 0, emissionDate = '', dueDate = '', walletId = '') {
        this.billNumber = billNumber;
        this.netValue = netValue;
        this.emissionDate = emissionDate;
        this.dueDate = dueDate;
        this.walletId = walletId;
    }
}