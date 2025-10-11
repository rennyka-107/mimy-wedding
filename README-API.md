# API Đăng nhập và Đăng ký cho Mimy Wedding

## Tổng quan

Hệ thống xác thực người dùng bao gồm:
1. API đăng nhập (credentials và Google OAuth)
2. API đăng ký
3. Quản lý phiên làm việc với NextAuth

## Cấu trúc Database

Sử dụng Drizzle ORM với PostgreSQL với các bảng:
- users: thông tin người dùng
- sessions: phiên làm việc
- accounts: tài khoản OAuth (Google)
- verification_tokens: token xác thực

## Cài đặt và Thiết lập

1. Cài đặt các dependencies:

```bash
pnpm add drizzle-orm postgres next-auth bcrypt jsonwebtoken @auth/core drizzle-kit tsx
pnpm add @types/bcrypt -D
```

2. Thiết lập biến môi trường trong `.env.local`:

```
# Database
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=long1071996
DB_NAME=mimy_wedding
DB_PORT=5432

# NextAuth
NEXTAUTH_SECRET=your-super-secret-key-for-jwt-signing
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

3. Chạy các lệnh tạo và áp dụng migration:

```bash
pnpm db:generate
pnpm db:migrate
```

## Sử dụng API

### Đăng ký người dùng

```typescript
// POST /api/auth/register
const registerUser = async (name: string, email: string, password: string) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  
  return await response.json();
};
```

### Đăng nhập thông thường

```typescript
// Sử dụng AuthContext (đã được cài đặt)
import { useAuth } from "@/context/AuthContext";

const { login } = useAuth();
await login(email, password);
```

### Đăng nhập bằng Google

```typescript
// Sử dụng AuthContext (đã được cài đặt)
import { useAuth } from "@/context/AuthContext";

const { loginWithGoogle } = useAuth();
await loginWithGoogle();
```

### Đăng xuất

```typescript
// Sử dụng AuthContext (đã được cài đặt)
import { useAuth } from "@/context/AuthContext";

const { logout } = useAuth();
await logout();
```

## Cài đặt Google OAuth

1. Tạo dự án trên [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo OAuth Client ID cho Web Application
3. Thiết lập URI chuyển hướng: `http://localhost:3000/api/auth/callback/google`
4. Lưu Client ID và Client Secret vào `.env.local`

## Tích hợp với Giao diện

Đã tích hợp xong với giao diện thông qua các component:
- LoginModal.tsx
- RegisterModal.tsx
- AuthContext.tsx

## Lưu ý bảo mật

- Mật khẩu được hash bằng bcrypt trước khi lưu vào database
- Sử dụng JWT cho session để đảm bảo tính bảo mật
- Tất cả các thông tin nhạy cảm đều được lưu trong biến môi trường

# API Thiệp Cưới

## Cấu trúc Database

Bảng `invitations` chứa thông tin thiệp cưới với các trường:
- id: UUID, khóa chính
- userId: UUID, liên kết với bảng users
- name: Tên thiệp cưới
- status: Trạng thái thiệp cưới (draft, paid)
- total_money: Tổng số tiền
- access_number: Số lượt truy cập
- date_from: Ngày bắt đầu sự kiện
- date_to: Ngày kết thúc sự kiện
- template_id: ID của template thiệp cưới
- data: Dữ liệu thiệp cưới (JSON)
- createdAt: Thời gian tạo
- updatedAt: Thời gian cập nhật

## Sử dụng API

### Lấy danh sách thiệp cưới

```typescript
// GET /api/invitations
const getInvitations = async () => {
  const response = await fetch('/api/invitations', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  
  return await response.json();
};
```

### Tạo thiệp cưới mới

```typescript
// POST /api/invitations
const createInvitation = async (data) => {
  const response = await fetch('/api/invitations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  return await response.json();
};
```

### Lấy chi tiết thiệp cưới

```typescript
// GET /api/invitations/:id
const getInvitation = async (id) => {
  const response = await fetch(`/api/invitations/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  
  return await response.json();
};
```

### Cập nhật thiệp cưới

```typescript
// PUT /api/invitations/:id
const updateInvitation = async (id, data) => {
  const response = await fetch(`/api/invitations/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  return await response.json();
};
```

### Xóa thiệp cưới

```typescript
// DELETE /api/invitations/:id
const deleteInvitation = async (id) => {
  const response = await fetch(`/api/invitations/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  
  return await response.json();
};
```

### Xem thiệp cưới công khai

```typescript
// GET /api/invitations/public/:id
const viewPublicInvitation = async (id) => {
  const response = await fetch(`/api/invitations/public/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  
  return await response.json();
};
```

## Lưu ý

- Chỉ những thiệp cưới có status = 'paid' mới được hiển thị công khai
- Truy cập API công khai sẽ tăng access_number
- Các API còn lại yêu cầu người dùng đăng nhập

## Giới hạn sử dụng

Mỗi người dùng có các giới hạn sau:

- **image_limit**: Số lượng ảnh tối đa có thể upload (mặc định: 10)
- **draft_limit**: Số lượng bản nháp thiệp cưới tối đa (mặc định: 1)

Các trường theo dõi sử dụng:

- **image_used**: Số lượng ảnh đã sử dụng
- **draft_used**: Số lượng bản nháp đã tạo

Các hàm kiểm tra giới hạn:

```typescript
// Kiểm tra giới hạn bản nháp
const checkDraftLimit = async (userId) => {...};

// Kiểm tra giới hạn ảnh
const checkImageLimit = async (userId, numberOfImages) => {...};

// Kiểm tra có thể đổi trạng thái sang draft không
const canChangeToDraft = async (userId, invitationId) => {...};
```

Các API sẽ trả về lỗi 403 với thông báo phù hợp nếu vượt quá giới hạn.

# API Quản lý Ảnh

Hệ thống cung cấp các API để quản lý ảnh một cách hiệu quả:

## Bảng Images

```typescript
export const images = pgTable("images", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(), // Tên file gốc hoặc tên được generate
  originalName: varchar("original_name", { length: 255 }), // Tên file gốc mà người dùng upload
  path: varchar("path", { length: 500 }).notNull(), // Đường dẫn đến file trong hệ thống
  url: varchar("url", { length: 500 }).notNull(), // URL để truy cập ảnh
  mimeType: varchar("mime_type", { length: 100 }), // Loại file (image/jpeg, image/png,...)
  size: integer("size"), // Kích thước file (bytes)
  used: boolean("used").default(false), // Đánh dấu ảnh đã được sử dụng trong thiệp cưới hay chưa
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

## API Upload Ảnh

```typescript
// POST /api/upload
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
  
  return await response.json();
};
```

## API Lấy Danh sách Ảnh

```typescript
// GET /api/images?used=true|false&limit=10&page=1
const getImages = async (used, limit = 10, page = 1) => {
  const params = new URLSearchParams();
  if (used !== undefined) params.append('used', used ? 'true' : 'false');
  if (limit) params.append('limit', limit.toString());
  if (page) params.append('page', page.toString());
  
  const response = await fetch(`/api/images?${params.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return await response.json();
};
```

## API Xóa Ảnh

```typescript
// DELETE /api/images/:id
const deleteImage = async (imageId) => {
  const response = await fetch(`/api/images/${imageId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  
  return await response.json();
};
```

## API Xóa Nhiều Ảnh

```typescript
// POST /api/images/batch-delete
const batchDeleteImages = async (imageIds) => {
  const response = await fetch('/api/images/batch-delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageIds })
  });
  
  return await response.json();
};
```

## API Cập nhật trạng thái ảnh

```typescript
// PATCH /api/images/:id
const updateImageStatus = async (imageId, used) => {
  const response = await fetch(`/api/images/${imageId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ used })
  });
  
  return await response.json();
};
```

## Lưu ý

- Ảnh đã được sử dụng trong thiệp cưới (field `used = true`) không thể xóa
- API sẽ tự động kiểm tra quyền sở hữu của người dùng đối với ảnh
- Mỗi khi upload ảnh thành công, số lượng `image_used` của user sẽ tăng lên
- Mỗi khi xóa ảnh thành công, số lượng `image_used` của user sẽ giảm xuống

### API Kiểm tra giới hạn và sử dụng

```typescript
// GET /api/users/limits
const getUserLimits = async () => {
  const response = await fetch('/api/users/limits', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  
  return await response.json();
};

// Kết quả trả về:
// {
//   "success": true,
//   "limits": {
//     "image": {
//       "limit": 10,
//       "used": 3,
//       "remaining": 7
//     },
//     "draft": {
//       "limit": 1,
//       "used": 0,
//       "remaining": 1
//     }
//   }
// }
```

### API Cập nhật giới hạn (dành cho admin)

```typescript
// PUT /api/users/limits
const updateUserLimits = async (userId, newLimits) => {
  const response = await fetch('/api/users/limits', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      ...newLimits // Có thể bao gồm image_limit, draft_limit
    }),
  });
  
  return await response.json();
};
```
