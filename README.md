# VEO3 Generator V2

Ứng dụng web tạo video AI sử dụng React, Vite, Tailwind CSS và tích hợp với N8N webhook để tạo video từ text prompt.

## ✨ Tính năng

- 🎬 **Tạo video từ text prompt**: Nhập mô tả và tạo video tự động
- 🎨 **Giao diện hiện đại**: UI/UX đẹp mắt với Tailwind CSS và shadcn/ui
- 📱 **Responsive design**: Hỗ trợ đầy đủ trên mobile, tablet và desktop
- ⚡ **Real-time progress**: Hiển thị tiến trình tạo video theo thời gian thực
- 🎯 **Popular tools**: Truy cập nhanh các công cụ AI phổ biến
- 💬 **Chat history**: Lưu lịch sử các lần tạo video (có thể tích hợp Supabase + Cloudinary)

## 🚀 Bắt đầu

### Yêu cầu hệ thống

- Node.js >= 16.x
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd VEO3-GENERATOR-V2

# Cài đặt dependencies
npm install
```

### Cấu hình

1. Mở file `src/constants/index.js`
2. Cập nhật `N8N_WEBHOOK_URL` với URL webhook của bạn:

```javascript
export const N8N_WEBHOOK_URL = "https://your-n8n-webhook-url.com/webhook/generate-video";
```

3. (Tùy chọn) Điều chỉnh cấu hình mặc định trong `API_CONFIG`:

```javascript
export const API_CONFIG = {
  TIMEOUT: 900000, // 15 phút
  DEFAULT_SETTINGS: {
    duration: 5,        // Độ dài video (giây)
    resolution: "720p", // Độ phân giải
    aspectRatio: "16:9", // Tỷ lệ khung hình
  },
};
```

### Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Build cho production

```bash
npm run build
```

Files build sẽ được tạo trong thư mục `dist/`

### Preview production build

```bash
npm run preview
```

## 📁 Cấu trúc project

```
VEO3-GENERATOR-V2/
├── src/
│   ├── components/          # React components
│   │   ├── layout/          # Layout components (Sidebar, Header, MainLayout)
│   │   └── ui/              # shadcn/ui components
│   ├── pages/               # Page components
│   │   ├── VideoGeneratorPage.jsx
│   │   └── AssetsPage.jsx
│   ├── services/            # API services
│   │   └── videoService.js  # Service xử lý video generation
│   ├── constants/           # Constants và config
│   │   └── index.js         # N8N URL và API config
│   ├── lib/                 # Utility functions
│   │   └── utils.js        # Helper functions (cn, etc.)
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles với Tailwind
├── public/                  # Static files
├── components.json         # Cấu hình shadcn/ui
├── tailwind.config.js     # Cấu hình Tailwind CSS
├── postcss.config.js       # Cấu hình PostCSS
├── vite.config.js         # Cấu hình Vite
├── package.json           # Dependencies
└── README.md              # Tài liệu này
```

## 🛠️ Tech Stack

- **⚛️ React 18**: UI framework
- **⚡ Vite 5**: Build tool và dev server
- **🎨 Tailwind CSS 3**: Utility-first CSS framework
- **🎭 shadcn/ui**: Component library
- **📦 Axios**: HTTP client cho API calls
- **🎯 Lucide React**: Icon library
- **📱 Responsive Design**: Mobile-first approach

## 📖 Sử dụng

### Tạo video

1. Nhập mô tả video vào ô input
2. Click nút "Generate" hoặc nhấn `Ctrl/Cmd + Enter`
3. Chờ video được tạo (hiển thị progress bar)
4. Video sẽ tự động phát khi hoàn thành

### Các tính năng khác

- **Suggested topics**: Click vào các topic gợi ý để sử dụng lại
- **Popular tools**: Truy cập các công cụ AI khác
- **History**: Xem lịch sử các video đã tạo (nếu đã tích hợp)

## 🔧 Thêm components từ shadcn/ui

Để thêm components từ shadcn/ui:

```bash
npx shadcn-ui@latest add [component-name]
```

Ví dụ:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

Components sẽ được thêm vào `src/components/ui/`

## 🔌 API Integration

### N8N Webhook

Ứng dụng sử dụng N8N webhook để tạo video. Service được định nghĩa trong `src/services/videoService.js`:

- **Endpoint**: Cấu hình trong `src/constants/index.js`
- **Timeout**: 15 phút (900000ms)
- **Response**: Hỗ trợ cả binary video file và JSON (Google Drive URL)

### Tích hợp Supabase + Cloudinary (Tùy chọn)

Để lưu lịch sử video:

1. **Supabase**: Lưu metadata (prompt, settings, timestamps)
2. **Cloudinary**: Upload và host video files

Xem hướng dẫn chi tiết trong code comments hoặc tài liệu tích hợp.

## 🎨 Customization

### Thay đổi màu sắc

Chỉnh sửa `tailwind.config.js` để thay đổi theme colors:

```javascript
theme: {
  extend: {
    colors: {
      // Thêm màu tùy chỉnh
    }
  }
}
```

### Thay đổi fonts

Fonts được cấu hình trong `tailwind.config.js` và `src/index.css`:

- **Sans**: CapCut Sans Text (cho body text)
- **Display**: CapCut Sans Display (cho headings)

## 🐛 Troubleshooting

### Video không hiển thị

- Kiểm tra N8N webhook URL trong `src/constants/index.js`
- Kiểm tra console để xem lỗi API
- Đảm bảo N8N workflow trả về đúng format (binary hoặc JSON)

### Build errors

```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

### Port đã được sử dụng

Thay đổi port trong `vite.config.js` hoặc kill process đang dùng port 5173.

## 📝 Scripts

- `npm run dev`: Chạy development server
- `npm run build`: Build cho production
- `npm run preview`: Preview production build

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

## 📄 License

[Thêm license của bạn ở đây]

## 👥 Authors

[Thêm tên tác giả ở đây]

---

**Lưu ý**: Đảm bảo N8N webhook của bạn đã được cấu hình đúng và có thể xử lý requests từ ứng dụng này.
