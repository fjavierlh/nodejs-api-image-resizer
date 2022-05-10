const cleanFilename = (fileName: string): string =>
  fileName.split('.').slice(0, -1).join('.').replace(/\s/g, '_');

export { cleanFilename };
