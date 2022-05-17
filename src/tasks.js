// 新規登録処理

const mysql = require("mysql2/promise");
const config = require("../config.js");

/**
 * タスクを新規登録する API
 *
 * @returns レスポンス JSON
 */

//⑤ 13~20行、33~40行は決まり文句のコード。変わるのはSQLの記述のみ
postTasks = async function (body) {
  console.log(body);

  let connection = null; //DB接続の初期化
  try {
    //維持ならtryの処理(SQL)をする

    //SQL接続
    connection = await mysql.createConnection(config.dbSetting);

    // ⑥ここに SQL を記述する(DBに登録なのでInsert)
    const sql =
      "INSERT INTO todo_app２.t_task (task_name, deadline, category_id, memo) VALUES (?,?,?,?);";
    // VALUES (?,?,?)は下の「body.taskName」の値が入る
    let d = [body.taskName, body.deadline, body.category, body.memo];
    const [rows, fields] = await connection.query(sql, d);

    // console.log(rows); //取得
    // console.log(d); //取得
    //console.log(fields); //undefined

    //⑦fieldsはundefinedなので、rowsのみを返す。
    //次はjavascript/index.jsでindex.htmlにAPIを反映させる準備
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

/**
 * タスクを一覧取得する API
 *
 * @returns レスポンス JSON
 */
getTasks = async function () {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql =
      "SELECT t_task.id, t_task.category_id, m_category.category_name, t_task.task_name, t_task.deadline, t_task.task_status, t_task.updated_at, t_task.created_at, t_task.memo FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id order by deadline;";
    const [rows, fields] = await connection.query(sql);

    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

/**
 * タスクを削除する API
 *
 * @returns レスポンス JSON
 */
deleteTasksId = async function (id) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql = "DELETE from t_task WHERE id = ?;";
    let d = [id];
    const [rows, fields] = await connection.query(sql, d);

    // console.log(rows);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

/**
 * タスクを１件取得する API
 *
 * @returns レスポンス JSON
 */
getTasksId = async function (id) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    // const sql =
    //   "SELECT t_task.id, t_task.category_id, m_category.category_name, t_task.task_name, t_task.deadline, t_task.task_status, t_task.updated_at, t_task.created_at FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id WHERE t_task.id = ?";
    // let d = [id];
    // const [rows, fields] = await connection.query(sql, d);
    const sql =
      "SELECT t_task.id, t_task.category_id, m_category.category_name, t_task.task_name, t_task.deadline, t_task.task_status, t_task.updated_at, t_task.created_at, t_task.memo FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id WHERE t_task.id = ?";
    let d = [id];
    const [rows, fields] = await connection.query(sql, d);
    // console.log(rows); //取得
    // console.log(d); //取得
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

/**
 * タスクを１件更新する API
 *
 * @returns レスポンス JSON
 */
patchTasksId = async function (id, body) {
  //api/index.jsの(req.params.id, req.body)を変数に代入
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    // ここに SQL を記述する
    const sql =
      "UPDATE t_task SET task_name=?, deadline=?, category_id=?, task_status=?, updated_at=?, memo=? WHERE id=?;";

    let d = [
      //sqlで「?」となるカラム名を指定
      body.taskName,
      body.deadline,
      body.category,
      body.status,
      new Date(),
      body.memo,
      id,
    ];
    const [rows, fields] = await connection.query(sql, d);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

//個々のステータス取得API ※
getTasks_status = async function (id) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    //ここにsqlを記述する↓
    const sql =
      "SELECT t_task.id, t_task.category_id, m_category.category_name, t_task.task_name, t_task.deadline, t_task.task_status, t_task.updated_at, t_task.created_at, t_task.memo FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id WHERE  t_task.task_status = 1  order by deadline;";
    const [rows, fields] = await connection.query(sql, id);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

//タスクをキーワードで検索して返却する処理
searchItem = async function (keyword) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    //ここにsqlを記述する↓
    const sql =
      "SELECT * FROM t_task LEFT JOIN m_category ON t_task.category_id = m_category.id WHERE task_name LIKE ?";
    keyword = "%" + keyword + "%";
    let data = [keyword];
    const [rows, fields] = await connection.query(sql, data);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.searchItem = searchItem;
exports.getTasks_status = getTasks_status;

exports.getTasks = getTasks;
exports.postTasks = postTasks;
exports.deleteTasksId = deleteTasksId;
exports.getTasksId = getTasksId;
exports.patchTasksId = patchTasksId;
