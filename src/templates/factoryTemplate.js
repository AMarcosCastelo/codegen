 import { StringUtils } from "../utils";

const componentNameAnchor = '$$componentName';
const serviceNameAnchor = '$$serviceName';
const repositoryNameAnchor = '$$repositoryName';
const serviceDepNameAnchor = '$$serviceDepName';
const repositoryDepNameAnchor = '$$repositoryDepName';

const template = `
  import $$serviceName from '../service/$$serviceDepName';
  import $$repositoryName from '../repository/$$repositoryDepName';

  export default class $$componentNameFactory {
    static getInstance() {
      const repository = new $$repositoryName();
      const service = new $$serviceName({ repository });

      return service;
    }
  }
`

export function factoryTemplate(componentName, repositoryName, serviceName) {
  const txtFile = template
    .replaceAll(componentNameAnchor, StringUtils.upperCaseFirstLetter(componentName))
    .replaceAll(serviceDepNameAnchor, StringUtils.lowerCaseFirstLetter(serviceName))
    .replaceAll(repositoryDepNameAnchor, StringUtils.lowerCaseFirstLetter(repositoryName))
    .replaceAll(serviceNameAnchor, StringUtils.upperCaseFirstLetter(serviceName))
    .replaceAll(repositoryNameAnchor, StringUtils.upperCaseFirstLetter(repositoryName));


  return {
    fileName: `${componentName}Factory`,
    template: txtFile,
  }
};

