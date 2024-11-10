export class Bill {
    constructor(billNumber = '', addressee='',billType='',netValue = 0, discount = 0, emissionDate = '', dueDate = '') {
        this.billNumber = billNumber;
        this.addressee= addressee;
        this.billType=billType;
        this.netValue = netValue;
        this.discount = discount;
        this.emissionDate = emissionDate;
        this.dueDate = dueDate;
    }
}