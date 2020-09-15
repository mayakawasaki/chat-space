class Api::MessagesController < ApplicationController
  def index
        # ルーティング設定によりparamsにgroup_idキーでグループのidが入る、これを元にDBからグループ取得
        group = Group.find(params[:group_id])
        # ajaxで送られてくる最後のメッセージのid番号を変数に代入
        last_message_id = params[:id]
        # 取得したグループでのメッセージ達から、idがlast_message_idよりも新しい(大きい)メッセージ達のみを取得
        @messages = group.messages.includes(:user).where("id > ?", last_message_id)

  end
end