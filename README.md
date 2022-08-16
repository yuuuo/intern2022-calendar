# インターン用テンプレートリポジトリ

## 環境構築

### Nodeのセットアップ

1. [こちら](https://docs.volta.sh/guide/getting-started)のページに沿ってセットアップを行う。  
Windows: Windows Installation  
Mac: Unix Installation  
をのところを確認する。  

## エディタのセットアップ

ここではVisual Studio Codeを使用することを想定しているが、任意のエディタを使用して問題ない。

1. [Visual Studio Code](https://code.visualstudio.com/download)(以下、VS Code)をインストールする。
1. VS Codeを開き、以下の拡張機能をインストールする。  
[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)  
[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)  

### パッケージのインストール

1. リポジトリをクローンしたディレクトリでターミナルを開き、以下のコマンドを実行する。  
(VS Codeの場合、クローンしたディレクトリを開き、VS Code内のターミナルを利用しても良い。)  
`npm i`

1. 以下のコマンドを実行する。  
`npm run dev`

1. ブラウザで <http://localhost:5173/> にアクセスする。
1. Vite + Reactと表示されればセットアップ完了。
