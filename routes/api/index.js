var express = require("express");
var router = express.Router();

const tasks = require("../../src/tasks.js");

/* タスクを登録するルーティング */
router.post("/tasks", async function (req, res, next) {
  const postTasks = await tasks.postTasks(req.body);
  res.send(postTasks);
});

/* タスク一覧を取得するルーティング*/
router.get("/tasks", async function (req, res, next) {
  const getTasks = await tasks.getTasks();
  res.send(getTasks);
});

/* タスク一覧を削除するルーティング */
router.delete("/tasks/:id", async function (req, res, next) {
  const deleteTasksId = await tasks.deleteTasksId(req.params.id);
  res.send(deleteTasksId);
});

/* タスクを1件取するルーティング */
router.get("/tasks/:id", async function (req, res, next) {
  const getTasksId = await tasks.getTasksId(req.params.id);
  res.send(getTasksId);
});

/* タスクを1件更新するルーティング */
router.patch("/tasks/:id", async function (req, res, next) {
  console.log(req.param.id);
  const patchTasksId = await tasks.patchTasksId(req.params.id, req.body);
  res.send(patchTasksId);
});

module.exports = router;
