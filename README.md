PCポータル

・本アプリは、HTML、JavaScript入門を目的として作成しました。
・PC上に分散するテキストドキュメントの参照をひとまとめに閲覧できます。

■用途
・ローカルPC上の各所に分散した、仕事およびプライベートの情報の集約。
　「この情報を見たいんだけど、どこだったかなあ・・・」の改善。
　「この情報を見たいんだけど、エクスプローラーで見ると階層下がって、下がって、下がって・・・面倒だなあ」の改善。
・スケジュールやTODOタスクといった、日々変わる情報の参照と編集。

■機能
・ドキュメント管理
　・指定ドキュメントの表示
　　・参照したいドキュメントを画面上に配置。
　　・対象はテキスト、HTML、MD(MarkDown)
　　　テキストはBOM付きUTF-8であること。
　　・クリックしたドキュメントを疑似ダイアログ上に表示。
　　・クリックしたドキュメントを別ウィンドウに表示。
　・指定ドキュメント編集
　　・クリックしたドキュメントをテキストエディタで開く。
　・エクスプローラを開く
　　・クリックしたドキュメントが存在する場所をエクスプローラで開く。
　・任意ドキュメントの表示
　　・任意のファイルを選択して疑似ダイアログ上に表示。
　　　テキストはBOM付きUTF-8であること。

・常用情報通知
　・通知の表示
　　・備忘や周知事項等、常に表示しておきたい内容を表示。
　　・テキストエディタで内容を編集。
　・スケジュールの表示
　　・当日以降のスケジュールを表示。
　　・テキストエディタで内容を編集。
　・タスクの表示
　　・TODOタスクを表示。
　　・各項目にチェックボックスを設け、チェックした項目を非表示にすることが可能。
　　・チェック情報を記憶。
　　・テキストエディタで内容を編集。

・カスタマイズ
　・メニュー上のアイコンクリックで設定項目を表示。
　・疑似ダイアログの文字サイズを設定。
　・常用情報通知領域の高さを設定。
　・スケジュールの表示期間を設定(本日からｘｘ日間までの内容）
　・タスクのチェック済項目の表示/非表示を設定。
　・Cookieに記憶したタスクのチェック情報を削除。

■アプリケーションの説明
・条件
　・OS：Windows(動作確認はWindows10 Home)

・アプリケーションの構成
　(※)は、ユーザ側で用意するデータ。
　・HTMLファイル
　　・resources/app/index.html：PCポータル画面
　・画像ファイル
　　・resources/app/resources/images/各種PNG：画面のアイコン素材
　・CSSファイル
　　・resources/app/resources/style.css：スタイルシート全般
　・JSファイル
　　・resources/app/resources/common.js：JavaScript処理全般
　　・resources/app/resources/expansionUtil.js：Electron固有の処理（ファイル操作、アプリ実行）
　　・resources/app/resources/marked.min.js：MarkEd.js。MDをHTMLへ変換
　　　（https://github.com/markedjs/marked）
★★★★★★★
　・データテキストファイル
　　・resources/app/data/readme.txt：アプリケーションの説明を記載したファイル。
　　(※)resources/app/data/motice.txt：常用情報の「通知」に表示する内容を格納する。
　　(※)resources/app/data/schedule.txt：常用情報の「スケジュール」に表示する内容を格納する。
　　(※)resources/app/data/task.txt：常用情報の「タスク」に表示する内容を格納する。
　・データJSファイル
　　(※)resources/app/data/content.js：常用情報の「通知」に表示する内容を格納する。

・ユーザ側で用意するデータ。
　・data/content.js に以下を定義する。
　　・コンテンツグループの定義
　　・コンテンツの定義
　　・常用情報の「通知」に表示するファイル
　　・常用情報の「スケジュール」に表示するファイル
　　・常用情報の「タスク」に表示するファイル
　　・編集、エクスプローラコマンド
　・コンテンツグループの定義
　　・以下のように、contentObjectGroupMapInitにMapオブジェクトと設定する。
　　　キー：固定で、「content_group_100」から「content_group_900」まで。
　　　値・label：画面に表示するグループ名
　　　値・element：グループ内のコンテンツのコード値。「コンテンツの定義」で定義した値であること。
        exports.contentObjectGroupMapInit = function() {
            let gmap = new Map();
            gmap.set("content_group_100", {label:"プライベート", element:["content_101", "content_102"]});
            gmap.set("content_group_200", {label:"仕事", element:["content_201", "content_202", "content_203"]});
            gmap.set("content_group_300", {label:"", element:[]});
            gmap.set("content_group_400", {label:"", element:[]});
            gmap.set("content_group_500", {label:"", element:[]});
            gmap.set("content_group_600", {label:"", element:[]});
            gmap.set("content_group_700", {label:"", element:[]});
            gmap.set("content_group_800", {label:"", element:[]});
            gmap.set("content_group_900", {label:"", element:[]});
            return gmap;
        }
　・コンテンツの定義
　　・以下のように、contentObjectMapInitにMapオブジェクトと設定する。
　　　キー：任意の値。ただしcontent_001からcontent_004は予約している。
　　　値・type：コンテンツの種類。plain、html、markdownのいずれか。
　　　値・label：画面に表示するコンテンツ名
　　　値・pathAbs：path定義が絶対パスの場合はtrue、falseでは「exeが存在するパス/resources/app」を起点とする。
　　　値・path：コンテンツのファイルパス。
        exports.contentObjectMapInit = function() {
            let cmap = new Map();
            cmap.set("content_001", {type:"plain", label:"", pathAbs: false, path:"data\\notice.txt"});
            cmap.set("content_002", {type:"plain", label:"", pathAbs: false, path:"data\\schedule.txt"});
            cmap.set("content_003", {type:"plain", label:"", pathAbs: false, path:"data\\task.txt"});
            cmap.set("content_004", {type:"plain", label:"", pathAbs: false, path:"data\\readme.txt"});
            cmap.set("content_101", {type:"auto", label:"TODOリスト", pathAbs: false, path:"samplefiles\\プライベートTODO.txt"});
            cmap.set("content_102", {type:"auto", label:"家計簿", pathAbs: false, path:"samplefiles\\家計簿.md"});
            cmap.set("content_201", {type:"auto", label:"TODOリスト", pathAbs: false, path:"samplefiles\\仕事TODO.txt"});
            cmap.set("content_202", {type:"auto", label:"プロジェクト計画書", pathAbs: false, path:"samplefiles\\プロジェクト計画書.html"});
            cmap.set("content_203", {type:"auto", label:"プロジェクト進捗表", pathAbs: false, path:"samplefiles\\プロジェクト進捗表.html"});
            return cmap;
        }
　・常用情報の「通知」に表示するファイル
　　・上記「コンテンツの定義」のキーcontent_001で定義したファイル。
　　・HTML形式で任意の内容を記述する。
　・常用情報の「スケジュール」に表示するファイル
　　・上記「コンテンツの定義」のキーcontent_002で定義したファイル。
　　・以下のように年月日時分秒=スケジュール内容 という書式で定義する。
        20190301000000=スポーツクラブへ入会手続き
        20191218191500=自社の忘年会
        20200520183000=〇〇さんとイタリアン☆☆で夕食
        20200917070000=自社の健康診断
        20201028210000=夜間作業
        20210101083000=△△さんと初詣
        20220429000000=帰省
　・常用情報の「タスク」に表示するファイル
　　・上記「コンテンツの定義」のキーcontent_003で定義したファイル。
　　・以下のように5桁の連番=タスク内容 という書式で定義する。
        0001=薬局へ行く
        0002=〇〇さんへお礼のメールする
        0003=コンビニで公共料金の支払い
        0004=△△サイトのブログチェック
        0005=イタリアン☆☆を予約
　・編集、エクスプローラコマンド
　　・以下のように、commandObjectにエクスプローラとテキストエディタのコマンドを定義する。
        exports.commandObject = {
            explorer:"explorer",
            editor:"notepad",
        };

■バージョン情報
・バージョン1.0.0
　　2020/11/08 新規作成


# Lisence

This project is licensed under the MIT License, see the LICENSE.txt file for details
