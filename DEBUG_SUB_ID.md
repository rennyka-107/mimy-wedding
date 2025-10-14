# 🔍 Debug Sub_ID Tracking Issue

## Vấn đề
Sub_ID không được insert chính xác vào database.

## Các bước kiểm tra và fix

### 1️⃣ Kiểm tra Migration đã chạy chưa

**Check xem table `page_visits` đã tồn tại chưa:**

```bash
# Run migration
pnpm db:migrate
```

**Expected output:**
```
Running migrations...
Migrations completed successfully!
```

**Kiểm tra table trong database:**
```sql
SELECT * FROM page_visits LIMIT 5;
```

Nếu table chưa có, chạy:
```bash
pnpm db:generate
pnpm db:migrate
```

---

### 2️⃣ Test với Debug Page

**Truy cập debug page:**
```
http://localhost:3000/test-tracking/debug
```

**Các bước test:**

1. **Mở DevTools Console** (F12)
2. **Nhập sub_id** vào input (ví dụ: "facebook")
3. **Click "Test API Direct"**
4. **Xem Console Logs:**

   **Frontend logs (Browser Console):**
   ```javascript
   === TESTING DIRECT API CALL ===
   Sending sub_id: facebook
   API Response: { status: 'success', data: { id: '...', sub_id: 'facebook', ... } }
   ```

   **Backend logs (Terminal):**
   ```
   [API /visits POST] Received request body: { sub_id: 'facebook', region: 'Debug Test' }
   [API /visits POST] Extracted sub_id: facebook
   [API /visits POST] Data to insert: { ip: '::1', visit_time: ..., sub_id: 'facebook', ... }
   [API /visits POST] Inserted successfully: { id: '...', sub_id: 'facebook', ... }
   ```

5. **Check "Recent Visits" table** - sub_id phải hiển thị đúng

---

### 3️⃣ Test với URL Parameters

**Truy cập:**
```
http://localhost:3000?sub_id=facebook
```

**Mở Console và xem:**
```javascript
[VisitTracker] Detected sub_id from URL: facebook
[useVisitTracker] Tracking visit with data: { region: undefined, sub_id: 'facebook' }
[useVisitTracker] Visit tracked successfully: { ... }
```

**⚠️ Lưu ý:** Nếu đang ở trong trang và click link, sẽ **KHÔNG** track (internal navigation).

**Để test đúng:**
- Copy URL và paste vào new tab
- Hoặc mở Incognito mode
- Hoặc mở DevTools → Application → Session Storage → Delete `visit_tracked`

---

### 4️⃣ Kiểm tra Database trực tiếp

**Connect vào PostgreSQL:**

```bash
psql -h localhost -U postgres -d mimy_wedding
```

**Query để check:**

```sql
-- Xem tất cả visits
SELECT id, ip, sub_id, region, visit_time 
FROM page_visits 
ORDER BY visit_time DESC 
LIMIT 10;

-- Đếm số lượt theo sub_id
SELECT sub_id, COUNT(*) as count 
FROM page_visits 
GROUP BY sub_id 
ORDER BY count DESC;

-- Check visit mới nhất
SELECT * FROM page_visits 
ORDER BY created_at DESC 
LIMIT 1;
```

**Expected result:**
```
 id                                   | ip    | sub_id   | region      | visit_time
--------------------------------------+-------+----------+-------------+-------------------------
 uuid-here                            | ::1   | facebook | Debug Test  | 2025-10-14 00:40:00
```

---

### 5️⃣ Common Issues & Solutions

#### Issue 1: sub_id = NULL trong database
**Nguyên nhân:**
- URL không có `?sub_id=...`
- Session storage đã có `visit_tracked` (đã track trong 30 phút)
- Internal navigation (đang ở trong site)

**Solution:**
- Clear session storage
- Mở new tab hoặc Incognito
- Đảm bảo URL có `?sub_id=value`

#### Issue 2: Console không show logs
**Nguyên nhân:**
- Console filter đang bật
- Logs bị hide

**Solution:**
- Clear console filters
- Refresh page với hard reload (Ctrl + Shift + R)
- Check "Preserve log" trong console

#### Issue 3: API returns error
**Check terminal logs:**
```
[API /visits POST] Error creating page visit: ...
```

**Common errors:**
- Database connection failed → Check `.env` file
- Table doesn't exist → Run `pnpm db:migrate`
- Column doesn't exist → Re-generate migration

---

### 6️⃣ Manual API Test với cURL

```bash
# Test POST request trực tiếp
curl -X POST http://localhost:3000/api/visits \
  -H "Content-Type: application/json" \
  -d '{"sub_id": "test_curl", "region": "Test Region"}'
```

**Expected response:**
```json
{
  "status": "success",
  "data": {
    "id": "uuid-here",
    "ip": "::1",
    "visit_time": "2025-10-14T00:40:00.000Z",
    "region": "Test Region",
    "sub_id": "test_curl",
    "createdAt": "2025-10-14T00:40:00.000Z"
  }
}
```

**Verify trong database:**
```sql
SELECT * FROM page_visits WHERE sub_id = 'test_curl';
```

---

### 7️⃣ Checklist

- [ ] Migration đã chạy (`pnpm db:migrate`)
- [ ] Table `page_visits` tồn tại trong database
- [ ] Console logs hiển thị đúng sub_id
- [ ] API response có `sub_id` đúng
- [ ] Database có record với `sub_id` đúng
- [ ] Admin dashboard hiển thị visits với sub_id

---

### 8️⃣ Test Flow Diagram

```
User访问 URL: /?sub_id=facebook
    ↓
VisitTracker Component detect sub_id
    ↓ (logs: [VisitTracker] Detected sub_id from URL: facebook)
useVisitTracker Hook
    ↓ (logs: [useVisitTracker] Tracking visit with data: ...)
POST /api/visits
    ↓ (logs: [API /visits POST] Received request body: ...)
Insert vào Database
    ↓ (logs: [API /visits POST] Inserted successfully: ...)
Return success response
    ↓
Admin Dashboard hiển thị visit với sub_id
```

---

## Quick Fix Commands

```bash
# 1. Ensure migrations are up to date
pnpm db:generate
pnpm db:migrate

# 2. Start dev server
pnpm dev

# 3. Open debug page
# Browser: http://localhost:3000/test-tracking/debug

# 4. Test direct API
curl -X POST http://localhost:3000/api/visits \
  -H "Content-Type: application/json" \
  -d '{"sub_id": "test_manual", "region": "Manual Test"}'

# 5. Check database
psql -h localhost -U postgres -d mimy_wedding -c "SELECT * FROM page_visits ORDER BY created_at DESC LIMIT 5;"
```

---

## Need Help?

Nếu vẫn không work, check:
1. Terminal logs (backend)
2. Browser console logs (frontend)
3. Database query results
4. Network tab trong DevTools → Check request/response body

Gửi screenshot của các logs này để debug tiếp.
