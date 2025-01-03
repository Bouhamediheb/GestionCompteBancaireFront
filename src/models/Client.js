class Client {
    /**
     * @param {number} id 
     * @param {string} cin 
     * @param {string} nom 
     * @param {string} prenom 
     * @param {Array<Compte>} comptes 
     */
    constructor(id, cin, nom, prenom, comptes = []) {
      this.id = id; 
      this.cin = cin; 
      this.nom = nom; 
      this.prenom = prenom; 
      this.comptes = comptes; 
    }
  }
  
  export default Client;
  