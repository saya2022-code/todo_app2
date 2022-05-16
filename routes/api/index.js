//Express＝Node.jsでWebアプリの開発をするためのフレームワーク
var express = require("express");
var router = express.Router();

//①task.jsのpostTasks(SQL処理)などを使うため、読み込む
const tasks = require("../../src/tasks.js");
// const lists = require("../../src/lists.js");

/* タスクを登録するルーティング */
//②router(=express).HTTPメソッド(APIエンドポイントパス,非同期(req,res,next関数))
router.post("/tasks", async function (req, res, next) {
  //③tasks.jsでexports.postTasksしているので、「tasks.postTasks(reqされたbody)」で取得し、変数(postTasks)に代入
  //req.body = tasks.jsの11行目「async function (body) 〜」のbody
  const postTasks = tasks.postTasks(req.body);

  //④req.bodyをresする。次にtasks.jsでSQLの設定へ
  // console.log(postTasks);
  res.send(postTasks); //index.htmlで読み込んだら使える
});

/* タスク一覧を取得するルーティング*/
//②router(=express).HTTPメソッド(APIエンドポイントパス,非同期(req,res,next関数))
router.get("/tasks", async function (req, res, next) {
  //③tasks.jsでexports.getTasksしているので、「tasks.getTasks()」で取得し、変数(getTasks)に代入
  const getTasks = await tasks.getTasks();

  res.send(getTasks);
});

/* タスク一覧を削除するルーティング */
// router.delete("/tasks/:id", async function (req, res, next) {
//   const deleteTasksId = await tasks.deleteTasksId(req.params.id);
//   res.send(deleteTasksId);
// });
router.delete("/tasks/:id", async function (req, res, next) {
  const deleteTasksId = tasks.deleteTasksId(req.params.id);

  res.send(deleteTasksId);
});

/* タスクを1件取するルーティング */
//②router(=express).HTTPメソッド(APIエンドポイントパス,非同期(req,res,next関数))
router.get("/tasks/:id", async function (req, res, next) {
  const getTasksId = await tasks.getTasksId(req.params.id);
  console.log(getTasksId); //

  res.send(getTasksId);
});

/* タスクを1件更新するルーティング */
router.patch("/tasks/:id", async function (req, res, next) {
  const patchTasksId = await tasks.patchTasksId(req.params.id, req.body);
  console.log(req.param.id);

  res.send(patchTasksId);
});
module.exports = router;
