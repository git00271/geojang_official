@echo off
chcp 65001 > nul
echo ===================================================
echo  [거장수산 홈페이지 - 깃허브 자동 배포 스크립트]
echo ===================================================
echo.
echo [배포 로그 생성 중...] > deploy_log.txt
echo 1. 변경된 파일 수집 중 (git add)...
git add . >> deploy_log.txt 2>&1
echo.
echo 2. 업데이트 메시지 작성 중 (git commit)...
git commit -m "홈페이지 업데이트 (%date% %time%)" >> deploy_log.txt 2>&1
echo.
echo 3. 깃허브 서버로 업로드 중 (git push)...
git push origin main >> deploy_log.txt 2>&1
echo.
echo ===================================================
echo  전송 완료! 10초 내로 Netlify 웹사이트에 자동 반영됩니다.
echo  오류가 발생했다면 폴더 내의 deploy_log.txt를 확인해 주세요.
echo ===================================================
pause
