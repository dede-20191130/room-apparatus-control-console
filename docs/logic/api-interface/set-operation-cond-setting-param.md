## 名前
運転状況（対象機器）設定値設定API

## 概要

対象室の単体機器の運転状況の設定値を設定する。

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
|トップ|conditions|配列|各設定情報|
|conditions|name|string|-|
|conditions|set-point|any|設定値|

### サンプル

```json
{
    "conditions": [
        {
            "name": "power-onoff",
            "set-point": true
        },
        {
            "name": "illuminance",
            "set-point": 600
        }
    ]
}
```

## レスポンス

### 形式

ステータスコード

### 内容

|ステータスコード|意味|
|--|--|
|204|成功|
|409|パッチの失敗（リソースのロック中など）|
