import fsPromise from 'fs/promises';
import { expect, jest } from '@jest/globals';

import { createFiles } from '../createFiles';
import templates from '../../templates';

describe('#Files - Folder Structure', () => {
  const defaultLayers = ['service', 'repository', 'factory'];
  const defaultConfig = {
    layers: defaultLayers,
    mainPath: './',
    defaultMainFolder: 'src',
    componentName: 'heroes',
  };
  const repositoryLayer = `${defaultConfig.componentName}Repository`;
  const serviceLayer = `${defaultConfig.componentName}Service`;

  it('should not create file structure on inexistent templates', async () => {
    const config = {
      ...defaultConfig,
      layers: ['inexistent'],
    };
    const expected = { error: "the chosen layer doesn't have a template" };
    const result = await createFiles(config);

    expect(result).toStrictEqual(expected);
  });

  it('repository should not add any additional dependencies', async () => {
    jest.spyOn(fsPromise, fsPromise.writeFile.name).mockResolvedValue();
    jest.spyOn(templates, templates.repositoryTemplate.name).mockReturnValue({
      fileName: '',
      template: '',
    });

    const config = {
      ...defaultConfig,
      layers: ['repository'],
    };
    const expected = { success: true };
    const result = await createFiles(config);

    expect(result).toStrictEqual(expected);

    expect(fsPromise.writeFile).toHaveBeenCalledTimes(config.layers.length);
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(
      config.componentName,
    );
  });

  it('service should have repository as dependency', async () => {
    jest.spyOn(fsPromise, fsPromise.writeFile.name).mockResolvedValue();
    jest.spyOn(templates, templates.serviceTemplate.name).mockReturnValue({
      fileName: '',
      template: '',
    });

    const config = {
      ...defaultConfig,
      layers: ['repository', 'service'],
    };
    const expected = { success: true };

    const result = await createFiles(config);

    expect(result).toStrictEqual(expected);

    expect(fsPromise.writeFile).toHaveBeenCalledTimes(config.layers.length);
    expect(templates.serviceTemplate).toHaveBeenCalledWith(
      config.componentName,
      repositoryLayer,
    );
  });

  it('service should have repository and service as dependency', async () => {
    jest.spyOn(fsPromise, fsPromise.writeFile.name).mockResolvedValue();
    jest.spyOn(templates, templates.factoryTemplate.name).mockReturnValue({
      fileName: '',
      template: '',
    });

    const config = {
      ...defaultConfig,
    };
    const expected = { success: true };

    const result = await createFiles(config);

    expect(result).toStrictEqual(expected);

    expect(fsPromise.writeFile).toHaveBeenCalledTimes(config.layers.length);
    expect(templates.factoryTemplate).toHaveBeenCalledWith(
      config.componentName,
      repositoryLayer,
      serviceLayer,
    );
  });
});
