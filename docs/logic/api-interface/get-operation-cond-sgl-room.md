## 名前
運転状況（各室）取得API

## 概要

対象室の全機器の運転状況を取得する。

- 設定ごとの現在値
- 設定ごとの設定値
- エラー情報

## パス

`/api/ope-cond/rooms/{room-id}`

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
|トップ|apparatus|配列|各機器情報|
|apparatus|id|string|-|
|apparatus|condition|配列|各設定情報|
|condition|name|string|-|
|condition|current|any|現在値|
|condition|set-point|any|設定値|
|apparatus|error|オブジェクト|エラー情報|
|error|isError|boolean|エラー発生有無|
|error|content|string|エラー内容|

### サンプル

```json
{
    "apparatus": [
        {
            "id": "ap001",
            "condition": [
                {
                    "name": "power-onoff",
                    "current": true,
                    "set-point": true
                },
                {
                    "name": "illuminance",
                    "current": 500,
                    "set-point": 600
                }
            ],
            "error": {
                "isError": true,
                "content": "disconnection"
            }
        },
        {
            "id": "ap002",
            "condition": [
                {
                    "name": "power-onoff",
                    "current": true,
                    "set-point": true
                },
                {
                    "name": "temperture",
                    "current": 32.5,
                    "set-point": 28.0
                },
                {
                    "name": "humidity",
                    "current": 46.0,
                    "set-point": 50.0
                }
            ],
            "error": {
                "isError": false,
                "content": ""
            }
        },
        {
            "id": "ap003",
            "condition": [
                {
                    "name": "power-onoff",
                    "current": true,
                    "set-point": true
                },
                {
                    "name": "temperture",
                    "current": 50.0,
                    "set-point": 55.0
                }
            ],
            "error": {
                "isError": false,
                "content": ""
            }
        }
    ]
}
```