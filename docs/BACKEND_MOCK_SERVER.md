# Mock Backend Server (json-server)

Dùng khi bạn chưa có backend thật hoặc muốn chạy nhanh để dev UI.

## Cài đặt
```bash
npm install -D json-server
```

## Tạo file dữ liệu `mock/db.json`
```json
{
  "lessons": [
    { "id": "lesson_1", "title": "Chào hỏi cơ bản", "difficulty": "Cơ bản" }
  ],
  "dictionary": [
    { "id": "word_1", "word": "Xin chào", "videoUrl": "/videos/hello.mp4" }
  ]
}
```

## Chạy server
```bash
npx json-server --watch mock/db.json --port 3000 --routes mock/routes.json
```

Tạo `mock/routes.json` để map route giống spec:
```json
{
  "/api/v1/lessons": "/lessons",
  "/api/v1/dictionary/search": "/dictionary"
}
```

Giờ bạn có thể set `VITE_API_BASE_URL=http://localhost:3000/api/v1` để gọi mock.

Lưu ý: json-server không xử lý auth; bạn có thể mở rộng bằng middleware hoặc dùng MSW (Mock Service Worker) nếu cần logic phức tạp hơn.
