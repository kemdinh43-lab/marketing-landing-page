# Hospitality Growth

Website React + TypeScript + Vite gồm landing page và trang dự án Bee Honey Spa đã chốt thiết kế. Bản này dùng để đưa lên GitHub và triển khai Vercel.

## Đưa lên GitHub → Vercel

1. Giải nén `hospitality-growth-vercel-v2.zip`.
2. Tạo repository GitHub. Upload **nội dung bên trong thư mục `hospitality-growth-vercel`**, gồm `src`, `public`, `scripts`, `package.json`, `package-lock.json`, `index.html`, `vercel.json`, `vite.config.ts`, `tsconfig.json` và các file đi kèm. Không upload file ZIP để thay cho mã nguồn.
3. Trên Vercel: **Add New → Project → Import Git Repository**, chọn repository vừa tạo.
4. Nếu upload như bước 2, Root Directory là gốc repo. Framework: **Vite**. Node.js: **24.x**. Install: `npm ci`. Build: `npm run build`. Output: `dist`. Các giá trị đã có trong cấu hình dự án.
5. Deploy. Kiểm tra `/`, `/du-an/bee-honey-spa/`, tải lại trực tiếp trang dự án, menu điện thoại và mockup từng kênh.

Nếu bạn upload cả thư mục lồng bên trong repo, đặt **Root Directory** của Vercel thành thư mục chứa `package.json`. Những lần sau chỉ cần đẩy thay đổi lên GitHub; Vercel sẽ build lại theo cấu hình kết nối của bạn.

## Chạy và kiểm tra tại máy

Cần Node.js 24 và npm:

```sh
npm ci
npm run dev
```

Mở địa chỉ Vite in ra (mặc định `http://127.0.0.1:8445`). Kiểm tra bản production:

```sh
npm run build
npm run check:assets
npm run preview
```

`npm run build` bao gồm kiểm tra TypeScript. `dist` được sinh tự động; không cần commit `node_modules` hoặc `dist` lên GitHub. `vercel.json` xử lý đường dẫn trực tiếp của trang dự án. `bee-honey-spa.html` trong bản build chứa metadata riêng cho dự án.

## Tối ưu đã áp dụng

- Giữ bố cục/font/bo góc đã chốt, responsive trên desktop, tablet và điện thoại.
- WebP + nhiều kích thước ảnh; browser chọn kích thước phù hợp với viewport. Screenshot giữ nguyên tỷ lệ; ảnh đầy đủ vẫn xem được trong hộp phóng lớn.
- Font Manrope được lưu trong dự án, có bộ ký tự tiếng Việt và giấy phép OFL. Không cần tải CSS/font từ Google khi người dùng truy cập.
- Tách mã/CSS trang dự án khỏi bundle ban đầu của landing page. Lazy-load ảnh dưới màn hình, khai báo kích thước ảnh để giảm dịch chuyển bố cục.
- Cache dài cho tài nguyên build có hash, cache có thời hạn cho ảnh/font; có skip link, focus bàn phím và reduced motion.
- Loại bỏ cấu hình Figma, tài liệu/thư viện/thành phần/ảnh thử không còn dùng. Một lockfile npm duy nhất, không cần cấu hình biến môi trường để hiển thị trang.

## Phần bạn cần hoàn thiện trước khi nhận khách thật

**Biểu mẫu liên hệ hiện là demo giao diện, chưa gửi thông tin tới email hoặc server.** Không có tài khoản email nhận hay dịch vụ biểu mẫu được cung cấp trong cuộc trao đổi. Kết nối dịch vụ biểu mẫu/backend trong hàm `handleSubmit` tại `src/App.tsx` trước khi dùng để nhận lead. Không đặt khóa bí mật trong mã frontend hoặc biến `VITE_*`.

Tên agency và thông tin liên hệ ở footer vẫn có nội dung chờ cập nhật. Các ảnh Unsplash có ghi là ảnh minh họa. Số liệu Google/Instagram giữ kỳ đo riêng theo screenshot, không phải phần trăm tăng trưởng hay cam kết hiệu quả.

## Mockup và logo mới

Dùng trực tiếp artwork MacBook/iPhone Website, Instagram, Google Maps và Klook do bạn cung cấp, không dựng thêm khung thiết bị. Các laptop dùng chung kích thước hiển thị; các iPhone dùng chung kích thước hiển thị. PNG nguồn có nền trắng nên lớp cắt SVG chỉ ẩn phần ngoài thiết bị, giữ nguyên artwork bên trong. Dải logo Bee Honey Spa, Angel One Travel, Fiona và KP trên trang chủ có nền trắng.

## Các file chính

- `src/App.tsx`: landing page và header/footer.
- `src/pages/BeeHoneyCase.tsx`: cấu trúc dự án, bộ chọn kênh và mockup.
- `src/pages/BeeScale.css`: thang chữ, kích thước khối thống nhất với landing.
- `src/pages/BeeResults.tsx`: metrics đếm tăng và gallery thống kê.
- `src/artworkAssets.ts`, `src/ArtworkImage.tsx`: tám mockup do bạn cung cấp, chuẩn hóa tỷ lệ và cắt phần nền ngoài thiết bị khi hiển thị.
- `src/LogoMarquee.tsx`: dải bốn logo cuộn, nền trắng, có tạm dừng và hỗ trợ reduced motion.
- `src/imageAssets.ts`: kích thước và srcset các ảnh tối ưu.
- `public/images`, `public/fonts`: tài nguyên chạy độc lập trong dự án.
- `docs`: nguồn ảnh và biên bản kiểm tra bản bàn giao.

Tài liệu chính thức: [Vite trên Vercel và deep linking](https://vercel.com/docs/frameworks/frontend/vite), [Node.js trên Vercel](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
