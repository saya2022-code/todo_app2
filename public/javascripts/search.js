//検索
$("#search-icon").click(async function () {
  let keyword = $("[name=task-search]").val();
  const data = await httpGet(
    "//" + window.location.host + "/api/search/" + keyword
  );
  console.log(data);
  $("ul#task-list").empty();

  let resultString;
  if (data.length === 0) {
    $(".search-result").empty(resultString);
    resultString = `キーワード「${keyword}」に一致するタスクはありませんでした。\n
                  <button onclick="window.location.reload();">戻る</button>`;
    $(".search-result").append(resultString);
  } else {
    $(".search-result").empty(resultString);
    resultString = `キーワード「${keyword}」に一致する${data.length}件のタスクが見つかりました。\n
                  <a href="http://localhost:3333/views">戻る</a>`;

    $(".search-result").append(resultString);

    const list = data.map((item) => {
      console.log(item);

      //日付　年月日変更
      const date = new Date(item.deadline);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const deadline = year + "年" + month + "月" + day + "日";
      // console.log(deadline);

      let categoryClass = item.category_id;
      // console.log(categoryClass);

      //ステータスの値(1~3)を取得し、判定値として使う
      const statusValue = item.task_status;

      //任意のテキストとカラーを入れるため、空の配列を用意する
      var status = "";
      statusClass = "";

      //ステータスの値(1~3)で入れるテキストとカラーを決める
      if (statusValue === 1) {
        status = "未完了";
        statusClass = "category-red";
      } else if (statusValue === 2) {
        status = "進行中";
        statusClass = "category-blue";
      } else if (statusValue === 3) {
        status = "終了";
        statusClass = "category-green";
      }

      //リストを表示
      return `
        <li class="list-groups">
          <div class="row align-items" >
            <div >
              <span class=${statusClass}></span>
            </div>
            <div class="col-2">
              <span>${item.task_name}</span>
            </div>
            <div class="col-2">
              <span>${deadline}</span>
              </div>
            <div class="col-1">
              <span>${item.category_name}</span>
              </div>
            <div class="col-1.5">
              <span>${status}</span>
              </div>
              <div class="col-2.5" style="margin-left: 20px;">
              <span><button type="button" class="btn btn-primary "data-toggle="modal" data-target="#altermodal" id="altermodal-get" data-id=${item.id}>更新</button></span>
              <span><button id="delete-button" data-id="${item.id}" data-delete="${item.task_name}" class="btn btn-danger" data-toggle="modal"  data-target="#deletemodal">削除</button></span>
            </div>

            <div class="col-2" >
              <span class="small text-muted">メモ：</span>
              <textarea rows="3" cols="30">${item.memo}</textarea>
            </div>
          </div>
        </li>`;
    });
    console.log(list); //取得
    //ulタグにlistを追加

    $("ul#task-list").append(list);
  }
});
