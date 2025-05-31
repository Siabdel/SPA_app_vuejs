
// src/services/productService.js
export default {
  async getProducts() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "Consulting Technique", price: 250 },
          { id: 2, name: "Développement Web", price: 450 },
          { id: 3, name: "Maintenance Informatique", price: 180 },
          { id: 4, name: "Formation", price: 300 },
          { id: 5, name: "Audit de Sécurité", price: 600 },
        ]);
      }, 8);
    });
  }
}