const oracledb = require('oracledb')
const dateFormat = require('../util/date_format')

const DB_CONFIG = {
  user: 'link', // 数据库用户名
  password: '123456', // 数据库密码
  connectString: '8.141.146.126:1521/helowin' // 数据库地址：{IP:PORT/数据库名称}
}

let globalPool = null

class Oracle{
  /**
   * 创建连接池
   * @return {Promise<*>}
   */
  async createPool() {
    let pool;
    try {
      pool = await oracledb.createPool(DB_CONFIG);
      globalPool = pool;
    } catch(e) {
      globalPool = null
      throw e;
    }
    return pool;
  }
  
  /**
   * 创建连接
   * @return {Promise<void>}
   */
  async createConnection(pool) {
    let connection;
    try {
      connection = await pool.getConnection();
    } catch (e) {
      throw e;
    }
    return connection;
  }
  
  /**
   * 查询
   * @param sql
   * @param mapping
   * @param options
   * @return {Promise<void>}
   */
  query (sql, mapping, params = {}, options = {}) {
    return new Promise(async (resolve, reject) => {
      let pool;
      try {
        pool = await this.createPool();
        let connection;
        try {
          connection = await this.createConnection(pool);
          const result = await connection.execute(sql, params, options)
          // 转换mapping
          const keys = Object.keys(mapping)
          const values = Object.values(mapping)
          // map: {数据库列名：返回字段名}
          const map = values.reduce((pre, curr, index) => {
            pre.set(curr.name, {name: keys[index], type: values[index].type})
            return pre
          }, new Map())
          resolve(result.rows.map(item => result.metaData.reduce((pre, key, index) => {
            let value = map.get(key.name)
            let curr = item[index]
            // 类型转换
            if (value) {
              if (value.type === oracledb.DATE) {
                curr && (curr = dateFormat(curr))
              } else if (value.type === oracledb.NUMBER){
                curr && (curr = Number(curr))
              }
              // 无字段名与数据库对应
              if (value.name === undefined) {
                pre[key.name] = curr
              } else {
                pre[value.name] = curr
              }
            } else {  // 无字段名与数据库对应
              let {name} = key
              name = name.toLowerCase()
              // 下划线转驼峰
              name = name.replace(/\_(\w)/g, function(all, letter){
                return letter.toUpperCase()
              })
              pre[name] = curr
            }
            return pre
          }, {})));
        } catch (e) {
          throw e;
        } finally {
          if (connection) {
            try {
              await connection.close();
            } catch (e) {
              throw e
            }
          }
        }
      } catch (e) {
        reject(e);
        throw e;
      } finally {
        await pool.close();
      }
    });
  }
  
  /**
   * 插入操作
   * @param sql
   * @param params
   * @param options
   * @return {Promise<unknown>}
   */
  insert (sql, params = {}, options = {autoCommit: true}) {
    return new Promise(async (resolve, reject) => {
      let pool;
      try{
        pool = await this.createPool();
        let connection;
        try {
          connection = await this.createConnection(pool);
          const result = await connection.execute(sql, params, options);
          resolve(result);
        } catch (e) {
          throw e;
        } finally {
          if (connection) {
            try {
              await connection.close();
            } catch (e) {
              throw e;
            }
          }
        }
      } catch (e) {
        reject(e);
        throw e;
      } finally {
        await pool.close();
      }
    });
  }
  
  /**
   * 更新操作
   * @param sql
   * @param params
   * @param options
   * @return {Promise<unknown>}
   */
  update (sql, params = {}, options = {autoCommit: true}) {
   // ...同新增
   return new Promise(async (resolve, reject) => {
    let pool;
    try{
      pool = await this.createPool();
      let connection;
      try {
        connection = await this.createConnection(pool);
        const result = await connection.execute(sql, params, options);
        resolve(result);
      } catch (e) {
        throw e;
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (e) {
            throw e;
          }
        }
      }
    } catch (e) {
      reject(e);
      throw e;
    } finally {
      await pool.close();
    }
  });
  }
  
  /**
   * 删除操作
   * @param sql
   * @param params
   * @param options
   * @return {Promise<unknown>}
   */
  delete (sql, params = {}, options = {autoCommit: true}) {
    // ... 同新增
    return new Promise(async (resolve, reject) => {
      let pool;
      try{
        pool = await this.createPool();
        let connection;
        try {
          connection = await this.createConnection(pool);
          const result = await connection.execute(sql, params, options);
          resolve(result);
        } catch (e) {
          throw e;
        } finally {
          if (connection) {
            try {
              await connection.close();
            } catch (e) {
              throw e;
            }
          }
        }
      } catch (e) {
        reject(e);
        throw e;
      } finally {
        await pool.close();
      }
    });
  }
  
  /**
   * 多sql事务控制
   * @param sqlParams [{sql, params, options, multi}] multi:是否执行多次
   * @return {Promise<[]>}
   */
  oracleTrans(sqlParams) {
    return new Promise(async (resolve, reject) => {
      let pool;
      try {
        pool = await this.createPool()
        let connection
        try {
          connection = await this.createConnection(pool)
          let results = []
          for (let i = 0, length = sqlParams.length; i < length; i++) {
            const {sql, params, multi = false, options = {}} = sqlParams[i]
            if (multi) results.push(await connection.executeMany(sql, params, options))
            else results.push(await connection.execute(sql, params, options))
          }
          // 提交事务
          await connection.commit()
          resolve(results)
        }catch (e) {
          // 事务回滚
          if (connection) {
            try {
              await connection.rollback()
              throw e
            } catch (e) {
              throw e
            }
          }
        } finally {
          if (connection) {
            try {
              await connection.close()
            } catch (e) {
              throw e
            }
          }
        }
      }catch (e) {
        reject(e)
      } finally {
        await pool.close()
      }
    })
  }
  
  /**
   * sql执行多次
   * @param sql
   * @param binds []
   * @param options
   */
  multiSql (sql, binds = [], options) {
    return new Promise(async (resolve, reject) => {
      let pool
      try {
        pool = await this.createPool()
        let connection
        try {
          connection = await this.createConnection(pool)
          const data = await connection.executeMany(sql, binds, options).catch(async e => {
            if (connection) {
              await connection.rollback()
              throw e
            }
          })
          // 提交事务
          await connection.commit()
          resolve(data)
        } catch (e) {
          throw e
        } finally {
          if (connection) {
            try {
              await connection.close()
            } catch (e) {
              throw e
            }
          }
        }
      } catch (e) {
        throw e
      } finally {
        await pool.close()
      }
    })
  }
}

const oracle = new Oracle();

module.exports = {
  async query(sql, mapping, params, options) {
    return await oracle.query(sql, mapping, params, options);
  },
  async insert (sql, params, options) {
    return await oracle.insert(sql, params, options);
  },
  async update (sql, params, options) {
    return await oracle.update(sql, params, options);
  },
  async del (sql, params, options) {
    return await oracle.delete(sql, params, options);
  },
  async oracleTrans (sqlParams) {
    return await oracle.oracleTrans(sqlParams)
  },
  async multiSql (sql, binds, options) {
    return await oracle.multiSql(sql, binds, options)
  },
  async pageSql(sql, page, pageNum, mapping, params, options) {
    const newParams = {...params,
      maxRow:page * pageNum,
      minRow:(page - 1) * pageNum + 1}
    return await oracle.query(
      `SELECT * FROM (SELECT a.*, ROWNUM ROW_ID
        FROM (${sql}) a
        WHERE ROWNUM <= :maxRow)
        WHERE ROW_ID >= :minRow`,
      mapping,
      newParams,
      options
    )
  }
}