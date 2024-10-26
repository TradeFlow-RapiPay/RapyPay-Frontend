export class Wallet{
    constructor( id='', walletName='', billNumber ='', bank=0, billsList=[],description='', closingDate='', totalDiscount=0.0,totalNetValue=0.0, tcea=0.0, moneyType=''){
        this.id = id;
        this.walletName = walletName;
        this.bank = bank;
        this.billsList=billsList;
        this.description = description;
        this.closingDate = closingDate;
        this.totalDiscount = totalDiscount;
        this.totalNetValue = totalNetValue;
        this.tcea=tcea;
        this.moneyType=moneyType;
    }
}