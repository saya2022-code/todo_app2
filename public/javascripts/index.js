// 取得用API実行メソッド
const httpGet = async function (url) {
  try {
    const response = await fetch(url, {
      method: "GET", // GET
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

// 登録用API実行メソッド
//⑧ api/index.jsの「APIエンドポイント」と「body(= req.body)」を変数(url,data)に入れる
const httpPost = async function (url, data) {
  console.log(url); //localhost:3333/api/tasks
  console.log(data); //{taskName: '１２３', deadline: '2022-05-06', category: '1'}=req.body
  try {
    const response = await fetch(url, {
      //url(APIエンドポイント)を取得
      method: "POST", // POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), //data(req.body)をJSON型にし、bodyに入れる
    });
    return response.json(); //⑨JSONのresponse(url,method,data)を JavaScriptのオブジェクトに変換
  } catch (err) {
    console.log(err);
  }
}; //⑩エラーがなかったら、index.htmlでhttpPost関数を使用する。→index.html（265行目）へ

// 更新用API実行メソッド
const httpUpdate = async function (url, data) {
  try {
    const response = await fetch(url, {
      method: "PATCH", // PATCH
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json(); // JSON のレスポンスを JavaScript のオブジェクトに変換
  } catch (err) {
    console.log(err);
  }
};

// 削除用API実行メソッド
const httpDelete = async function (url) {
  try {
    const response = await fetch(url, {
      method: "DELETE", // DELETE
    });
    return response.json(); // JSON のレスポンスを JavaScript のオブジェクトに変換
  } catch (err) {
    console.log(err);
  }
};

//未処理タスクの取得メソッド
const getTasks_yet = async function (url) {
  try {
    const response = await fetch(url, {
      method: "GET", // GET
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
