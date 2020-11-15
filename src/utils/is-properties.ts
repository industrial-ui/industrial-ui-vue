import {IndexedObject} from '../types/special';

/**
 * Add classes to component based on reactive is:property that are configured and truthy
 *
 * @param isProps – configured is:properties in config.components[componentName]
 * @param props – component's $$props
 * @returns {string} – generated classes bases on reactive is:properties
 */

const isProperties = (isProps: IndexedObject<string>, props: IndexedObject<string>): string => {
  const classes = Object.keys(props).filter((key) => key.match(/^is:/));

  let classArray: string[] = [];
  classes.forEach((key) => {
    if (props[key] !== 'false' && Object.prototype.hasOwnProperty.call(isProps, key)) {
      classArray = classArray.concat(isProps[key].split(' '));
    }
  });
  return classArray.join(' ');
};
export default isProperties;
