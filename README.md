## userテーブル
|Column|Type|Option|
|------|----|------|
|name|strings|null: false, unique: true|
|emil|strings|null: false, unique: true|
|password|strings|null: false|

### Association
has_many :group_user
has_many :message


## messageテーブル
|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_kye: true|
|body|text|
|image|strings|

### Association
belongs_to :user
belongs_to :group

## groupテーブル
|Column|Type|Option|
|------|----|------|
|group_name|strings|null: false, unique: true|

### Association
has_many :user
has_many :group_user
has_many :message


## groups_usersテーブル

|Column｜Type|Options|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null :false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
