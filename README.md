# GATの期限教えるくん

## Special Thanks

- https://www.ykicchan.dev/posts/2020-07-12
- https://github.com/yKicchan/SLACK_APP_GAS_TS_SAMPLE

## 概要

GAS を TypeScript で動かすプロジェクト
Webpack + babel を使うことで、 npm に公開されている便利なパッケージを使える

`entrypoint` 関数をGAS のトリガーを使って任意のスクリプトを定期実行する設定を行っている

- 文言をまとめているスプレッドシート
  - https://docs.google.com/spreadsheets/d/12_RxCwFdKcK97RtivIVPQR-SfahC723xOxB98zml8eE/edit#gid=0

## 構成

- src
  - スクリプトはここ以下に置く
  - `src/index.ts` で、GAS で実行したい関数を `global` に登録してあげる
- dist
  - Webpack + babel でのビルド成果物
  - ここにあるものが GAS に `push` される

## Install

```bash
$ yarn install
```

## Deploy

```bash
$ yarn deploy
```
