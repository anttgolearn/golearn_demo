# Quickstart: Kết nối Backend cho người mới

Mục tiêu: giúp bạn (kể cả chưa từng làm React) kết nối frontend hiện tại với backend API nhanh nhất.

## 1) Cài đặt môi trường
- Cài Node.js 18+: tải từ `https://nodejs.org`
- Mở terminal tại thư mục dự án
- Chạy: `npm install`

## 2) Tạo file môi trường
Tạo file `.env.local` (đặt cạnh `package.json`), nội dung:
```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_WS_URL=ws://localhost:3000/ws
```
Nếu backend chạy port khác, thay URL cho phù hợp.

## 3) Chạy dự án
```bash
npm run dev
```
Mở trình duyệt theo địa chỉ in ra (thường là `http://localhost:5173`).

## 4) Kết nối API: sử dụng sẵn hàm gọi
- Các hàm gọi API nằm trong `src/lib/*.ts` (đã được chuẩn hoá dễ dùng).
- Ví dụ: đăng nhập
```ts
import { login } from '../lib/auth.client';
await login('user@example.com', 'password123');
```

## 5) Kiểm tra bằng Postman (tuỳ chọn)
- Import endpoints từ `API_ENDPOINTS_SPECIFICATION.md`
- Gọi thử `/auth/login` để lấy token và thử các API khác

## 6) Khi gặp lỗi
- Kiểm tra `VITE_API_BASE_URL`
- Kiểm tra CORS từ phía backend
- Mở console trình duyệt (F12) để xem thông báo lỗi rõ hơn

Đọc thêm hướng dẫn chi tiết trong: `docs/BACKEND_INTEGRATION_GUIDE.md` và tra cứu nhanh mapping ở `docs/ENDPOINTS_TO_COMPONENTS.md`.
