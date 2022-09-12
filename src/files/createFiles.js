import fsPromise from 'fs/promises';

import templates from '../templates';
import { StringUtils } from '../utils';

const defaultDependencies = (layer, componentName) => {
  const dependencies = {
    repository: [],
    service: [`${componentName}Repository`],
    factory: [`${componentName}Repository`, `${componentName}Service`],
  };

  return dependencies[layer].map(StringUtils.lowerCaseFirstLetter);
};

async function executeWrites(pendingFilesToWrite) {
  return Promise.all(
    pendingFilesToWrite.map(({ fileName, txtFile }) =>
      fsPromise.writeFile(fileName, txtFile),
    ),
  );
}

export async function createFiles({
  mainPath,
  defaultMainFolder,
  layers,
  componentName,
}) {
  const keys = Object.keys(templates);
  const pendingFilesToWrite = [];

  for (const layer of layers) {
    const chosenTemplate = keys.find((key) => key.includes(layer));

    if (!chosenTemplate) {
      return { error: "the chosen layer doesn't have a template" };
    }

    const template = templates[chosenTemplate];
    const targeFolder = `${mainPath}/${defaultMainFolder}/${layer}`;
    const dependencies = defaultDependencies(layer, componentName);
    const { fileName: templateFileName, template: txtFile } = template(
      componentName,
      ...dependencies,
    );

    const fileName = `${targeFolder}/${StringUtils.lowerCaseFirstLetter(
      templateFileName,
    )}.js`;

    pendingFilesToWrite.push({ fileName, txtFile });
  }

  await executeWrites(pendingFilesToWrite);

  return { success: true };
}
