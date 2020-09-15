$(function() {
  //一文字以上文字があるとHTMLを発火する
  function addUser(user) {
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `;
    $("#UserSearchResult").append(html);
  }
//文字が空の時のHTML発火
  function addNoUser() {
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>
                `;
    $("#UserSearchResult").append(html);
  }
  // addDelete定義
  function  addDeleteUser(name, id){
    let html = `
      <div class="ChatMember">
        <p class="ChatMember__name">${name}</p>
        <input name="group[user_ids][]" type="hidden" value="${id}" />
        <div class="ChatMember__remove ChatMember__button">削除</div>
      </div>
      `;
      $(".js-add-user").append(html);
    }
    //addmember定義：user_idをcontrollerへ送る
  function addMember(userId,userName) {
    let html = `
      <div class="ChatMember">
      <p class="ChatMember__name">${userName}</p>
      <input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />
      <div class="ChatMember__remove ChatMember__button">削除</div>
      </div>
      `;
    $(".ChatMembers").append(html);
  }
  //文字入力による検索内容表示（親要素へ指定）
  $("#UserSearch__field").on("keyup", function() {
    //チャットメンバーに入力した内容を取得
    let input = $("#UserSearch__field").val();

    //user_contoroller.rbへ送る情報設定
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    //非同期通信成功時の表示内容
    //index.json.jbuilderデータをusersで受け取り
    .done(function(users) {

      //chatmemberに入力した情報を空に戻す（親要素へ指定）
      $("#UserSearchResult").empty();
      //一文字以上入力時処理
      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      //入力が文字数が０の時
      } else if (input.length == 0) {
        return false;
      } else {
        //addNoUser();を発火する
        addNoUser();
      }
    })
    //非同期通信失敗時処理
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });
  // 追加ボタンを押した際の処理
  // $(document).onでhtmlの情報を取得(appendさせた情報を取得)
  // .chat-group-user__btn--add(追記ボタン)を押すと88行目以降が発火
  $(document).on('click', ".ChatMember__add", function(){
    //追加ボタンの対象のユーザー情報を変数userName・userIdに代入
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");

    $(this)
    //今押した追加ボタンの親要素取得
      .parent()
    //検索結果からremoveメソッドで親要素（chat-group-user cleafix）削除
      .remove()
    //新メンバー追加(function addDeleteUser(name, id) の呼び出し)
      addDeleteUser(userName, userId);
    //(function addMember(userId)の呼び出し)
      addMember(userId,userName);
  });

   //chatmemberに追加したmember削除
  $(document).on("click", ".ChatMember__remove", function() {
    $(this)
    .parent()
    .remove();
  });
});