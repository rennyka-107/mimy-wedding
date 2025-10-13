@echo off
echo ====================================
echo Testing Sub_ID Tracking...
echo ====================================
echo.

REM Test 1: Insert with sub_id = "test_script"
echo Test 1: Inserting visit with sub_id='test_script'
curl -X POST http://localhost:3000/api/visits ^
  -H "Content-Type: application/json" ^
  -d "{\"sub_id\": \"test_script\", \"region\": \"Script Test\"}"
echo.
echo.

REM Test 2: Insert with sub_id = "facebook"
echo Test 2: Inserting visit with sub_id='facebook'
curl -X POST http://localhost:3000/api/visits ^
  -H "Content-Type: application/json" ^
  -d "{\"sub_id\": \"facebook\", \"region\": \"Test Region\"}"
echo.
echo.

REM Test 3: Fetch recent visits
echo Test 3: Fetching recent visits from API
curl -X GET "http://localhost:3000/api/visits?limit=5"
echo.
echo.

echo ====================================
echo Test Summary:
echo ------------------------------------
echo - Check terminal logs for backend output
echo - Check browser at http://localhost:3000/admin
echo - Check database directly with psql
echo ====================================
pause
