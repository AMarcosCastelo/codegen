export const productFactoryStub = `
  import ProductService from '../service/productService';
  import ProductRepository from '../repository/productRepository';

  export default class ProductFactory {
    static getInstance() {
      const repository = new ProductRepository();
      const service = new ProductService({ repository });

      return service;
    }
  }
`;
