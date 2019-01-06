/**
 * @description Recursive function to return a object or a object's <returnProp> by its <prop> <val>
 * @param obj
 * @param prop
 * @param val
 * @param returnProp
 */
export function findByProp(obj, prop, val, returnProp = '') {
  if (obj == null) { return false; }
  if ( obj[prop] === val ) {
    return (returnProp) ? obj[returnProp] : obj;
  }
  let result, p;
  for (p in obj) {
    if ( obj.hasOwnProperty(p) && typeof obj[p] === 'object' ) {
      result = findByProp(obj[p], prop, val);
      if (result) {
        return (returnProp) ? result[returnProp] : result;
      }
    }
  }
  return (returnProp) ? result[returnProp] : result;
}

