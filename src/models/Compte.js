class Compte {
    /**
     * @param {number} rib 
     * @param {number} solde 
     * @param {Client} client 
     */
    constructor(rib, solde, client = null) {
      this.rib = rib; 
      this.solde = solde; 
      this.client = client; 
    }
  }
  
  export default Compte;
  