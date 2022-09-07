import { jest } from '@jest/globals';

import { repositoryTemplate } from '../../src/templates';
import { productRepositoryStub } from './stubs';

describe("#Codegen 3-layers arch", () => {
  const componentName = 'product';
  const repositoryName = `${componentName}Repository`

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it.todo("#should generate repository template")
  it.todo("#should generate service template")
  it.todo("#should generate factory template")
});
