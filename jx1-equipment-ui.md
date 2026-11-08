# Kế Hoạch Thiết Kế & Xây Dựng UI Trang Bị Ngũ Hành VLTK 1 (JX1 Equipment Simulator)

## 1. Overview (Tổng Quan Dự Án)
Xây dựng ứng dụng Web mô phỏng giao diện **Hệ Thống Nhân Vật - Trang Bị (10 món)** chuẩn phong cách **Võ Lâm Truyền Kỳ 1 (JX1)**:
- Thay thế vị trí "Tên nhân vật" bằng **Bộ chọn Hệ Nhân Vật (Kim - Mộc - Thủy - Hỏa - Thổ)**.
- Chỉ hiển thị đúng **10 ô trang bị cốt lõi** theo bố cục 3 cột chuẩn VLTK 1 (không hiển thị các ô phụ Mặt nạ, Ngựa, Ấn, Phi phong).
- Áp dụng **quy tắc kích Ngũ Hành mặc định của VLTK 1**:
  - **Tương sinh:** Kim → Thủy → Mộc → Hỏa → Thổ → Kim.
  - **Tương khắc:** Kim ⚔️ Mộc ⚔️ Thổ ⚔️ Thủy ⚔️ Hỏa ⚔️ Kim.
  - **Nhân vật tự kích dòng ẩn:** Khi Nhân Vật mang hệ tương sinh với trang bị (ví dụ: Nhân vật hệ **Kim** → Kim sinh **Thủy**), tất cả trang bị hệ **Thủy** trên người sẽ được **Bản thân nhân vật tự kích 1 dòng ẩn** (không cần đồ mồi vẫn sáng 1 dòng ẩn; nếu có thêm 1 hoặc 2 món đồ kích đúng vị trí sẽ sáng tiếp dòng ẩn 2 và dòng ẩn 3). Ngược lại, trang bị không được hệ nhân vật tương sinh thì bắt buộc phải có trang bị tương sinh ở đúng vị trí quy định mới kích được dòng ẩn.
- **Hỗ trợ Mặc Phá Hành & Lưu Bộ Phối Đồ (Build Presets):** Người dùng tự do đổi hệ và thuộc tính của từng món trong 10 món để thử nghiệm các kiểu **mặc phá hành** (chấp nhận bỏ dòng ẩn ở một số vị trí để đổi hệ khác hoặc kích chéo), và **lưu lại thành nhiều bộ (Save/Load Presets)** trong `localStorage` hoặc xuất/nhập file cấu hình.

---

## 2. Project Type (Loại Dự Án)
- **Project Type:** `WEB` (Interactive Single-Page Web Application - HTML5 / CSS3 / Vanilla JS ES6+ Modular hoặc chạy trực tiếp không cần cài đặt phức tạp, đảm bảo tốc độ mở tức thì và lưu trữ `localStorage`).
- **Primary Agent:** `frontend-specialist`
- **Supporting Agent:** `project-planner`

---

## 3. Success Criteria (Tiêu Chí Hoàn Thành)
1. **Chuẩn Bố Cục 10 Ô VLTK 1:**
   - Cột Trái (4 ô): `Hộ Uyển (Bao tay)`, `Nhẫn Trên`, `Nhẫn Dưới`, `Ngọc Bội`.
   - Cột Giữa (3 ô): `Đầu Khôi (Mũ)`, `Y Phục (Áo)`, `Yêu Đái (Đai lưng)`.
   - Cột Phải (3 ô): `Hạng Liên (Dây chuyền)`, `Vũ Khí`, `Hài (Giày)`.
2. **Chọn Hệ Nhân Vật Ngay Tại Ô Tên:** Cho phép chuyển đổi mượt mà giữa 5 hệ `Kim`, `Mộc`, `Thủy`, `Hỏa`, `Thổ` và cập nhật trạng thái kích dòng của cả 10 món ngay lập tức (real-time).
3. **Engine Kích Ngũ Hành Chuẩn VLTK 1 (Quy Tắc 5 Cặp Trang Bị Kinh Điển):**
   - Trong VLTK 1, 10 món trang bị được chia thành **5 cặp đồng hành** kích nối tiếp nhau theo vòng tròn khép kín:
     - **Cặp 1 (`Y Phục / Áo` + `Hạng Liên / Dây chuyền`)** ← Cần **`Nhẫn Dưới` + `Yêu Đái (Thắt lưng)`** để kích thuộc tính âm.
     - **Cặp 2 (`Vũ Khí` + `Đầu Khôi / Nón`)** ← Cần **`Y Phục (Áo)` + `Hạng Liên (Dây chuyền)`** để kích thuộc tính âm.
     - **Cặp 3 (`Hài / Giày` + `Nhẫn Trên`)** ← Cần **`Vũ Khí` + `Đầu Khôi (Nón)`** để kích thuộc tính âm.
     - **Cặp 4 (`Hộ Uyển / Bao tay` + `Ngọc Bội`)** ← Cần **`Hài (Giày)` + `Nhẫn Trên`** để kích thuộc tính âm.
     - **Cặp 5 (`Yêu Đái / Thắt lưng` + `Nhẫn Dưới`)** ← Cần **`Hộ Uyển (Bao tay)` + `Ngọc Bội`** để kích thuộc tính âm.
   - **Chi tiết từng món trong 10 món:**
     1. **Y Phục (Áo)** ← cần `Nhẫn Dưới` + `Thắt Lưng` (+ `Hệ Nhân Vật` nếu tương sinh)
     2. **Hạng Liên (Dây chuyền)** ← cần `Thắt Lưng` + `Nhẫn Dưới` (+ `Hệ Nhân Vật` nếu tương sinh)
     3. **Vũ Khí** ← cần `Dây Chuyền` + `Y Phục` (+ `Hệ Nhân Vật` nếu tương sinh)
     4. **Đầu Khôi (Nón)** ← cần `Y Phục` + `Dây Chuyền` (+ `Hệ Nhân Vật` nếu tương sinh)
     5. **Hài (Giày)** ← cần `Vũ Khí` + `Nón` (+ `Hệ Nhân Vật` nếu tương sinh)
     6. **Nhẫn Trên** ← cần `Vũ Khí` + `Nón` (+ `Hệ Nhân Vật` nếu tương sinh)
     7. **Hộ Uyển (Bao tay)** ← cần `Giày` + `Nhẫn Trên` (+ `Hệ Nhân Vật` nếu tương sinh)
     8. **Ngọc Bội** ← cần `Giày` + `Nhẫn Trên` (+ `Hệ Nhân Vật` nếu tương sinh)
     9. **Yêu Đái (Thắt lưng)** ← cần `Ngọc Bội` + `Hộ Uyển` (+ `Hệ Nhân Vật` nếu tương sinh)
     10. **Nhẫn Dưới** ← cần `Hộ Uyển` + `Ngọc Bội` (+ `Hệ Nhân Vật` nếu tương sinh)
   - Mỗi món có **3 Dòng Hiện (Hiện 1, 2, 3 - luôn sáng)** xen kẽ với **3 Dòng Ẩn / Thuộc tính âm (Ẩn 1, Ẩn 2, Ẩn 3)**.
   - Dưới đáy Tooltip mỗi món luôn hiển thị câu nhắc chuẩn VLTK 1: `"Cần hệ [Hệ Tương Sinh] của [Món 1] và [Món 2] để kích thuộc tính âm"`.
4. **Tự Do Phá Hành & Lưu Trữ (Save/Load):**
   - Đổi hệ bất kỳ cho từng món đồ (không khóa cứng dây chuyền).
   - Cảnh báo/hiển thị trực quan những vị trí đang "Phá hành" (đứt mạch tương sinh) nhưng vẫn cho phép mặc và lưu bình thường.
   - Lưu/Tải nhiều cấu hình (Presets) vào `localStorage`, đặt tên bộ đồ (VD: *"Set Kim Kích Thủy Chuẩn"*, *"Set Phá Hành Giày + Nhẫn"*), xóa hoặc khôi phục bộ mặc định.

---

## 4. Tech Stack (Công Nghệ Sử Dụng)
| Thành phần | Lựa chọn | Lý do (Rationale) |
| :--- | :--- | :--- |
| **Core UI** | HTML5 Semantic + CSS3 Custom Variables | Chạy trực tiếp cực nhanh, dễ tùy biến khung viền cổ điển VLTK 1 (pixel/oriental border, màu chữ chuẩn game) |
| **Logic & State** | Vanilla JavaScript (ES6 Modules) | Tách biệt rõ Engine tính toán Ngũ Hành (`nguHanhEngine.js`), Dữ liệu trang bị (`equipmentData.js`) và Giao diện (`app.js`) |
| **Storage** | Browser `localStorage` + JSON Import/Export | Lưu trữ bền vững các bộ phối đồ "chuẩn" lẫn "phá hành" ngay trên máy người dùng mà không cần cài Database |
| **Graphics / Visuals** | SVG Icons & Canvas/SVG Connection Lines | Vẽ biểu tượng 10 món trang bị, icon 5 hệ Ngũ Hành và đường tia sáng nối món kích → món được kích |

---

## 5. File Structure (Cấu Trúc Thư Mục Dự Kiến)
```plaintext
Đồ Ngũ Hành VLTK1/
├── jx1-equipment-ui.md        # Bản kế hoạch dự án (File hiện tại)
├── index.html                 # Giao diện chính: Khung Hệ Thống Nhân Vật 10 món + Bảng Điều Khiển
├── css/
│   ├── variables.css          # Bảng màu chuẩn VLTK 1 (Vàng hoàng kim, Xanh dòng hiện, Xám dòng ẩn, 5 màu Ngũ Hành)
│   └── jx1-ui.css             # Style khung nhân vật cổ điển, 10 ô trang bị, Tooltip, Bảng Lưu Phối Đồ
└── js/
    ├── equipmentData.js       # Dữ liệu 10 ô trang bị, quy tắc tương sinh/tương khắc, thuộc tính tượng trưng theo hệ
    ├── nguHanhEngine.js       # Thuật toán tính nguồn kích (Hệ nhân vật + 2 món quy định) & phát hiện "Phá hành"
    ├── storageManager.js      # Quản lý Lưu / Tải / Xóa / Xuất / Nhập các bộ trang bị (bao gồm các bộ Phá hành)
    └── app.js                 # Xử lý sự kiện UI, render 10 ô đồ, Tooltip chuẩn VLTK 1 và bảng tổng hợp
```

---

## 6. Task Breakdown (Chi Tiết Công Việc)

### Task 1: Xây dựng cơ sở dữ liệu Ngũ Hành & 10 món trang bị (`js/equipmentData.js`)
- **Agent:** `frontend-specialist` | **Skill:** `clean-code`
- **Priority:** P0 | **Dependencies:** None
- **INPUT:** Quy tắc Ngũ Hành VLTK 1 và danh sách 10 vị trí trang bị.
- **OUTPUT:** File `js/equipmentData.js` chứa:
  - 5 Hệ (`KIM`, `MOC`, `THUY`, `HOA`, `THO`) kèm quan hệ `sinh` (VD: Kim sinh Thủy), `duocSinhBoi` (Thủy được sinh bởi Kim), `khac` và `biKhac`.
  - Sơ đồ 10 ô trang bị kèm 2 vị trí kích quy định của từng ô.
  - Bộ thuộc tính tượng trưng tự động theo Hệ (VD: Hệ Mộc có Kháng Lôi, Thời gian trúng độc; Hệ Thủy có Kháng Hỏa, Thời gian làm chậm; Hệ Hỏa có Phòng thủ vật lý, Thời gian phục hồi; Hệ Thổ có Kháng Băng, Thời gian choáng; Hệ Kim có Kháng Độc, Sinh lực/Nội lực...).
- **VERIFY:** Kiểm tra mapping 10 món đảm bảo mỗi món có đúng 2 món kích chuẩn VLTK 1.

### Task 2: Xây dựng Engine tính kích dòng ẩn & nhận diện Phá Hành (`js/nguHanhEngine.js`)
- **Agent:** `frontend-specialist` | **Skill:** `clean-code`
- **Priority:** P0 | **Dependencies:** Task 1
- **INPUT:** Hệ Nhân Vật hiện tại + Hệ của 10 món trang bị đang mặc.
- **OUTPUT:** Hàm tính toán cho từng món trong 10 món:
  - Kiểm tra **Nguồn kích 1 (Hệ Nhân Vật):** Nếu `heNhanVat` sinh `heTrangBi` (VD: Nhân vật hệ Kim, trang bị hệ Thủy) → `activeByChar = true` (+1 dòng ẩn tự kích).
  - Kiểm tra **Nguồn kích 2 & 3 (2 món trang bị quy định):** Đếm xem có bao nhiêu món trong 2 vị trí quy định mang hệ tương sinh với món đang xét.
  - Tổng hợp số dòng ẩn được kích (`0`, `1`, `2`, hoặc `3` dòng ẩn) và đánh dấu trạng thái (Kích tối đa / Kích một phần / Phá hành).
- **VERIFY:** Test case: Chọn Nhân vật Hệ Kim, mặc Nón Hệ Thủy (chưa mặc Vũ khí & Bao tay hệ Kim) → Nón Hệ Thủy tự động sáng Dòng Ẩn 1. Đổi Nón sang Hệ Hỏa (phá hành) → Nón mất kích từ nhân vật, chỉ sáng nếu Vũ khí hoặc Bao tay là Hệ Mộc.

### Task 3: Xây dựng bộ quản lý Lưu / Mở cấu hình Phá Hành & Chuẩn (`js/storageManager.js`)
- **Agent:** `frontend-specialist` | **Skill:** `clean-code`
- **Priority:** P1 | **Dependencies:** Task 1
- **INPUT:** Trạng thái Hệ Nhân Vật + 10 món trang bị (kể cả cấu hình phá hành).
- **OUTPUT:** Module lưu trữ vào `localStorage`:
  - Lưu bộ phối đồ mới với tên tùy chọn (VD: *"Phá hành Áo + Nhẫn"*) và ghi chú.
  - Danh sách Preset mẫu có sẵn (1 bộ *Full Kích Chuẩn Theo Hệ Nhân Vật*, 1 bộ *Phá Hành Thực Chiến*).
  - Nút Tải lại (Load), Xóa (Delete), Sao chép mã chia sẻ (Export/Import JSON).
- **VERIFY:** Chỉnh 3 món phá hành, bấm "Lưu Bộ Đồ", tải lại trang (F5) → Mở lại bộ vừa lưu thấy giữ nguyên chính xác hệ của từng món và hệ nhân vật.

### Task 4: Thiết kế Giao Diện Khung Nhân Vật 10 Món chuẩn VLTK 1 (`index.html`, `css/`)
- **Agent:** `frontend-specialist` | **Skill:** `frontend-design`
- **Priority:** P1 | **Dependencies:** Task 1
- **INPUT:** Ảnh mẫu giao diện `HỆ THỐNG NHÂN VẬT` VLTK 1.
- **OUTPUT:**
  - Khung giao diện cổ điển VLTK 1 với tiêu đề `HỆ THỐNG NHÂN VẬT`, thanh chọn **Ngũ Hành Nhân Vật (Kim / Mộc / Thủy / Hỏa / Thổ)** thay cho ô Tên nhân vật.
  - Đúng 10 ô trang bị xếp 3 cột quanh bóng nhân vật trung tâm, hiển thị rõ nhãn Hệ, biểu tượng món đồ, chấm trạng thái số dòng ẩn đã kích (`1/3`, `2/3`, `3/3`) và hiệu ứng tia nối tương sinh.
  - Tooltip chuẩn VLTK 1 (chữ Vàng/Xanh lá cho dòng hiện & dòng ẩn đã kích, chữ Xám cho dòng ẩn chưa kích, kèm chú thích nguồn kích từ Nhân Vật và 2 món đồ).
- **VERIFY:** Giao diện hiển thị sắc nét, đúng chất kiếm hiệp cổ điển VLTK 1, không sử dụng màu tím AI-slop, tương thích cả Desktop và Mobile.

### Task 5: Kết nối Tương Tác UI, Đổi Hệ Từng Món & Bảng Tổng Hợp (`js/app.js`)
- **Agent:** `frontend-specialist` | **Skill:** `frontend-architecture`, `clean-code`
- **Priority:** P1 | **Dependencies:** Task 2, Task 3, Task 4
- **INPUT:** Toàn bộ modules dữ liệu, engine, storage và giao diện HTML/CSS.
- **OUTPUT:**
  - Click vào ô Tên (Hệ Nhân Vật) → Đổi hệ nhân vật & cập nhật tức thì toàn bộ 10 món.
  - Click vào bất kỳ ô nào trong 10 ô trang bị → Mở bảng chỉnh nhanh Hệ (Kim/Mộc/Thủy/Hỏa/Thổ) hoặc tùy chỉnh dòng kháng/thuộc tính của món đó (hỗ trợ phối phá hành tự do).
  - Nút **"Tự Động Xếp Chuẩn Dây Chuyền"** (gợi ý xếp 10 món chuẩn tương sinh theo hệ nhân vật) VÀ khu vực **"Lưu / Mở Bộ Phối Đồ (Hỗ trợ Phá Hành)"**.
  - Bảng thống kê tổng số dòng kháng & thuộc tính đang kích hoạt của cả bộ 10 món.
- **VERIFY:** Thử nghiệm đổi hệ nhân vật, đổi lẻ từng món để phá hành, kiểm tra Tooltip và bảng tổng hợp kháng cập nhật chính xác 100%.

---

## 7. Phase X: Final Verification Checklist (Kiểm Tra Cuối Cùng)
- [x] Kiểm tra đúng 10 ô trang bị (không dư các ô Mặt nạ, Ngựa, Phi phong, Ấn).
- [x] Kiểm tra ô Tên nhân vật đã được thay bằng bộ chọn Ngũ Hành Nhân Vật (`Kim`, `Mộc`, `Thủy`, `Hỏa`, `Thổ`).
- [x] Kiểm tra logic 5 Cặp Kích Thuộc Tính Âm chuẩn VLTK 1 (VD: Áo & Dây chuyền cần Nhẫn trái dưới và Thắt lưng; Nhân vật hệ X tự động kích 1 dòng ẩn cho mọi trang bị hệ Y với X sinh Y).
- [x] Kiểm tra tính năng Mặc Phá Hành & Lưu/Tải bộ đồ hoạt động mượt mà qua `localStorage`.

## ✅ PHASE X COMPLETE
- Architecture & Clean Code: ✅ Pass (Modular JS separation: Data, Engine, Storage, UI)
- Design Spec (`DESIGN.md`): ✅ Pass (Classic VLTK 1 Bronze/Gold/Jade palette, zero purple)
- 5-Pair VLTK 1 Activation Engine: ✅ Verified against in-game screenshot (`Kim Phong Kỳ Lân Huyết`)
- Date: 2026-11-08

