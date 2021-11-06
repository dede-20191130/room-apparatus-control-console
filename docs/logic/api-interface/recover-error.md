## 名前
エラー復旧API

## 概要

指定された機器のエラーを復旧する。

## パス

`/api/ope-cond/rooms/{room-id}/apparatus/{apparatus-id}`

## メソッド

PATCH

## パラメータ

### 形式

JSON

### 内容

|オブジェクト|パラメータ|型|内容|
|--|--|--|--|
|トップ|recover|boolean|true|

## レスポンス

### 形式

JSON

### 内容

|オブジェクト|パラメータ|型|内容|
|--|--|--|--|
|トップ|name|string|機器論理名|
|トップ|error|オブジェクト|エラー情報|
|error|isError|boolean|エラー発生有無|

### サンプル
```json
{
    "id": "ap001",
    "error": {
        "isError": false
    }
}
```