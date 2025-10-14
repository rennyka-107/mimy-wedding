# Hướng Dẫn Test Visit Tracking với sub_id

## Cách Hoạt Động

Khi user truy cập URL với query parameter `sub_id`, hệ thống sẽ tự động:
1. Detect `sub_id` từ URL
2. Ghi nhận lượt visit kèm theo thông tin sub_id
3. Lưu vào database để admin có thể xem thống kê

## Các Trường Hợp Test

### 1. Test với sub_id từ URL

**Facebook:**
```
http://localhost:3000?sub_id=facebook
```

**TikTok:**
```
http://localhost:3000?sub_id=tiktok
```

**Google Ads:**
```
http://localhost:3000?sub_id=google_ads
```

**Instagram:**
```
http://localhost:3000?sub_id=instagram
```

**Email Campaign:**
```
http://localhost:3000?sub_id=email_campaign
```

### 2. Test Direct Access (không có sub_id)

```
http://localhost:3000
```

Sẽ được ghi nhận với `sub_id = null` và hiển thị là "Direct" trong admin.

## Cách Test

### Bước 1: Mở Test Page
Truy cập: `http://localhost:3000/test-tracking`

### Bước 2: Mở DevTools Console
- Press F12
- Chọn tab "Console"

### Bước 3: Click vào các test links
Bạn sẽ thấy các logs:
```
[VisitTracker] Detected sub_id from URL: facebook
[useVisitTracker] Tracking visit with data: { region: undefined, sub_id: 'facebook' }
[useVisitTracker] Visit tracked successfully: { status: 'success', data: {...} }
```

### Bước 4: Kiểm tra trong Admin Dashboard
1. Truy cập: `http://localhost:3000/admin`
2. Login với:
   - Username: `mimy313181`
   - Password: `longmy313181`
3. Xem bảng visits - bạn sẽ thấy lượt visit với sub_id tương ứng

## Lưu Ý Quan Trọng

### Session Storage Protection
- Mỗi lượt visit chỉ được ghi nhận **1 lần trong 30 phút**
- Để test lại, bạn cần:
  - Clear sessionStorage: DevTools → Application → Session Storage → Delete `visit_tracked`
  - Hoặc sử dụng Incognito/Private mode
  - Hoặc đợi 30 phút

### Internal Navigation Protection
- Nếu bạn đang ở trang `http://localhost:3000/page1` và click link đến `http://localhost:3000/page2?sub_id=facebook`
- Hệ thống sẽ **KHÔNG** ghi nhận vì đây là internal navigation
- Để test, bạn cần:
  - Open link in new tab (right click → Open in new tab)
  - Hoặc copy/paste URL vào address bar
  - Hoặc truy cập từ browser bookmark

## Expected Results

### Console Logs
Khi tracking thành công:
```javascript
[VisitTracker] Detected sub_id from URL: facebook
[useVisitTracker] Tracking visit with data: { 
  region: undefined, 
  sub_id: 'facebook' 
}
[useVisitTracker] Visit tracked successfully: { 
  status: 'success', 
  data: { 
    id: 'uuid', 
    ip: '127.0.0.1', 
    sub_id: 'facebook',
    ... 
  } 
}
```

Khi skip do internal navigation:
```javascript
Internal navigation detected, visit not tracked
```

### Admin Dashboard
Trong trang admin, bạn sẽ thấy:
- **Tổng lượt truy cập**: Tăng lên
- **Nguồn truy cập**: Hiển thị số lượt từ facebook, tiktok, etc.
- **Bảng chi tiết**: Mỗi row có badge màu hiển thị sub_id

## Test với External Tools

### Test với cURL
```bash
curl -X POST http://localhost:3000/api/visits \
  -H "Content-Type: application/json" \
  -d '{"sub_id": "test_curl", "region": "Test Region"}'
```

### Test với Postman
```
POST http://localhost:3000/api/visits
Content-Type: application/json

{
  "sub_id": "test_postman",
  "region": "Test Region"
}
```

## Troubleshooting

### Không thấy sub_id được detect?
1. Check console logs
2. Đảm bảo URL có format đúng: `?sub_id=value`
3. Hard refresh page (Ctrl + Shift + R)

### Visit không được ghi nhận?
1. Check console để thấy lỗi
2. Kiểm tra sessionStorage có key `visit_tracked` không
3. Clear sessionStorage và thử lại
4. Kiểm tra database connection

### Admin không hiển thị visits?
1. Check database có table `page_visits` chưa
2. Run migration: `pnpm db:migrate`
3. Check API response: DevTools → Network → `/api/visits`

## Production URLs

Khi deploy lên production, URL sẽ là:
```
https://yourdomain.com?sub_id=facebook
https://yourdomain.com?sub_id=tiktok
```

Bạn có thể share các link này trên social media để track nguồn traffic.
