# Võ Lâm Truyền Kỳ 1 — Mô Phỏng 10 Trang Bị Ngũ Hành (JX1 Simulator)

Ứng dụng web mô phỏng giao diện **HỆ THỐNG NHÂN VẬT (F3) - 10 Món Trang Bị Đồ Xanh Ngũ Hành** kinh điển của **Võ Lâm Truyền Kỳ 1 (JX1)**, tích hợp trực tiếp bộ thuộc tính (`Set 1` → `Set 8`, `DongAn_1`, `DongAn_2`, `NhanTrangBi`) từ hệ thống script `.lua` lọc đồ Ngũ Hành.

---

## ✨ Tính Năng Chính

1. **Khung Nhân Vật Chuẩn VLTK 1 (10 Món Trang Bị Cốt Lõi):**
   - Thay thế ô *Tên Nhân Vật* bằng **Bộ chọn Ngũ Hành Nhân Vật (`Kim`, `Mộc`, `Thủy`, `Hỏa`, `Thổ`)**.
   - Nhân vật thuộc hệ nào sẽ **tự động kích hoạt 1 dòng ẩn đầu tiên (`DongAn_1`)** cho mọi trang bị thuộc hệ tương sinh (`Kim → Thủy → Mộc → Hỏa → Thổ`).
2. **Chuẩn Quy Tắc 5 Cặp Kích Thuộc Tính Âm:**
   - **Cặp 1 (`Áo` + `Dây chuyền`)** ← Cần **`Nhẫn dưới` + `Thắt lưng`**
   - **Cặp 2 (`Vũ khí` + `Nón`)** ← Cần **`Y phục (Áo)` + `Dây chuyền`**
   - **Cặp 3 (`Giày` + `Nhẫn trên`)** ← Cần **`Vũ khí` + `Nón`**
   - **Cặp 4 (`Bao tay` + `Ngọc bội`)** ← Cần **`Giày` + `Nhẫn trên`**
   - **Cặp 5 (`Thắt lưng` + `Nhẫn dưới`)** ← Cần **`Ngọc bội` + `Hộ uyển (Bao tay)`**
3. **3 Chế Độ Phối Đồ Tự Động & Gợi Ý Động:**
   - **⚡ Chuẩn Dạng 1 (Theo Hệ Nhân Vật):** Nhân vật hệ gì mang Vũ Khí hệ đó (`charElement === weaponElement`), xoay khép kín 5 cặp Ngũ Hành.
   - **🗡️ Chuẩn Dạng 2 (Theo Hệ Vũ Khí Đang Chọn):** Soi cả Hệ Nhân Vật và Hệ Vũ Khí đang chọn (ví dụ NV Hệ Thủy cầm Vũ Khí Hệ Kim), xoay 5 cặp theo Hệ Vũ Khí và cộng dòng tự kích `+1` từ Nhân Vật.
   - **🔥 Phá Hành (Tăng Kháng Hệ Bị Khắc):** Giữ nguyên nền tảng **Chuẩn Dạng 2** và **giữ nguyên Vũ Khí của Dạng 2**, thay đổi các món phụ trợ sang hệ tương sinh của Nhân Vật (tự kích `DongAn_1`) để tăng tối đa kháng chống lại hệ khắc chế.
4. **Tích Hợp Dữ Liệu Lọc Đồ `.lua`:**
   - Chọn nhanh `Set 1` → `Set 8` của từng loại trang bị & từng hệ Ngũ Hành.
   - Xem và sao chép trực tiếp đoạn mã `ThemSetThuocTinh({...})` chuẩn `.lua`.
   - Lưu trữ không giới hạn các bộ phối đồ vào trình duyệt (`localStorage`) hoặc xuất/nhập mã JSON.

---

## 🚀 Cách Chạy & Đưa Lên GitHub Pages

- **Chạy trực tiếp trên máy:** Mở file `index.html` bằng bất kỳ trình duyệt nào (Chrome, Edge, Firefox...).
- **Đẩy lên GitHub:**
  ```bash
  git remote add origin https://github.com/<ten-tai-khoan>/<ten-repo>.git
  git push -u origin main
  ```
- **Bật GitHub Pages:** Vào `Settings` → `Pages` → chọn nhánh `main` (`/root`) → `Save`.

