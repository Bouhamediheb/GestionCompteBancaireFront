class Client {
    /**
     * @param {number} id - The unique identifier for the client
     * @param {string} cin - The CIN (identity card number) of the client
     * @param {string} nom - The last name of the client
     * @param {string} prenom - The first name of the client
     * @param {Array<Compte>} comptes - An array of linked comptes
     */
    constructor(id, cin, nom, prenom, comptes = []) {
      this.id = id; // Matches `@Id @GeneratedValue(strategy = GenerationType.IDENTITY)` in the back-end
      this.cin = cin; // Matches `@Column(name = "cin")`
      this.nom = nom; // Matches `@Column(name = "nom")`
      this.prenom = prenom; // Matches `@Column(name = "prenom")`
      this.comptes = comptes; // Matches `@OneToMany(mappedBy = "client", ...)`
    }
  }
  
  export default Client;
  