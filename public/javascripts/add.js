// $(async function () {
//   const data = await httpGet("//" + window.location.host + "/api/tasks");
//   let cntComp = 0;
//   const lists = data.map((item) => {
//     console.log(item);

//     //ステータスのvalueをテキストに変える
//     const statusValue = item.task_status;
//     var status = "";
//     var statusClass = "";

//     if (statusValue == 1) {
//       status = "未完了";
//       statusClass = "status-red";
//       //  document.getElementById("td-head").style.backgroundColor ='red'
//     } else if (statusValue == 2) {
//       status = "進行中";
//       statusClass = "status-blue";
//     } else if (statusValue == 3) {
//       status = "終了";
//       statusClass = "status-green";
//       cntComp += 1;
//     }
//     // console.log(cntComp);
//     console.log(status);
//   });
// });
