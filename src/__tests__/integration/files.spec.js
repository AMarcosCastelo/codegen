import { tmpdir } from 'os';
import fsPromises from 'fs/promises';
import { join } from 'path';
import { jest } from '@jest/globals';

import { StringUtils } from '../../utils';
import { createLayersIfNotExists } from '../../layers/createLayers';
import { createFiles } from '../../files/createFiles';

function getAllFunctionsFromInstance(instance) {
  return Reflect.ownKeys(Reflect.getPrototypeOf(instance)).filter(
    (method) => method !== 'constructor',
  );
}

function generateFolders({
  mainPath,
  defaultMainFolder,
  layers,
  componentName,
}) {
  return layers.map((layer) => {
    const fileName = `${componentName}${StringUtils.upperCaseFirstLetter(
      layer,
    )}.js`;

    return join(mainPath, defaultMainFolder, layer, fileName);
  });
}

describe('#Files - Files Structure', () => {
  const packageJSON = 'package.json';
  const packageJSONLocation = join(
    'src/__tests__/integration/stubs/',
    packageJSON,
  );

  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    layers: ['factory', 'repository', 'service'].sort(),
    componentName: 'heroes',
  };

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'files-'));
    await fsPromises.copyFile(
      packageJSONLocation,
      join(config.mainPath, packageJSON),
    );
    await createLayersIfNotExists(config);
  });

  // afterAll(async () => {
  //   await fsPromises.rm(config.mainPath, { recursive: true });
  // });

  it('should have create Repository class, read, update and delete methods', async () => {
    const myConfig = {
      ...config,
      layers: ['repository'],
    };

    await createFiles(myConfig);

    const [repositoryFile] = generateFolders(myConfig);
    const { default: Repository } = await import(repositoryFile);
    const instance = new Repository();

    const expectNotImplemented = (fn) =>
      expect(() => fn.call()).rejects.toBe('Method not implemented');

    expectNotImplemented(instance.create);
    expectNotImplemented(instance.read);
    expectNotImplemented(instance.update);
    expectNotImplemented(instance.delete);
  });

  test('Service should have the same signature of repository and call all its methods', async () => {
    const myConfig = {
      ...config,
      layers: ['repository', 'service'],
    };

    await createFiles(myConfig);

    const [repositoryFile, serviceFile] = generateFolders(myConfig);
    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);
    const repository = new Repository();
    const service = new Service({ repository });

    const allRepositoryMethods = getAllFunctionsFromInstance(repository);

    allRepositoryMethods.forEach((method) =>
      jest.spyOn(repository, method).mockResolvedValue(),
    );

    getAllFunctionsFromInstance(service).forEach((method) =>
      service[method].call(service, []),
    );

    allRepositoryMethods.forEach((method) =>
      expect(repository[method]).toHaveBeenCalled(),
    );
  });

  test('Factory instance should match layers', async () => {
    const myConfig = {
      ...config,
    };

    await createFiles(myConfig);

    const [factoryFile, repositoryFile, serviceFile] =
      generateFolders(myConfig);
    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);
    const { default: Factory } = await import(factoryFile);
    const expectedInstance = new Service({ repository: new Repository() });
    const instance = Factory.getInstance();

    expect(instance).toMatchObject(expectedInstance);
    expect(instance).toBeInstanceOf(Service);
  });
});
