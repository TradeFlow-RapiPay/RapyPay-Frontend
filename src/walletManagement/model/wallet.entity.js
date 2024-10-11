export class Wallet{
    constructor( id='', walletName='', bank=null, description='') {
        this.id = id;
        this.walletName = walletName;
        this.bank = bank;
        this.description = description;
    }
}