---
version: 1.0
name: Vo Lam Truyen Ky 1 - Classic Ngu Hanh HUD
description: Authentic JX1 (Vo Lam Truyen Ky 1) 10-slot equipment simulator & Ngu Hanh activation studio
colors:
  primary: "#D4AF37"
  secondary: "#4ADE80"
  tertiary: "#DC2626"
  neutral: "#0B0E0C"
  surface: "#141A16"
  surface-elevated: "#1C241E"
  on-surface: "#F3E5AB"
  on-surface-muted: "#78827A"
  border-bronze: "#6E5A34"
  border-gold: "#C5A059"
  element-kim: "#FACC15"
  element-moc: "#4ADE80"
  element-thuy: "#38BDF8"
  element-hoa: "#F87171"
  element-tho: "#D97706"
  attr-visible: "#7DD3FC"
  attr-hidden-active: "#FDE047"
  attr-hidden-inactive: "#64748B"
  error: "#EF4444"
typography:
  headline-display:
    fontFamily: "Tahoma, 'Noto Serif', serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.08em
  headline-md:
    fontFamily: "Tahoma, sans-serif"
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.3
  body-md:
    fontFamily: "Tahoma, 'Segoe UI', sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.45
  body-sm:
    fontFamily: "Tahoma, 'Segoe UI', sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
  label-md:
    fontFamily: "Tahoma, monospace"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.04em
rounded:
  none: 0px
  sm: 2px
  md: 4px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 20px
  xl: 28px
components:
  equipment-slot:
    backgroundColor: "{colors.neutral}"
    rounded: "{rounded.none}"
    padding: 4px
  button-jx1:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 8px
---

# Vo Lam Truyen Ky 1 - Classic Ngu Hanh HUD

## Overview
Giao diện mô phỏng bảng **Hệ Thống Nhân Vật - Trang Bị (10 món)** lấy cảm hứng trực tiếp từ tượng đài **Võ Lâm Truyền Kỳ 1 (JX1)**. Thiết kế tái hiện cảm giác hoài niệm kiếm hiệp cổ điển với khung viền đồng cổ, nền gấm tối, bảng thuộc tính chữ xanh/vàng/xám trên nền đen đặc trưng, kết hợp cùng bảng điều khiển tương tác hiện đại giúp người chơi thử nghiệm kích Ngũ Hành chuẩn hoặc phối đồ **Phá Hành** và lưu trữ bộ đồ nhanh chóng.

## Colors
- **Primary (`#D4AF37` - Hoàng Kim Đồng Cổ):** Màu tiêu đề `HỆ THỐNG NHÂN VẬT`, khung viền trang bị đang chọn và các dòng kích hoạt tối đa.
- **Secondary (`#4ADE80` - Lục Ngọc):** Màu hiển thị trạng thái nhân vật ("Chưa trùng sinh", thông báo kích hoạt thành công).
- **Neutral (`#0B0E0C` / `#141A16` - Hắc Ngọc Gấm Tối):** Nền của các ô trang bị và nền Tooltip thuộc tính chuẩn VLTK 1.
- **Ngũ Hành Palette:**
  - **Kim (`#FACC15`):** Vàng Kim sắc bén.
  - **Mộc (`#4ADE80`):** Xanh Lục thảo mộc.
  - **Thủy (`#38BDF8`):** Xanh Lam thủy triều.
  - **Hỏa (`#F87171`):** Đỏ Hỏa diệm.
  - **Thổ (`#D97706`):** Nâu Vàng trầm thổ.
- **Màu Dòng Thuộc Tính Trang Bị:**
  - **Dòng Hiện (`#7DD3FC`):** Xanh dương sáng (luôn kích hoạt khi mặc).
  - **Dòng Ẩn Đã Kích (`#FDE047`):** Vàng sáng / Xanh lục nổi bật khi đủ nguồn tương sinh.
  - **Dòng Ẩn Chưa Kích (`#64748B`):** Xám mờ khi thiếu nguồn kích (hoặc cố tình mặc phá hành).

## Typography
Sử dụng hệ font `Tahoma` kết hợp nét chữ sắc cạnh chuẩn giao diện client VLTK 1 trên PC, giúp các dòng thuộc tính (`Sinh lực tối đa`, `Kháng hỏa`, `Thời gian làm chậm`...) hiển thị rõ ràng, dễ đọc ở kích thước 12px–14px.

## Layout
Bố cục chia thành 3 khu vực chính trên màn hình Desktop (tự động xếp dọc trên Mobile):
1. **Cột Trái / Trung Tâm Chính — Khung `HỆ THỐNG NHÂN VẬT` (Chuẩn VLTK 1):**
   - Thanh tiêu đề chạm khắc cổ điển.
   - Hàng chọn **Ngũ Hành Nhân Vật (Kim / Mộc / Thủy / Hỏa / Thổ)** đặt ngay tại ô **Tên Nhân Vật** truyền thống.
   - Sân khấu 10 ô trang bị chia 3 cột quanh hình bóng hiệp khách:
     - **Trái (4 món):** Hộ Uyển (Bao tay), Nhẫn Trên, Nhẫn Dưới, Ngọc Bội.
     - **Giữa (3 món):** Đầu Khôi (Mũ), Y Phục (Áo), Yêu Đái (Đai lưng).
     - **Phải (3 món):** Hạng Liên (Dây chuyền), Vũ Khí, Hài (Giày).
   - Lớp SVG nằm đè (overlay) vẽ đường tia sáng nối trực tiếp từ **Hệ Nhân Vật** và **2 món đồ mồi** sang món đồ đang chọn.
2. **Cột Giữa — Xưởng Chỉnh Đồ & Chi Tiết Kích Ngũ Hành (Inspector & Editor):**
   - Xem chi tiết món đồ đang chọn (chuẩn Tooltip VLTK 1: 3 dòng hiện + 3 dòng ẩn).
   - Đổi nhanh Hệ Ngũ Hành (`Kim`, `Mộc`, `Thủy`, `Hỏa`, `Thổ`) và tùy chỉnh dòng thuộc tính của từng món để thử nghiệm cả **Mặc Chuẩn** lẫn **Mặc Phá Hành**.
3. **Cột Phải — Tổng Hợp Chỉ Số & Quản Lý Bộ Phối Đồ (Presets & Save/Load):**
   - Bảng cộng dồn toàn bộ chỉ số kháng & thuộc tính đã kích hoạt của 10 món.
   - Quản lý **Lưu / Mở / Xóa / Xuất JSON** các bộ trang bị (bao gồm các bộ **Phá Hành**).

## Elevation & Depth
Sử dụng viền kép (Double bevel borders `#6E5A34` và `#C5A059`) kết hợp bóng đổ sâu (`0 12px 32px rgba(0,0,0,0.85)`) để tái hiện độ nổi khối của cửa sổ F3 trong VLTK 1.

## Shapes
Tuân thủ quy tắc góc sắc cạnh (`0px` đến `2px` border-radius) đặc trưng của giao diện game kiếm hiệp 2D cổ điển. Không dùng bo tròn kiểu SaaS hiện đại.

## Components
- **Equipment Slot (10 ô):** Kích thước tỷ lệ chuẩn VLTK 1 (Áo và Vũ khí cao lớn; Yêu đái nằm ngang; Mũ, Giày, Bao tay, Ngọc bội, Hạng liên, Nhẫn cân đối), có huy hiệu Ngũ Hành ở góc và 3 chấm đèn báo số dòng ẩn đã kích (`0/3` → `3/3`).
- **Character Element Selector:** Đặt tại ô `Tên` trên đỉnh khung nhân vật, cho phép chọn nhanh `Hệ Kim`, `Hệ Mộc`, `Hệ Thủy`, `Hệ Hỏa`, `Hệ Thổ`.
- **JX1 Tooltip Card:** Nền đen tuyền viền vàng đồng, liệt kê tên trang bị, Hệ Ngũ Hành, 3 dòng hiện và 3 dòng ẩn kèm chú thích rõ nguồn nào đang kích (từ Nhân Vật hay từ món đồ nào).

## Do's and Don'ts
- **Do:** Giữ đúng 10 ô trang bị Ngũ Hành cốt lõi và cơ chế Nhân Vật tự kích 1 dòng ẩn cho trang bị hệ tương sinh.
- **Do:** Cho phép người dùng mặc phá hành tự do và lưu lại thành nhiều bản phối đồ trong `localStorage`.
- **Don't:** Tuyệt đối không sử dụng màu tím/indigo (Purple Ban) hoặc các thẻ bo tròn kiểu Bento SaaS.
- **Don't:** Không thêm các ô phụ ngoài 10 món (như Mặt nạ, Ngựa, Phi phong, Ấn) để giữ giao diện tập trung đúng yêu cầu.

