# discordjs_test_v13
## 起動までの手順
### コマンドを更新した場合
コマンドをdiscordに反映するためにdeploy-commands.jsを実行してください。
```
node deploy-commands.js
```
管理者専用コマンドを追加した場合はコマンドIDを取得してconfig.jsonに書き込む必要があります。
getCommandsList.jsを実行し任意のコマンドのIDをコピーしましょう。
```
node getCommandsList.js
```
config.json内のcommandIDにある任意のコマンドの部分にIDをペーストしてください。
そうすればコマンド更新/権限設定の準備は終了です。
### Botの起動
```
node index.js
```
で起動できます。
## コマンドを自分で作る場合
commandsディレクトリに任意のコマンド名のjsファイルを作りましょう。中には他ファイルを見て書き込みましょう。形式は統一化されています。
