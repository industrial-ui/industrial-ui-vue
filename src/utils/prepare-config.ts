/**
 * Merge default config file with the actual configuration passed to IUI wrapper
 * @param {object} defaultConfig – '../config.js'
 * @param {object} actualConfig
 * @returns {object}
 */

import { Config, ConfigComponents } from '@/types/config';

const isObject = (item: any): item is any => (item && typeof item === 'object' && !Array.isArray(item));

/**
 * It is important to have is:properties have the format
 * matching /^is:/ for parsing properties after.
 * This function maps all configured is:properties to that format
 * @param {object} obj – config.components[componentName].isProperties object
 */
const renameObjectKeys = (obj: any): void => {
  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    Object.defineProperty(obj, `is:${key}`, Object.getOwnPropertyDescriptor(obj, key));
    delete obj[key];
  });
};

/**
 * MergeDeep function with credit to the first StackOverflow link
 */

export const mergeDeep = (target: any, ...sources: any): any => {
  if (!sources.length) return target;
  const source = sources.shift() || {};

  if (isObject(target) && source && isObject(source)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(source)) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
};

const prepareConfig = (defaultConfig: Config, actualConfig: Partial<Config>): Config => {
  // Merge default (empty) and given configs into one
  const config: Config = mergeDeep({}, defaultConfig, actualConfig);

  // Add 'is:' prefix to all components' isProperties now
  // in order to do it once and for all time but not in all components
  Object.keys(config.components).forEach((key: keyof ConfigComponents) => {
    const component = config.components[key];
    if (component.isProperties) {
      renameObjectKeys(component.isProperties);
    }
  });

  return config;
};
export default prepareConfig;
