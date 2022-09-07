import { jest, expect } from '@jest/globals';

import {
  repositoryTemplate,
  serviceTemplate,
  factoryTemplate
} from '../';
import {
  productRepositoryStub,
  productServiceStub,
  productFactoryStub
} from '../../test/unit/stubs';

describe("#Codegen 3-layers arch", () => {
  const componentName = 'product';
  const repositoryName = `${componentName}Repository`;
  const serviceName = `${componentName}Service`;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("#should generate repository template", () => {
    const expected = {
      fileName: repositoryName,
      template: productRepositoryStub
    };

    const result = repositoryTemplate(componentName);

    expect(result).toStrictEqual(expected);
  });

  it("#should generate service template", () => {
    const expected = {
      fileName: serviceName,
      template: productServiceStub
    };

    const result = serviceTemplate(componentName, repositoryName);

    expect(result).toStrictEqual(expected);
  });

  it("#should generate factory template", () => {
    const factoryName = `${componentName}Factory`;
    const expected = {
      fileName: factoryName,
      template: productFactoryStub
    };

    const result = factoryTemplate(componentName, repositoryName, serviceName);

    expect(result).toStrictEqual(expected);
  });
});
