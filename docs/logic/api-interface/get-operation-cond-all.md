## 名前
運転状況（全機器）取得API

## 概要

全室全機器のエラー発生有無のリストを取得する

## パス

`/api/ope-cond/rooms`

## メソッド

GET

## パラメータ

### 内容

|オブジェクト|パラメータ|型|内容|
|--|--|--|--|
|-|-|-|-|

## レスポンス

### 形式

JSON

### 内容

|オブジェクト|パラメータ|型|内容|
|--|--|--|--|
|トップ|rooms|配列|各室情報|
|rooms|id|string|-|
|rooms|apparatus|配列|各機器情報|
|apparatus|id|string|-|
|apparatus|error|オブジェクト|エラー情報|
|error|isError|boolean|エラー発生有無|

### サンプル

```json
{
    "rooms":[
        {
            "id":"room101",
            "apparatus":[
                {"id":"ap001","error":{"isError":false}},
                {"id":"ap002","error":{"isError":false}},
            ]
        },
        {
            "id":"room201",
            "apparatus":[
                {"id":"ap001","error":{"isError":true}},
                {"id":"ap002","error":{"isError":false}},
                {"id":"ap003","error":{"isError":false}},
            ]
        }
    ]
}
```