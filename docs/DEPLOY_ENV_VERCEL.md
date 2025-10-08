# Deploy & Environment on Vercel

Hướng dẫn cấu hình biến môi trường khi deploy frontend lên Vercel.

## 1) Tạo Project trên Vercel
- Import repo GitHub/GitLab
- Chọn framework: Vite

## 2) Cấu hình ENV
Vào Project Settings → Environment Variables, thêm:
- `VITE_API_BASE_URL` = `https://api.golearn.vn/v1` (Production)
- `VITE_WS_URL` = `wss://api.golearn.vn/ws`

Có thể thêm biến riêng cho Preview/Development nếu cần.

## 3) Build
- Vercel sẽ chạy lệnh `npm run build`
- Kiểm tra logs nếu lỗi, đa phần do thiếu ENV hoặc URL sai

## 4) Kiểm thử
- Mở link Production/Preview
- Mở DevTools → Network để xác nhận request tới đúng API

## 5) CORS
Đảm bảo backend đã bật CORS cho domain Vercel (Production & Preview).
