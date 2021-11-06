## 名前
部屋情報取得API

## 概要

各室の部屋番号、機器種類（静的データ）を返す。

## パス

`/api/info/rooms`

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
|apparatus|name|string|機器論理名|
|apparatus|settingType|string|設定タイプ|

### サンプル
```json
{
    "rooms": [
        {
            "id": "room101",
            "apparatus": [
                {
                    "id": "ap001",
                    "name": "照明機器",
                    "settingType": "lighting"
                },
                {
                    "id": "ap002",
                    "name": "エアコン",
                    "settingType": "air-conditioner"
                }
            ]
        },
        {
            "id": "room201",
            "apparatus": [
                {
                    "id": "ap001",
                    "name": "照明機器",
                    "settingType": "lighting"
                },
                {
                    "id": "ap002",
                    "name": "エアコン",
                    "settingType": "air-conditioner"
                },
                {
                    "id": "ap003",
                    "name": "床暖房",
                    "settingType": "floor-heating"
                }
            ]
        }
    ]
}
```