import { entrypoint } from "./main";

declare const global: {
  [x: string]: unknown;
};

// ここ以下でglobalオブジェクトのプロパティとして登録した関数のみ、GASから実行可能になる
global.entrypoint = entrypoint;
