$(function() {
  function buildHTML(message) {
    if ( message.image ) {
        let html =
          `<div class="message-box" data-message-id=${message.id}>
            <div class="message-info">
              <div class="message-name">
                ${message.user_name}
              </div>
              <div class="message-date">
                ${message.created_at}
              </div>
            </div>
            <div class="message">
              <p class="message-content">
                ${message.content}
              </p>
              <img class="Message__image" src="${message.image}">
            </div>
          </div>`
        return html;
      } else {
        let html =
        `<div class="message-box" data-message-id=${message.id}>
          <div class="message-info">
            <div class="message-name">
              ${message.user_name}
            </div>
            <div class="message-date">
              ${message.created_at}
            </div>
          </div>
          <div class="message">
            <p class="message-content">
              ${message.content}
            </p>
          </div>
        </div>`
        return html;
      };
    }
  let reloadMessages = function() {
    //カスタム属性を使用、ブラウザーに表示された最後（最新の）メッセidを取得
    let last_message_id = $('.message-box:last').data("message-id") || 0;
    $.ajax({
      //ルーティング設定のURL文字列記入
      url: "api/messages",
      //ルーティングで設定したhttpメソッド
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        let insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          console.log(i, message)
          insertHTML += buildHTML(message)
        });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.chat-main__message-list').append(insertHTML);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
    //秒ごとにメッセージ更新を確認する処理
    setInterval(reloadMessages, 7000);
});