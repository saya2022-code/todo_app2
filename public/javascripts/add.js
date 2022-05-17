//エラーメッセージ
$("#taskName").focusout(function () {
  const current = $(this).val().length;
  if (current < 1) {
    $("#taskName-error").text("文字を入力して下さい").css("color", "red");
  } else if (current > 0) {
    $("#taskName-error").text("");
  }
});
