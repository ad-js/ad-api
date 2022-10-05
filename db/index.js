const mysql = require('mysql');
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'zsswc200256814',
  database: 'ad_system'
});

// 接收一个sql语句 以及所需的values
// 这里接收第二参数values的原因是可以使用mysql的占位符 '?'
// 比如 query(`select * from my_database where id = ?`, [1])

function mysql_op(sql, values) {
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          // 结束会话
          connection.release();
        });
      }
    });
  });
};

async function query(sql, values) {
  return await mysql_op(sql, values);
}

async function insert(sql, values) {
  return await mysql_op(sql, values);
}

async function update(sql, values) {
  return await mysql_op(sql, values);
}

async function del(sql, count) {
  return await mysql_op(sql, count);
}

module.exports = {
  query,
  insert,
  update,
  del
};