//エラーメッセージ
$("#taskName").focusout(function () {
  const current = $(this).val().length;
  if (current < 1) {
    $("#taskName-error").text("文字を入力して下さい").css("color", "red");
  } else if (current > 0) {
    $("#taskName-error").text("");
  }
});

// const array1 = Array.from(new Set(listyet));
// console.log(array1);

// $("#tab3").on("click", async function () {
// $('ul#task-list-yet').show(array1);
// });

// $("#tab3").on("click", async function () {
//   $('li:contains("終了"),li:contains("未完了")').hide();
//   $("ul#task-list").show(array1);
// });

// $("#tab1").on("click", async function () {
//     $('ul#task-list').remove(listyet);
//     });
