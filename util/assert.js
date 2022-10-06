/**
 * 
 * @param {boolean} boolVal 
 * @param {number} code 
 * @param {string} msg 
 * @param {Object} ctx 
 * @returns 
 */
// 用于断言
function assert(boolVal, code, msg, ctx) {
  if (!boolVal) {
    ctx.body = {
      code,
      msg
    };
    ctx.status = code;
    return false;
  }
  return true;
};

/**
 * 
 * @param {number} code 
 * @param {string} msg 
 * @param {Object} data 
 * @param {Object} ctx 
 */
// 用于返回数据
function returnInfo(msg, code, data, ctx) {
  if (data) {
    ctx.body = {
      code,
      msg,
      data
    };
  } else {
    ctx.body = {
      code,
      msg
    };
  }
  ctx.status = code;
}

module.exports = {
  assert,
  returnInfo
};