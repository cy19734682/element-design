/**
 * 描述：数值类型格式化
 * @param str: 待转换的字符串，
 * @param dftVal: 如果str为空或者parseFloat解析结果为NaN时 返回的默认值 ，不传默认返回0
 * @param num: 保留几位小数 不传默认保留2位
 * @param actNum: 结果需要乘以的数字
 * @param endStr: 结尾需要拼接的字符串
 * @returns
 */
export function parseFloatFormat(str, dftVal, num, actNum, endStr) {
  dftVal = dftVal || 0
  num = num || 2
  let result = dftVal
  if (str || str == 0) {
    result = parseFloat(str) // 使用十进制进行转换
    if (!isNaN(result)) {
      if (!isNaN(actNum)) {
        result = (result * actNum).toFixed(num)
      }
      else {
        result = result.toFixed(num)
      }
      if (endStr && endStr.length > 0) {
        result = result + endStr
      }
    }
    else {
      result = dftVal
    }
  }
  return result
}

/**
 * 图片拼接
 * @param path
 * @returns {string|*}
 */
export function imageSplicing(path) {
  if (path && path.indexOf("http") < 0) {
    return (window.global && window.global.serverImg + path) || path
  }
  else {
    return path || ""
  }
}
