rem 引数 %0：自バッチパス「"C:\xxx\xxx\pcportal.bat"」
rem 引数 %1：href値「"pcportal:-sk_C:\yyy\yyy\yyy.txt"」をURLエンコードした値
rem 引数 %1をオプション「-sk」とパス「C:\yyy\yyy\yyy.txt」に分割
rem オプション="-sk"でメモ帳、オプション="-ex"でエクスプローラ起動
@echo off
chcp 65001 > nul 2>&1

rem コマンドプロンプトを最小化して起動
if not "%~0"=="%~dp0.\%~nx0" (
    start /min cmd /c, "%~dp0.\%~nx0" %*
    exit 0
)

rem 引数より要素を取り出し、オプションとパスに分割
set PARAM=%1
set PARAM_OPTION=%PARAM:~10,3%
set PARAM_PATH=%PARAM:~14,-1%

rem URLデコード
set COM_DECODE=powershell -command "Add-Type -AssemblyName System.Web; [System.Web.HttpUtility]::UrlDecode('%PARAM_PATH%')"
for /f "usebackq" %%i in (`%COM_DECODE%`) do set STR_DECODED=%%i

rem オプションによりアプリケーションをバックグラウンドで実行
if %PARAM_OPTION%==-sk (
    start notepad "%STR_DECODED%"
)
if %PARAM_OPTION%==-ex (
    start explorer "%STR_DECODED%"
)

exit 0
