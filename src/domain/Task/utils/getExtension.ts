const getExtension = (mimetype: string): string | undefined =>
  mimetype.split('/').pop();

export { getExtension };
