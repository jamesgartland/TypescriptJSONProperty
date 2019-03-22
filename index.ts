export function JsonProperty  (name: string) {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
  if (target['_mappingCache'] === undefined) {
    Object.defineProperty(target, "_mappingCache", {
      enumerable: false,
      writable: true
    });
    target['_mappingCache'] = {};
  }
  target['_mappingCache'] = JsonPropertyMapper(target['_mappingCache'], propertyKey, name);

  if (target['jsonMapping'] === undefined) {
    target['jsonMapping'] = () => {
      return target['_mappingCache'];
    }
  }
}
}

const JsonPropertyMapper = (cache, preKey = null, postKey = null) => {
  if (preKey != null && postKey != null) {
    cache[preKey] = postKey;
  }
  return cache;
}


JSON['jsonfy'] = function(this : object, source: object) {
  if (source['jsonMapping'] !== undefined) {
    const mappings = source['jsonMapping']();
    Object.keys(source).forEach(key => {
      if (mappings[key] !== undefined) {
        source[mappings[key]] = source[key];
        delete source[key];
      }
    });
  }
  return this.stringify(source);
}
