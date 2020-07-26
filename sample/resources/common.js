
    var customDialogFontSize = "medium";
    var customNoticeHeight = -1;
    var customScheduleHeight = -1;
    var customTaskHeight = -1;
    var customScheduleDisplayTerm = 360;
    var customTaskDisplayChecked = true;

    // 初期処理
    function init() {
      readCustom();
      readNotice();
      readSchedule();
      readTask();
    }

    // カスタマイズ：ダイアログの文字
    function eventCustomDialogFontSize(input) {
      customDialogFontSize = input.value;
      document.cookie = "customDialogFontSize" + "=" + customDialogFontSize;
    }

    // カスタマイズ：通知領域の高さ
    function eventCustomNoticeHeight(input) {
      var value = parseInt(input.value);
      if (isNaN(value)) {
          document.getElementById("customNoticeHeight").value = customNoticeHeight;
          return;
      }
      customNoticeHeight = value;
      document.cookie = "customNoticeHeight" + "=" + String(value);
      readNotice();
    }

    // カスタマイズ：スケジュール領域の高さ
    function eventCustomScheduleHeight(input) {
      var value = parseInt(input.value);
      if (isNaN(value)) {
          document.getElementById("customScheduleHeight").value = customScheduleHeight;
          return;
      }
      customScheduleHeight = value;
      document.cookie = "customScheduleHeight" + "=" + String(value);
      readSchedule();
    }

    // カスタマイズ：タスク領域の高さ
    function eventCustomTaskHeight(input) {
      var value = parseInt(input.value);
      if (isNaN(value)) {
          document.getElementById("customTaskHeight").value = customTaskHeight;
          return;
      }
      customTaskHeight = value;
      document.cookie = "customTaskHeight" + "=" + String(value);
      readTask();
    }

    // カスタマイズ：スケジュールの表示期間
    function eventCustomScheduleDisplayTerm(input) {
      var value = parseInt(input.value);
      if (isNaN(value)) {
          document.getElementById("eventCustomScheduleDisplayTerm").value = eventCustomScheduleDisplayTerm;
          return;
      }
      customScheduleDisplayTerm = value;
      document.cookie = "customScheduleDisplayTerm" + "=" + String(value);
      readSchedule();
    }

    // カスタマイズ：タスクのチェック状態クリア
    function eventCustomTaskClearCheck() {
      var ret = window.confirm("タスクのチェック状態をクリアしますか？");
      if (ret == false) {
          return;
      }

      // Cookie内のキー先頭"task_"を削除
      var cookieMap = readCookie();
      for (var cookieKey in cookieMap) {
          if (cookieKey.trim().startsWith("task_")) {
              document.cookie = cookieKey.trim() + "=; expires=0";
          }
      }
      readTask();
    }

    // カスタマイズ：タスクのチェック項目を表示
    function eventCustomTaskDisplayChecked(checked) {
      var cookieValue = "";
      if (checked == true) {
          customTaskDisplayChecked = true;
          cookieValue = "on";
      } else {
          customTaskDisplayChecked = false;
          cookieValue = "off";
      }
      document.cookie = "customTaskDisplayChecked" + "=" + cookieValue;
      readTask();
    }

    // カスタマイズ項目を読み込む
    function readCustom() {
      // Cookieの取得
      var cookieMap = readCookie();

      if (cookieMap["customDialogFontSize"] != null) {
          customDialogFontSize = cookieMap["customDialogFontSize"];
      }
      if (cookieMap["customNoticeHeight"] != null) {
          customNoticeHeight = cookieMap["customNoticeHeight"];
      }
      if (cookieMap["customScheduleHeight"] != null) {
          customScheduleHeight = cookieMap["customScheduleHeight"];
      }
      if (cookieMap["customTaskHeight"] != null) {
          customTaskHeight = cookieMap["customTaskHeight"];
      }
      if (cookieMap["customScheduleDisplayTerm"] != null) {
          customScheduleDisplayTerm = cookieMap["customScheduleDisplayTerm"];
      }
      if (cookieMap["customTaskDisplayChecked"] != null) {
          if (cookieMap["customTaskDisplayChecked"] == "on") {
              customTaskDisplayChecked = true;
          } else {
              customTaskDisplayChecked = false;
          }
      }

      // 入力値の設定
      document.getElementById("customDialogFontSize").value = customDialogFontSize;
      document.getElementById("customNoticeHeight").value = customNoticeHeight;
      document.getElementById("customScheduleHeight").value = customScheduleHeight;
      document.getElementById("customTaskHeight").value = customTaskHeight;
      document.getElementById("customScheduleDisplayTerm").value = customScheduleDisplayTerm;
      document.getElementById("customTaskDisplayChecked").checked = customTaskDisplayChecked;
    }

    // 通知領域を読み込む
    function readNotice() {
      // コンテンツを取得し、行単位で分割
      var displayArea = document.getElementById("item_notice");
      var textContent = getContentByObjectTag("content_001", "plain");
      var displayContent = textContent;

      // 高さの設定と表示
      var customHeight = customNoticeHeight;
      const customHeightMin = 20;
      if (customHeight == 0) {
          displayArea.style.display = "none";
      } else if (customHeight < 0) {
          displayArea.style.display = "block";
          displayArea.style.height = "100%";
          displayArea.innerHTML = displayContent;
      } else if (customHeightMin < customHeight) {
          displayArea.style.display = "block";
          displayArea.style.height = customHeight + "px";
          displayArea.innerHTML = displayContent;
      } else {
          displayArea.style.display = "block";
          displayArea.style.height = String(customHeightMin) + "px";
          displayArea.innerHTML = displayContent;
      }
    }

    // スケジュール領域を読み込む
    function readSchedule() {
      // コンテンツを取得し、行単位で分割
      var displayArea = document.getElementById("item_schedule");
      var textContent = getContentByObjectTag("content_002", "plain");
      var textContentArray = textContent.split(/\r\n|\r|\n/);

      // 日付要素
      var nowDate = new Date();
      var nowInt = parseInt(String(nowDate.getFullYear())
          + paddingZero2(nowDate.getMonth() + 1)
          + paddingZero2(nowDate.getDate()) + "000000");

      var endDate = nowDate;
      endDate.setDate(nowDate.getDate() + customScheduleDisplayTerm);
      var endInt = parseInt(String(endDate.getFullYear())
          + paddingZero2(endDate.getMonth() + 1)
          + paddingZero2(endDate.getDate()) + "000000");

      // 表示文字列生成
      var displayContent = "";
      textContentArray.forEach((element, index) => {
          var date = element.substr(0, "yyyyMMddHHddss".length);
          var item = element.substr("yyyyMMddHHddss=".length);
          var dateInt = parseInt(date);

          // 表示判定
          var isDisplay = true;
          if (isNaN(dateInt)) {
              isDisplay = false;
          } else if (dateInt < nowInt) {
               // 現在日より未来の項目を表示
              isDisplay = false;
          } else {
              // 表示期間が設定されている場合は、その期間内のもの
              if (-1 < customScheduleDisplayTerm && endInt < dateInt) {
                  isDisplay = false;
              }
          }

          if (isDisplay == true) {
              displayContent = displayContent + formatDate(date) + " " + item + "<br>";
          }
      });

      // 高さの設定と表示
      var customHeight = customScheduleHeight;
      const customHeightMin = 20;
      if (customHeight == 0) {
          displayArea.style.display = "none";
      } else if (customHeight < 0) {
          displayArea.style.display = "block";
          displayArea.style.height = "100%";
          displayArea.innerHTML = displayContent;
      } else if (customHeightMin < customHeight) {
          displayArea.style.display = "block";
          displayArea.style.height = customHeight + "px";
          displayArea.innerHTML = displayContent;
      } else {
          displayArea.style.display = "block";
          displayArea.style.height = String(customHeightMin) + "px";
          displayArea.innerHTML = displayContent;
      }
    }

    // タスク領域を読み込む
    function readTask() {
      // コンテンツを取得し、行単位で分割
      var displayArea = document.getElementById("item_task");
      var textContent = getContentByObjectTag("content_003", "plain");
      var textContentArray = textContent.split(/\r\n|\r|\n/);

      // Cookieの取得
      var cookieMap = readCookie();

      // チェックボックスの生成
      var displayContent = "";
      textContentArray.forEach((element, index) => {
          var taskid = element.substr(0, "nnnn".length);
          var item = element.substr("nnnn=".length);

          if (taskid != "") {
              // チェック有無の判定
              var isCheck = "";
              if (cookieMap["task_" + taskid] == "on") {
                  isCheck = "checked";
              }

              // チェック済の項目を非表示にする設定の場合は、表示対象外
              if (customTaskDisplayChecked == true || isCheck == "") {
                  displayContent = displayContent
                      + "<input type='checkbox' onchange='checkTask(this.value, this.checked)' value='task_"
                      + taskid + "'" + isCheck + ">" + item + "<br>";
              }
          }
      });

      // 高さの設定と表示
      var customHeight = customTaskHeight;
      const customHeightMin = 20;
      if (customHeight == 0) {
          displayArea.style.display = "none";
      } else if (customHeight < 0) {
          displayArea.style.display = "block";
          displayArea.style.height = "100%";
          displayArea.innerHTML = displayContent;
      } else if (customHeightMin < customHeight) {
          displayArea.style.display = "block";
          displayArea.style.height = customHeight + "px";
          displayArea.innerHTML = displayContent;
      } else {
          displayArea.style.display = "block";
          displayArea.style.height = String(customHeightMin) + "px";
          displayArea.innerHTML = displayContent;
      }
    }

    // タスクのチェック時
    function checkTask(checkValue, checked) {
      // Cookieへ書き込み
      var cookieWrite = "";
      if (checked == true) {
            cookieWrite = checkValue.trim() + "=on";
      } else {
            cookieWrite = checkValue.trim() + "=; expires=0";
      }
      document.cookie = cookieWrite;
    }

    // 設定の表示・非表示
    var isShowCustom = false;
    function showCustom() {
      var customArea = document.getElementById("custom");
      if (isShowCustom == true) {
          isShowCustom = false;
          customArea.style.display = "none";
      } else {
          isShowCustom = true;
          customArea.style.display = "block";
      }
    }

    // ドキュメントのフォルダを開く
    function openContentsFolder(contentId) {
      var textPath = null;
      var id = "content_" + contentId;
      try {
          textPath = sliceDirectory(document.getElementById(id).data);
          if (textPath.startsWith("file:///")) {
              textPath = textPath.substr("file:///".length);
          }
      } catch(e) {
          return;
      }
      location.href = 'pcportal:-ex_' + textPath;
    }

    // ドキュメントを編集する
    function editContents(contentId) {
      var textPath = null;
      var id = "content_" + contentId;
      try {
          textPath = document.getElementById(id).data;
          if (textPath.startsWith("file:///")) {
              textPath = textPath.substr("file:///".length);
          }
      } catch(e) {
          return;
      }
      location.href = 'pcportal:-sk_' + textPath;
    }

    // ドキュメントを別ウィンドウで開く
    function openContentsWindow(contentId) {
      var textPath = null;
      var id = "content_" + contentId;
      try {
          textPath = document.getElementById(id).data;
      } catch(e) {
          return;
      }
      window.open(textPath, id);
    }

    // ファイル選択したドキュメントを疑似ダイアログで開く
    function showDialogFromSelect(input){
      var file = input.files[0];
      var reader = new FileReader();
      reader.onload = () => {
          showDialogCommon(reader.result, "plain");
      };
      reader.readAsText(file);
    }

    // ドキュメントを疑似ダイアログで開く
    function showDialog(contentId) {
      // 表示タイプ
      var id = "content_" + contentId;
      var textPath = document.getElementById(id).data;
      // コンテンツの種類、テキスト、HTML、マークダウンを拡張子で識別
      var ext = textPath.slice((textPath.lastIndexOf('.') - 1 >>> 0) + 2);
      var textType = null;
      if (ext == "txt") {
          textType = "plain";
      } else if (ext == "htm" || ext == "html") {
          textType = "html";
      } else if (ext == "md") {
          textType = "markdown";
      } else {
          textType = "plain";
      }

      // 表示内容の取得
      var textContent = null;
      try {
          textContent = getContentByObjectTag(id, textType);
      } catch(e) {
          textContent = "コンテンツ取得失敗[id=" + id + "]";
      }

      showDialogCommon(textContent, textType);
    }

    // ドキュメントを疑似ダイアログで開く
    function showDialogCommon(textContent, textType) {
      // ダイアログのサイズと位置
      dialogArea = document.getElementById("area_dialog");
      da_w = Math.floor((window.innerWidth / 10) * 8);
      da_h = Math.floor((window.innerHeight / 10) * 8);
      da_x = Math.floor((window.innerWidth - da_w) / 2) + document.documentElement.scrollLeft;
      da_y = Math.floor((window.innerHeight - da_h) / 2) + document.documentElement.scrollTop;
      dialogArea.style.width = da_w + "px";
      dialogArea.style.height = da_h + "px";
      dialogArea.style.left = da_x + "px";
      dialogArea.style.top = da_y + "px";
      dc_w = da_w - 20;
      dc_h = da_h - 80;

      // 表示内容のカスタム要素
      // 文字サイズ
      dialogArea.style.fontSize = customDialogFontSize;
      var content = null;
      if (textType == "plain") {
          content = "<pre>" + textContent + "</pre>";
      } else if (textType == "html") {
          content = textContent;
      } else if (textType == "markdown") {
          content = marked(textContent);
      } else {
          content = "<pre>" + textContent + "</pre>";
      }

      // ダイアログのソース
      dialogArea.innerHTML =
          "<html><body>"
          + "<div class='area_dialog_frame'>"
          + "  <div class='item_dialog_frame_content' style='width:" + dc_w + "px; height:" + dc_h + "px;'>"
          + content
          + "  </div>"
          + "  <hr>"
          + "    <div class='item_dialog_button'>"
          + "      <a href='#' class='button_dialog_button' onclick='hideDialog();'>CLOSE</a>"
          + "    </div>"
          + "  </div>"
          + "</body></html>";

      // ダイアログ背景
      backTarget = document.getElementById("area_dialog_back");
      backTarget.style.visibility = "visible";

      dialogArea.style.visibility = "visible";
    }

    // 疑似ダイアログを閉じる
    function hideDialog() {
      backTarget = document.getElementById("area_dialog_back");
      backTarget.style.visibility = "hidden";
      dialogArea = document.getElementById("area_dialog");
      dialogArea.style.visibility = "hidden";
    }

    // ダイアログコンテンツの取得 <object>タグ使用
    function getContentByObjectTag(id, textType) {
      if (textType == "html") {
          return document.getElementById(id).contentDocument.documentElement.innerHTML;
      } else {
          return document.getElementById(id).contentDocument.documentElement.textContent;
      }
    }

    // ダイアログコンテンツの取得 Ajax使用
    function getContentByAjax(path) {
      var xhr = null;
      try {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch(e) {
          xhr = new XMLHttpRequest();
      }

      xhr.open("GET", path, true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
              var content = null;
              if (xhr.status == 200) {
                  content = xhr.responseText;
              } else {
                  content = "コンテンツ取得失敗:status=" + xhr.status;
              }
              return content;
          }
      }
      xhr.send();
    }


//******************************************************************************
//ユーティリティ

    // 2桁のゼロパディング
    function paddingZero2(value) {
      return ("00" + String(value)).slice(-2);
    }

    // パスよりディレクトリを取得
    function sliceDirectory(path) {
      return path.substr(0, path.lastIndexOf("/"));
    }

    // 日付のフォーマット、yyyy/MM/dd HH:MM:ss
    function formatDate(num) {
      var value = String(num);
      var year = value.substr(0, 4);
      var month = value.substr(4, 2);
      var day = value.substr(6, 2);
      var hour = value.substr(8, 2);
      var minute = value.substr(10, 2);
      var second = value.substr(12, 2);
      return String(year) + "/" + String(month) + "/" + String(day) + " " + String(hour) + ":" + String(minute) + ":" + String(second);
    }

    // Cookieを読み込んで連想配列に格納
    function readCookie() {
      var cookies = document.cookie;
      var cookieSplit = cookies.split(/;/);
      var cookieMap = {};
      cookieSplit.forEach((element, index) => {
          var position = element.indexOf("=");
          if (position != -1) {
              var key = element.substr(0, position).trim();
              var value = element.substr(position + 1);
              cookieMap[key] = value;
          }
      });
      return cookieMap;
    }

