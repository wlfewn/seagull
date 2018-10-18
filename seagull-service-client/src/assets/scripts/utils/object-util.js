/**
 * 判断对象是否为空
 */
export function isEmpty(object) {
  if (typeof object === 'undefined' || object === null) {
    return true
  }
  return object.length === 0
}
