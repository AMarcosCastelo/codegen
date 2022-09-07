 import { StringUtils } from "../utils";

const componentNameAnchor = '$$componentName';
const currentContextAnchor = '$$currentContextName';
const repositoryAnchor = '$$repositoryName';

const template = `
  export default class $$componentNameService {
    constructor({ repository: $$repositoryName }) {
      this.$$currentContextName = $$repositoryName;
    };

    create(data) {
      return this.$$currentContextName.create(data);
    };

    read(query) {
      return this.$$currentContextName.read(query);
    };

    update(id, data) {
      return this.$$currentContextName.update(id, data);
    };

    delete(id) {
      return this.$$currentContextName.delete(id);
    };
  }
`

export function serviceTemplate(componentName, repositoryName) {
  const txtFile = template
    .replaceAll(componentNameAnchor, StringUtils.upperCaseFirstLetter(componentName))
    .replaceAll(currentContextAnchor, repositoryName)
    .replaceAll(repositoryAnchor, repositoryName)

  return {
    fileName: `${componentName}Service`,
    template: txtFile,
  }
};

