//エラーメッセージ
// var $taskNames = $("#taskName, #task");

$("#taskName, #task").focusout(function () {
  const current = $(this).val().length;
  if (current < 1) {
    $("#taskName-error").text("文字を入力して下さい").css("color", "red");
  } else if (current > 0) {
    $("#taskName-error").text("");
  }
});

// 絞り込み
//①未処理タスクを表示
$("#tab2").on("click", async function () {
  const status_id = $("#panel2").data("id");
  console.log($("#panel2").data("id")); //2

  const response = await getTasks_yet(
    "//" + window.location.host + "/api/tasks/status/" + status_id
  );

  const list = response.map((item) => {
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
    var list_coler = "";

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

    const today = new Date();
    const tyear = today.getFullYear();
    const tmonth = today.getMonth() + 1;
    const tday = today.getDate();
    const tdeadline = tyear + "年" + tmonth + "月" + tday + "日";
    // console.log(tdeadline);
    // console.log(deadline);

    if (deadline == tdeadline && !(item.task_status == 3)) {
      list_coler = "list-group-item-warning";
    } else if (deadline < tdeadline && !(item.task_status == 3)) {
      list_coler = "list-group-item-danger";
    }

    //リストを表示
    return `
          <li class="list-groups list-group-item-action ${list_coler}">
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

          <!-- 折りたたみ展開エリア -->
            
              <!-- 折りたたみ展開ボタン -->
              <div class="col-2">
                <div onclick="obj=document.getElementById('${item.id}').style; obj.display=(obj.display=='none')?'block':'none';">
                  <a style="cursor:pointer;" class="text-muted">▼ メモ表示</a>
                </div>
              </div>
              <!--// 折りたたみ展開ボタン -->
              <!-- ここから先を折りたたむ -->
              <div id="${item.id}" style="display:none;clear:both;">
                <div class="">
                  <span class="small text-muted">　</span>
                  <textarea rows="3" cols="30">${item.memo}</textarea>
                </div>
                <!--この部分が折りたたまれ、展開ボタンをクリックすることで展開します。-->
                </div>
                <!--// ここまでを折りたたむ -->
            
            <!--// ここまでがエリア全体 -->

            </div>

          </li>`;
  });
  console.log(list); //取得
  //ulタグにlistを追加
  $("ul#task-list").empty();
  $("ul#task-list").append(list); //ulを使う場合、「.id名」ではなく、「タグ名#クラス名」の方が良い。
});

//②進行中タスクを表示
$("#tab3").on("click", async function () {
  const status_id = $("#panel3").data("id");
  console.log(status_id); //3

  const response = await getTasks_going(
    "//" + window.location.host + "/api/tasks/status/" + status_id
  );
  console.log(response);

  const list = response.map((item) => {
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
    var list_coler = "";

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

    const today = new Date();
    const tyear = today.getFullYear();
    const tmonth = today.getMonth() + 1;
    const tday = today.getDate();
    const tdeadline = tyear + "年" + tmonth + "月" + tday + "日";
    // console.log(tdeadline);
    // console.log(deadline);

    if (deadline == tdeadline && !(item.task_status == 3)) {
      list_coler = "list-group-item-warning";
    } else if (deadline < tdeadline && !(item.task_status == 3)) {
      list_coler = "list-group-item-danger";
    }

    //リストを表示
    return `
          <li class="list-groups list-group-item-action ${list_coler}">
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

          <!-- 折りたたみ展開エリア -->
            
              <!-- 折りたたみ展開ボタン -->
              <div class="col-2">
                <div onclick="obj=document.getElementById('${item.id}').style; obj.display=(obj.display=='none')?'block':'none';">
                  <a style="cursor:pointer;" class="text-muted">▼ メモ表示</a>
                </div>
              </div>
              <!--// 折りたたみ展開ボタン -->
              <!-- ここから先を折りたたむ -->
              <div id="${item.id}" style="display:none;clear:both;">
                <div class="">
                  <span class="small text-muted">　</span>
                  <textarea rows="3" cols="30">${item.memo}</textarea>
                </div>
                <!--この部分が折りたたまれ、展開ボタンをクリックすることで展開します。-->
                </div>
                <!--// ここまでを折りたたむ -->
            
            <!--// ここまでがエリア全体 -->

            </div>

          </li>`;
  });
  console.log(list); //取得
  //ulタグにlistを追加
  $("ul#task-list").empty();
  $("ul#task-list").append(list); //ulを使う場合、「.id名」ではなく、「タグ名#クラス名」の方が良い。
});

//③終了タスクを表示
$("#tab4").on("click", async function () {
  const status_id = $("#panel4").data("id");
  console.log(status_id); //3

  const response = await getTasks_finish(
    "//" + window.location.host + "/api/tasks/status/" + status_id
  );
  console.log(response);

  const list = response.map((item) => {
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
    var list_coler = "";

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

    const today = new Date();
    const tyear = today.getFullYear();
    const tmonth = today.getMonth() + 1;
    const tday = today.getDate();
    const tdeadline = tyear + "年" + tmonth + "月" + tday + "日";
    // console.log(tdeadline);
    // console.log(deadline);

    if (deadline == tdeadline && !(item.task_status == 3)) {
      list_coler = "list-group-item-warning";
    } else if (deadline < tdeadline && !(item.task_status == 3)) {
      list_coler = "list-group-item-danger";
    }

    //リストを表示
    return `
            <li class="list-groups list-group-item-action ${list_coler}">
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
  
            <!-- 折りたたみ展開エリア -->
              
                <!-- 折りたたみ展開ボタン -->
                <div class="col-2">
                  <div onclick="obj=document.getElementById('${item.id}').style; obj.display=(obj.display=='none')?'block':'none';">
                    <a style="cursor:pointer;" class="text-muted">▼ メモ表示</a>
                  </div>
                </div>
                <!--// 折りたたみ展開ボタン -->
                <!-- ここから先を折りたたむ -->
                <div id="${item.id}" style="display:none;clear:both;">
                  <div class="">
                    <span class="small text-muted">　</span>
                    <textarea rows="3" cols="30">${item.memo}</textarea>
                  </div>
                  <!--この部分が折りたたまれ、展開ボタンをクリックすることで展開します。-->
                  </div>
                  <!--// ここまでを折りたたむ -->
              
              <!--// ここまでがエリア全体 -->
  
              </div>
  
            </li>`;
  });
  console.log(list); //取得
  //ulタグにlistを追加
  $("ul#task-list").empty();
  $("ul#task-list").append(list); //ulを使う場合、「.id名」ではなく、「タグ名#クラス名」の方が良い。
});
