(function (global) {
  "use strict";

  const ELEMENTS = {
    KIM: {
      id: "KIM",
      luaIndex: 0,
      name: "Kim",
      fullName: "Hệ Kim",
      factions: "Thiếu Lâm / Thiên Vương",
      color: "#FACC15",
      sinh: "THUY",
      duocSinhBoi: "THO",
      khac: "MOC",
      biKhac: "HOA",
      resistanceLabel: "Kháng độc",
      defaultHidden1: "Kháng độc: +25% [101]",
      defaultHidden2: "Chuyển hóa sát thương thành nội lực: +10% [134]",
      defaultHidden3: "Sức mạnh: +20 điểm [97]"
    },
    MOC: {
      id: "MOC",
      luaIndex: 1,
      name: "Mộc",
      fullName: "Hệ Mộc",
      factions: "Đường Môn / Ngũ Độc",
      color: "#4ADE80",
      sinh: "HOA",
      duocSinhBoi: "THUY",
      khac: "THO",
      biKhac: "KIM",
      resistanceLabel: "Kháng lôi",
      defaultHidden1: "Kháng lôi: +30% [103]",
      defaultHidden2: "Chuyển hóa sát thương thành nội lực: +15% [134]",
      defaultHidden3: "Thời gian trúng độc: -40% [108]"
    },
    THUY: {
      id: "THUY",
      luaIndex: 2,
      name: "Thủy",
      fullName: "Hệ Thủy",
      factions: "Nga My / Thúy Yên",
      color: "#38BDF8",
      sinh: "MOC",
      duocSinhBoi: "KIM",
      khac: "HOA",
      biKhac: "THO",
      resistanceLabel: "Kháng hỏa",
      defaultHidden1: "Kháng hỏa: +25% [102]",
      defaultHidden2: "Thời gian làm choáng: -40% [110]",
      defaultHidden3: "Chuyển hóa sát thương thành nội lực: +15% [134]"
    },
    HOA: {
      id: "HOA",
      luaIndex: 3,
      name: "Hỏa",
      fullName: "Hệ Hỏa",
      factions: "Cái Bang / Thiên Nhẫn",
      color: "#F87171",
      sinh: "THO",
      duocSinhBoi: "MOC",
      khac: "KIM",
      biKhac: "THUY",
      resistanceLabel: "Phòng thủ vật lý",
      defaultHidden1: "Phòng thủ vật lý: +25% [104]",
      defaultHidden2: "Thời gian làm chậm: -40% [106]",
      defaultHidden3: "Chuyển hóa sát thương thành nội lực: +15% [134]"
    },
    THO: {
      id: "THO",
      luaIndex: 4,
      name: "Thổ",
      fullName: "Hệ Thổ",
      factions: "Võ Đang / Côn Lôn",
      color: "#D97706",
      sinh: "KIM",
      duocSinhBoi: "HOA",
      khac: "THUY",
      biKhac: "MOC",
      resistanceLabel: "Kháng băng",
      defaultHidden1: "Kháng băng: +25% [105]",
      defaultHidden2: "Thời gian trúng độc: -40% [108]",
      defaultHidden3: "Chuyển hóa sát thương thành nội lực: +15% [134]"
    }
  };

  const ELEMENT_ORDER = ["KIM", "THUY", "MOC", "HOA", "THO"];

  /**
   * 10 Ô Trang Bị Chuẩn VLTK 1 chia theo 5 Cặp Kích Thuộc Tính Âm
   */
  const SLOTS = {
    ho_uyen: {
      id: "ho_uyen",
      column: "left",
      orderInCol: 1,
      pairId: 4,
      name: "Hộ Uyển (Bao tay)",
      shortName: "Hộ Uyển",
      tooltipReqName: "Hộ uyển",
      luaPrefix: "pa_nam_bao_tay_",
      nhanTrangBiBase: "1,4,1,",
      defaultItemName: "Thiên Tằm Hộ Uyển [Cấp 10]",
      baseStats: ["Né tránh: 240 điểm", "Độ bền: 65 / 65", "Đẳng cấp yêu cầu: 76"],
      requiredSlots: ["hai", "nhan_tren"],
      activatesSlots: ["yeu_dai", "nhan_duoi"],
      svg: `<svg viewBox="0 0 64 64" class="slot-icon-svg" fill="none">
        <path d="M18 14L30 10L34 46L20 50L18 14Z" fill="#2A342D" stroke="#60A5FA" stroke-width="2"/>
        <path d="M32 16L46 12L48 48L34 52L32 16Z" fill="#37443B" stroke="#93C5FD" stroke-width="2"/>
        <circle cx="25" cy="24" r="3" fill="#38BDF8"/>
        <circle cx="40" cy="26" r="3" fill="#38BDF8"/>
        <path d="M18 36H33M33 38H47" stroke="#7DD3FC" stroke-width="2"/>
      </svg>`
    },
    nhan_tren: {
      id: "nhan_tren",
      column: "left",
      orderInCol: 2,
      pairId: 3,
      name: "Nhẫn Trên (Nhẫn phải)",
      shortName: "Nhẫn Trên",
      tooltipReqName: "Nhẫn trên",
      luaPrefix: "pa_chung_nhan_",
      nhanTrangBiBase: "1,9,0,",
      defaultItemName: "Càn Khôn Giới Chỉ [Cấp 10]",
      baseStats: ["Độ bền: 55 / 55", "Đẳng cấp yêu cầu: 75"],
      requiredSlots: ["vu_khi", "dau_khoi"],
      activatesSlots: ["ho_uyen", "ngoc_boi"],
      svg: `<svg viewBox="0 0 64 64" class="slot-icon-svg" fill="none">
        <circle cx="32" cy="34" r="16" stroke="#60A5FA" stroke-width="4" fill="rgba(56,189,248,0.12)"/>
        <polygon points="32,10 39,17 32,22 25,17" fill="#38BDF8" stroke="#E0F2FE" stroke-width="1.5"/>
      </svg>`
    },
    nhan_duoi: {
      id: "nhan_duoi",
      column: "left",
      orderInCol: 3,
      pairId: 5,
      name: "Nhẫn Dưới (Nhẫn trái)",
      shortName: "Nhẫn Dưới",
      tooltipReqName: "Nhẫn dưới",
      luaPrefix: "pa_chung_nhan_",
      nhanTrangBiBase: "1,9,0,",
      defaultItemName: "Lam Bảo Giới Chỉ [Cấp 10]",
      baseStats: ["Độ bền: 58 / 60", "Đẳng cấp yêu cầu: 75"],
      requiredSlots: ["ho_uyen", "ngoc_boi"],
      activatesSlots: ["y_phuc", "hang_lien"],
      svg: `<svg viewBox="0 0 64 64" class="slot-icon-svg" fill="none">
        <circle cx="32" cy="34" r="16" stroke="#93C5FD" stroke-width="4.5" fill="rgba(147,197,253,0.12)"/>
        <polygon points="32,11 38,18 32,23 26,18" fill="#4ADE80" stroke="#E0F2FE" stroke-width="1.5"/>
      </svg>`
    },
    ngoc_boi: {
      id: "ngoc_boi",
      column: "left",
      orderInCol: 4,
      pairId: 4,
      name: "Ngọc Bội (Hương nang)",
      shortName: "Ngọc Bội",
      tooltipReqName: "Ngọc bội",
      luaPrefix: "pa_nam_ngoc_boi_",
      nhanTrangBiBase: "1,7,1,",
      defaultItemName: "Dương Chi Bạch Ngọc [Cấp 10]",
      baseStats: ["Độ bền: 70 / 70", "Đẳng cấp yêu cầu: 78"],
      requiredSlots: ["hai", "nhan_tren"],
      activatesSlots: ["yeu_dai", "nhan_duoi"],
      svg: `<svg viewBox="0 0 64 64" class="slot-icon-svg" fill="none">
        <path d="M32 8V18" stroke="#38BDF8" stroke-width="2.5"/>
        <circle cx="32" cy="32" r="14" stroke="#4ADE80" stroke-width="4" fill="rgba(74,222,128,0.15)"/>
        <circle cx="32" cy="32" r="5" stroke="#86EFAC" stroke-width="1.5"/>
        <path d="M29 46L27 58M32 46V59M35 46L37 58" stroke="#38BDF8" stroke-width="2"/>
      </svg>`
    },
    dau_khoi: {
      id: "dau_khoi",
      column: "center",
      orderInCol: 1,
      pairId: 2,
      name: "Đầu Khôi (Mũ / Nón)",
      shortName: "Đầu Khôi",
      tooltipReqName: "Nón",
      luaPrefix: "pa_nam_non_",
      nhanTrangBiBase: "1,5,3,",
      defaultItemName: "Thông Thiên Phát Quán [Cấp 10]",
      baseStats: ["Né tránh: 380 điểm", "Độ bền: 72 / 75", "Đẳng cấp yêu cầu: 76"],
      requiredSlots: ["y_phuc", "hang_lien"],
      activatesSlots: ["hai", "nhan_tren"],
      svg: `<svg viewBox="0 0 64 64" class="slot-icon-svg" fill="none">
        <path d="M32 8L37 16H27L32 8Z" fill="#38BDF8"/>
        <path d="M16 36C16 22 23 16 32 16C41 16 48 22 48 36L52 46H12L16 36Z" fill="#1E3A5F" stroke="#60A5FA" stroke-width="2"/>
        <circle cx="32" cy="30" r="5" fill="#7DD3FC" stroke="#1D4ED8" stroke-width="1.5"/>
        <path d="M20 46V52M44 46V52" stroke="#93C5FD" stroke-width="2.5"/>
      </svg>`
    },
    y_phuc: {
      id: "y_phuc",
      column: "center",
      orderInCol: 2,
      pairId: 1,
      name: "Y Phục (Áo giáp)",
      shortName: "Y Phục",
      tooltipReqName: "Y phục",
      luaPrefix: "pa_nam_ao_",
      nhanTrangBiBase: "1,1,4,",
      defaultItemName: "Đường Nghê Giáp [Cấp 10]",
      baseStats: ["Né tránh: 720 điểm", "Độ bền: 80 / 80", "Đẳng cấp yêu cầu: 78"],
      requiredSlots: ["nhan_duoi", "yeu_dai"],
      activatesSlots: ["vu_khi", "dau_khoi"],
      svg: `<svg viewBox="0 0 64 64" class="slot-icon-svg" fill="none">
        <path d="M20 12L10 22L16 30L22 24V52H42V24L48 30L54 22L44 12L36 16H28L20 12Z" fill="#1E3A5F" stroke="#7DD3FC" stroke-width="2"/>
        <path d="M22 32H42M28 16V52M36 16V52" stroke="#60A5FA" stroke-width="1.8"/>
        <rect x="26" y="29" width="12" height="6" fill="#38BDF8"/>
      </svg>`
    },
    yeu_dai: {
      id: "yeu_dai",
      column: "center",
      orderInCol: 3,
      pairId: 5,
      name: "Yêu Đái (Thắt lưng)",
      shortName: "Yêu Đái",
      tooltipReqName: "Thắt lưng",
      luaPrefix: "pa_chung_dai_lung_",
      nhanTrangBiBase: "1,2,1,",
      defaultItemName: "Thiên Cơ Yêu Đái [Cấp 10]",
      baseStats: ["Né tránh: 260 điểm", "Độ bền: 68 / 70", "Đẳng cấp yêu cầu: 74"],
      requiredSlots: ["ngoc_boi", "ho_uyen"],
      activatesSlots: ["y_phuc", "hang_lien"],
      svg: `<svg viewBox="0 0 64 40" class="slot-icon-svg" fill="none">
        <rect x="6" y="11" width="52" height="18" rx="2" fill="#172554" stroke="#60A5FA" stroke-width="2"/>
        <polygon points="32,8 40,20 32,32 24,20" fill="#38BDF8" stroke="#E0F2FE" stroke-width="2"/>
        <path d="M12 16H22M42 16H52M12 24H22M42 24H52" stroke="#93C5FD" stroke-width="1.8"/>
      </svg>`
    },
    hang_lien: {
      id: "hang_lien",
      column: "right",
      orderInCol: 1,
      pairId: 1,
      name: "Hạng Liên (Dây chuyền)",
      shortName: "Hạng Liên",
      tooltipReqName: "Dây chuyền",
      luaPrefix: "pa_nam_day_chuyen_",
      nhanTrangBiBase: "1,0,1,",
      defaultItemName: "Hộ Tâm Kính [Cấp 10]",
      baseStats: ["Độ bền: 65 / 65", "Đẳng cấp yêu cầu: 76"],
      requiredSlots: ["yeu_dai", "nhan_duoi"],
      activatesSlots: ["vu_khi", "dau_khoi"],
      svg: `<svg viewBox="0 0 64 48" class="slot-icon-svg" fill="none">
        <path d="M14 14C14 28 24 34 32 34C40 34 50 28 50 14" stroke="#60A5FA" stroke-width="3" fill="none"/>
        <circle cx="32" cy="35" r="6" fill="#38BDF8" stroke="#E0F2FE" stroke-width="2"/>
        <circle cx="21" cy="28" r="3" fill="#93C5FD"/>
        <circle cx="43" cy="28" r="3" fill="#93C5FD"/>
      </svg>`
    },
    vu_khi: {
      id: "vu_khi",
      column: "right",
      orderInCol: 2,
      pairId: 2,
      name: "Vũ Khí (Binh khí)",
      shortName: "Vũ Khí",
      tooltipReqName: "Vũ khí",
      luaPrefix: "pa_vk_",
      nhanTrangBiBase: "1,6,1,",
      defaultItemName: "Huyền Thiết Trọng Kiếm [Cấp 10]",
      baseStats: ["Sát thương cơ bản: 55 - 95", "Độ bền: 90 / 90", "Đẳng cấp yêu cầu: 78"],
      requiredSlots: ["hang_lien", "y_phuc"],
      activatesSlots: ["hai", "nhan_tren"],
      svg: `<svg viewBox="0 0 64 96" class="slot-icon-svg" fill="none">
        <polygon points="32,6 40,22 37,64 27,64 24,22" fill="#94A3B8" stroke="#7DD3FC" stroke-width="2"/>
        <line x1="32" y1="12" x2="32" y2="62" stroke="#38BDF8" stroke-width="2"/>
        <path d="M16 64H48L44 70H20L16 64Z" fill="#38BDF8" stroke="#E0F2FE" stroke-width="1.5"/>
        <rect x="29" y="70" width="6" height="14" fill="#1E3A8A" stroke="#93C5FD" stroke-width="1.5"/>
        <circle cx="32" cy="87" r="4" fill="#60A5FA"/>
      </svg>`
    },
    hai: {
      id: "hai",
      column: "right",
      orderInCol: 3,
      pairId: 3,
      name: "Hài (Giày)",
      shortName: "Hài (Giày)",
      tooltipReqName: "Giày",
      luaPrefix: "pa_nam_giay_",
      nhanTrangBiBase: "1,3,1,",
      defaultItemName: "Thiên Lý Ngoa [Cấp 10]",
      baseStats: ["Né tránh: 310 điểm", "Độ bền: 70 / 70", "Đẳng cấp yêu cầu: 76"],
      requiredSlots: ["vu_khi", "dau_khoi"],
      activatesSlots: ["ho_uyen", "ngoc_boi"],
      svg: `<svg viewBox="0 0 64 64" class="slot-icon-svg" fill="none">
        <path d="M14 16H28V40L34 46V52H12V16Z" fill="#1E3A5F" stroke="#60A5FA" stroke-width="2"/>
        <path d="M34 14H48V38L54 44V50H32V14Z" fill="#1D4ED8" stroke="#93C5FD" stroke-width="2"/>
        <path d="M14 24H28M34 22H48" stroke="#38BDF8" stroke-width="2"/>
      </svg>`
    }
  };

  const FIVE_PAIRS = [
    {
      pairId: 1,
      title: "Cặp 1: Áo & Dây chuyền",
      slots: ["y_phuc", "hang_lien"],
      activatedByPairId: 5,
      requiredSlotNames: "Nhẫn dưới và Thắt lưng"
    },
    {
      pairId: 2,
      title: "Cặp 2: Vũ khí & Nón",
      slots: ["vu_khi", "dau_khoi"],
      activatedByPairId: 1,
      requiredSlotNames: "Y phục (Áo) và Dây chuyền"
    },
    {
      pairId: 3,
      title: "Cặp 3: Giày & Nhẫn trên",
      slots: ["hai", "nhan_tren"],
      activatedByPairId: 2,
      requiredSlotNames: "Vũ khí và Nón"
    },
    {
      pairId: 4,
      title: "Cặp 4: Bao tay (Hộ uyển) & Ngọc bội",
      slots: ["ho_uyen", "ngoc_boi"],
      activatedByPairId: 3,
      requiredSlotNames: "Giày và Nhẫn trên"
    },
    {
      pairId: 5,
      title: "Cặp 5: Thắt lưng & Nhẫn dưới",
      slots: ["yeu_dai", "nhan_duoi"],
      activatedByPairId: 4,
      requiredSlotNames: "Hộ uyển (Bao tay) và Ngọc bội"
    }
  ];

  /**
   * Sinh danh sách các Set thuộc tính (Set 1 -> Set 8) chuẩn xác từ bộ file .lua trong dự án:
   * - Đai lưng (pa_chung_dai_lung_*.lua), Bao tay (pa_nam_bao_tay_*.lua), Nón (pa_nam_non_*.lua)
   * - Áo (pa_nam_ao_*.lua) -> có Thời gian phục hồi -40 [113] và Phản đòn cận chiến +20% [117]
   * - Giày (pa_nam_giay_*.lua) -> có Tốc độ di chuyển +40% [111]
   * - Dây chuyền (pa_nam_day_chuyen_*.lua) -> có Kháng tất cả +20% [114], Phục hồi thể lực +9 [96], Kỹ năng +1 [139]
   * - Nhẫn (pa_chung_nhan_*.lua) -> có Phục hồi thể lực +5~9 [96], Kỹ năng +1 [139], kháng theo hệ (Nhẫn Hỏa có TG làm chậm -40% [106], Thân pháp +20 [98], không có PTVL)
   * - Ngọc bội (pa_nam_ngoc_boi_*.lua) -> có Phục hồi nội lực +4 [92], Kỹ năng +1 [139], kháng theo hệ (Ngọc bội Hỏa có TG làm chậm -40% [106], không có PTVL)
   * - Vũ khí (pa_vk_*.lua) -> Băng sát / Độc sát / Hỏa sát / Lôi sát nội ngoại công, Tốc độ đánh +30% [115], STVL +100% [126]
   */
  function getLuaSetsForSlotAndElement(slotId, elementId) {
    const slotMeta = SLOTS[slotId];
    const elMeta = ELEMENTS[elementId] || ELEMENTS.KIM;
    const elSlug = elementId.toLowerCase();
    let luaFileName = slotMeta.luaPrefix + elSlug + ".lua";
    if (slotId === "vu_khi") {
      const vkMap = {
        KIM: "pa_vk_bsnc.lua (hoặc Ngoại công STVL)",
        MOC: "pa_vk_dsnc.lua",
        THUY: "pa_vk_bsnc.lua",
        HOA: "pa_vk_hsnc.lua / pa_vk_khong_tuoc_linh_hoa.lua",
        THO: "pa_vk_lsnc.lua"
      };
      luaFileName = vkMap[elementId];
    }

    // 1. NHÓM ĐAI LƯNG (yeu_dai), HỘ UYỂN (ho_uyen), ĐẦU KHÔI (dau_khoi)
    if (slotId === "yeu_dai" || slotId === "ho_uyen" || slotId === "dau_khoi") {
      if (elementId === "HOA") {
        // Chuẩn 8 set trong pa_chung_dai_lung_hoa.lua / pa_nam_bao_tay_hoa.lua / pa_nam_non_hoa.lua
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(104,106) • DongAn_2(104,106)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 190 + NL 190 + TL 190 + PTVL 25 + Thân pháp 20 + TG làm chậm 40",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Thân pháp: +20 điểm [98] (Kèm Thể lực +190 [93])"],
              hiddenLines: ["Phòng thủ vật lý: +25% [104]", "Thời gian làm chậm: -40% [106]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            },
            {
              setId: "set2",
              name: "Set 2: SL 180 + NL 180 + Không thể phá hủy + PTVL 25 + Thân pháp 20 + TG làm chậm 40",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]", "Không thể phá hủy [43] (Kèm Thân pháp +20 [98])"],
              hiddenLines: ["Phòng thủ vật lý: +25% [104]", "Thời gian làm chậm: -40% [106]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            },
            {
              setId: "set3",
              name: "Set 3: SL 180 + TL 180 + Không thể phá hủy + PTVL 25 + Thân pháp 20 + TG làm chậm 40",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Thể lực tối đa: +180 điểm [93]", "Không thể phá hủy [43] (Kèm Thân pháp +20 [98])"],
              hiddenLines: ["Phòng thủ vật lý: +25% [104]", "Thời gian làm chậm: -40% [106]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            },
            {
              setId: "set4",
              name: "Set 4: SL 180 + NL 180 + Phục hồi SL +1~5 + PTVL 25 + Thân pháp 20 + TG làm chậm 40",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]", "Phục hồi sinh lực mỗi nửa giây: +5 điểm [88]"],
              hiddenLines: ["Phòng thủ vật lý: +25% [104]", "Thời gian làm chậm: -40% [106]", "Thân pháp: +20 điểm [98]"]
            },
            {
              setId: "set5",
              name: "Set 5: SL 180 + TL 180 + Phục hồi SL +1~5 + PTVL 25 + Thân pháp 20 + TG làm chậm 40",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Thể lực tối đa: +180 điểm [93]", "Phục hồi sinh lực mỗi nửa giây: +5 điểm [88]"],
              hiddenLines: ["Phòng thủ vật lý: +25% [104]", "Thời gian làm chậm: -40% [106]", "Thân pháp: +20 điểm [98]"]
            },
            {
              setId: "set6",
              name: "Set 6: PTVL 23% + Chuyển hóa sát thương thành nội lực 13% + TG làm chậm 40%",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]", "Thân pháp: +20 điểm [98]"],
              hiddenLines: ["Phòng thủ vật lý: +23% [104]", "Chuyển hóa sát thương thành nội lực: +13% [134]", "Thời gian làm chậm: -40% [106]"]
            },
            {
              setId: "set7",
              name: "Set 7: SL 180 + Phục hồi SL +1 + PTVL 25% + CHSTTNL 15% + TG làm chậm 40%",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Phục hồi sinh lực mỗi nửa giây: +1 điểm [88]", "Nội lực tối đa: +180 điểm [89]"],
              hiddenLines: ["Phòng thủ vật lý: +25% [104]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Thời gian làm chậm: -40% [106]"]
            },
            {
              setId: "set8",
              name: "Set 8: SL 180 + Không thể phá hủy + PTVL 25% + CHSTTNL 15% + TG làm chậm 40%",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Không thể phá hủy [43]", "Nội lực tối đa: +180 điểm [89]"],
              hiddenLines: ["Phòng thủ vật lý: +25% [104]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Thời gian làm chậm: -40% [106]"]
            }
          ]
        };
      }

      if (elementId === "THUY") {
        // Chuẩn 8 set trong pa_chung_dai_lung_thuy.lua / pa_nam_bao_tay_thuy.lua / pa_nam_non_thuy.lua
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(102,110) • DongAn_2(102,110)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 190 + NL 190 + TL 190 + Kháng hỏa 25% + Sinh khí 20 + TG làm choáng 40%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Sinh khí: +20 điểm [99] (Kèm Thể lực +190 [93])"],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            },
            {
              setId: "set2",
              name: "Set 2: SL 180 + NL 180 + Không thể phá hủy + Kháng hỏa 25% + Sinh khí 20 + TG choáng 40%",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]", "Không thể phá hủy [43] (Kèm Sinh khí +20 [99])"],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            },
            {
              setId: "set4",
              name: "Set 4: SL 190 + NL 190 + Phục hồi SL +1~5 + Kháng hỏa 25% + Sinh khí 20 + TG choáng 40%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Phục hồi sinh lực mỗi nửa giây: +5 điểm [88]"],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Sinh khí: +20 điểm [99]"]
            },
            {
              setId: "set7",
              name: "Set 7: SL 170~190 + Phục hồi SL +1 + Kháng hỏa 25% + CHSTTNL 15% + TG choáng 40%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Phục hồi sinh lực mỗi nửa giây: +1 điểm [88]", "Nội lực tối đa: +180 điểm [89]"],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Thời gian làm choáng: -40% [110]"]
            }
          ]
        };
      }

      if (elementId === "MOC") {
        // Chuẩn 8 set trong pa_chung_dai_lung_moc.lua / pa_nam_bao_tay_moc.lua / pa_nam_non_moc.lua
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(103)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 190 + NL 190 + TL 190 + Kháng lôi 30%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Thể lực tối đa: +190 điểm [93]"],
              hiddenLines: ["Kháng lôi: +30% [103]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Thời gian trúng độc: -40% [108]"]
            },
            {
              setId: "set2",
              name: "Set 2: SL 190 + NL 190 + Không thể phá hủy + Kháng lôi 30%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Không thể phá hủy [43]"],
              hiddenLines: ["Kháng lôi: +30% [103]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Thời gian trúng độc: -40% [108]"]
            },
            {
              setId: "set3",
              name: "Set 3: SL 190 + NL 190 + Phục hồi SL +5 + Kháng lôi 30%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Phục hồi sinh lực mỗi nửa giây: +5 điểm [88]"],
              hiddenLines: ["Kháng lôi: +30% [103]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Thời gian trúng độc: -40% [108]"]
            },
            {
              setId: "set4",
              name: "Set 4: SL 180 + NL 180 + TL 180 + Kháng lôi 30% + CHSTTNL 15%",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]", "Thể lực tối đa: +180 điểm [93]"],
              hiddenLines: ["Kháng lôi: +30% [103]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Phục hồi sinh lực mỗi nửa giây: +1 điểm [88]"]
            }
          ]
        };
      }

      if (elementId === "THO") {
        // Chuẩn pa_chung_dai_lung_tho.lua / pa_nam_bao_tay_tho.lua / pa_nam_non_tho.lua
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(105,108) • DongAn_2(105,108)",
          sets: [
            {
              setId: "set1",
              name: "Set 1 (Lọc Thông Minh): SL 190 + NL 190 + Kháng băng 25% + TG trúng độc 40% + CHSTTNL 15%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Thể lực tối đa: +180 điểm [93]"],
              hiddenLines: ["Kháng băng: +25% [105]", "Thời gian trúng độc: -40% [108]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            },
            {
              setId: "set2",
              name: "Set 2: SL 190 + NL 190 + Không thể phá hủy + Kháng băng 25% + TG trúng độc 40%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Không thể phá hủy [43]"],
              hiddenLines: ["Kháng băng: +25% [105]", "Thời gian trúng độc: -40% [108]", "Phục hồi sinh lực mỗi nửa giây: +5 điểm [88]"]
            }
          ]
        };
      }

      // KIM
      return {
        luaFile: luaFileName,
        dongAnRule: "DongAn_1(101)",
        sets: [
          {
            setId: "set1",
            name: "Set 1 (Lọc Thông Minh): SL 190 + NL 190 + Không thể phá hủy + Kháng độc 25% + CHSTTNL 10%",
            visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Không thể phá hủy [43]"],
            hiddenLines: ["Kháng độc: +25% [101]", "Chuyển hóa sát thương thành nội lực: +10% [134]", "Phục hồi sinh lực mỗi nửa giây: +5 điểm [88]"]
          },
          {
            setId: "set2",
            name: "Set 2: SL 180 + NL 180 + TL 180 + Kháng độc 25% + Phục hồi SL +5",
            visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]", "Thể lực tối đa: +180 điểm [93]"],
            hiddenLines: ["Kháng độc: +25% [101]", "Phục hồi sinh lực mỗi nửa giây: +5 điểm [88]", "Chuyển hóa sát thương thành nội lực: +10% [134]"]
          }
        ]
      };
    }

    // 2. Y PHỤC / ÁO (pa_nam_ao_*.lua) - Đặc trưng có Thời gian phục hồi -40 [113] và Phản đòn cận chiến +20% [117]
    if (slotId === "y_phuc") {
      if (elementId === "HOA") {
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(104,106) • DongAn_2(104,106)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 180 + NL 180 + TG phục hồi -40 + PTVL 25% + TG làm chậm -40% + Thân pháp 20",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]", "Thời gian phục hồi: -40 [113]"],
              hiddenLines: ["Phòng thủ vật lý: +25% [104]", "Thời gian làm chậm: -40% [106]", "Thân pháp: +20 điểm [98]"]
            },
            {
              setId: "set3",
              name: "Set 3: SL 180 + Phản đòn cận chiến 20% + TG phục hồi -40 + PTVL 25% + TG làm chậm -40%",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Thời gian phục hồi: -40 [113]", "Phản đòn cận chiến: +20% [117]"],
              hiddenLines: ["Phòng thủ vật lý: +25% [104]", "Thời gian làm chậm: -40% [106]", "Thân pháp: +20 điểm [98]"]
            },
            {
              setId: "set4",
              name: "Set 4: SL 180 + Không thể phá hủy + TG phục hồi -40 + PTVL 25% + TG làm chậm -40%",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Thời gian phục hồi: -40 [113]", "Không thể phá hủy [43]"],
              hiddenLines: ["Phòng thủ vật lý: +25% [104]", "Thời gian làm chậm: -40% [106]", "Thân pháp: +20 điểm [98]"]
            },
            {
              setId: "set6",
              name: "Set 6: SL 130 + TG phục hồi -40 + PTVL 23% + TG làm chậm -40% + CHSTTNL 13%",
              visibleLines: ["Sinh lực tối đa: +130 điểm [85]", "Thời gian phục hồi: -40 [113]", "Nội lực tối đa: +180 điểm [89]"],
              hiddenLines: ["Phòng thủ vật lý: +23% [104]", "Thời gian làm chậm: -40% [106]", "Chuyển hóa sát thương thành nội lực: +13% [134]"]
            }
          ]
        };
      }
      if (elementId === "THUY") {
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(102,110) • DongAn_2(102,110)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 180 + NL 180 + TG phục hồi -40 + Kháng hỏa 25% + TG choáng -40% + Sinh khí 20",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]", "Thời gian phục hồi: -40 [113]"],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Sinh khí: +20 điểm [99]"]
            },
            {
              setId: "set2",
              name: "Set 2: SL 180 + TL 180 + TG phục hồi -40 + Kháng hỏa 25% + TG choáng -40% + Sinh khí 20",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Thể lực tối đa: +180 điểm [93]", "Thời gian phục hồi: -40 [113]"],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Sinh khí: +20 điểm [99]"]
            },
            {
              setId: "set3",
              name: "Set 3: SL 180 + Phản đòn 20% + TG phục hồi -40 + Kháng hỏa 25% + TG choáng -40%",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Thời gian phục hồi: -40 [113]", "Phản đòn cận chiến: +20% [117]"],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Sinh khí: +20 điểm [99]"]
            },
            {
              setId: "set4",
              name: "Set 4: SL 180 + Không thể phá hủy + TG phục hồi -40 + Kháng hỏa 25% + TG choáng -40%",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Thời gian phục hồi: -40 [113]", "Không thể phá hủy [43]"],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Sinh khí: +20 điểm [99]"]
            },
            {
              setId: "set6",
              name: "Set 6: SL 130 + TG phục hồi -40 + Kháng hỏa 23% + TG choáng -40% + CHSTTNL 13%",
              visibleLines: ["Sinh lực tối đa: +130 điểm [85]", "Thời gian phục hồi: -40 [113]", "Nội lực tối đa: +180 điểm [89]"],
              hiddenLines: ["Kháng hỏa: +23% [102]", "Thời gian làm choáng: -40% [110]", "Chuyển hóa sát thương thành nội lực: +13% [134]"]
            }
          ]
        };
      }
      if (elementId === "MOC") {
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(103)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 190 + NL 190 + TG phục hồi -40 + Kháng lôi 30%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Thời gian phục hồi: -40 [113]"],
              hiddenLines: ["Kháng lôi: +30% [103]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Phản đòn cận chiến: +20% [117]"]
            },
            {
              setId: "set2",
              name: "Set 2: SL 190 + TL 190 + TG phục hồi -40 + Kháng lôi 30%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Thể lực tối đa: +190 điểm [93]", "Thời gian phục hồi: -40 [113]"],
              hiddenLines: ["Kháng lôi: +30% [103]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Không thể phá hủy [43]"]
            },
            {
              setId: "set3",
              name: "Set 3: SL 190 + Không thể phá hủy + TG phục hồi -40 + Kháng lôi 30%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Thời gian phục hồi: -40 [113]", "Không thể phá hủy [43]"],
              hiddenLines: ["Kháng lôi: +30% [103]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Phục hồi sinh lực mỗi nửa giây: +1 điểm [88]"]
            },
            {
              setId: "set5",
              name: "Set 5: SL 190 + Phản đòn cận chiến 20% + TG phục hồi -40 + Kháng lôi 30%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Thời gian phục hồi: -40 [113]", "Phản đòn cận chiến: +20% [117]"],
              hiddenLines: ["Kháng lôi: +30% [103]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Không thể phá hủy [43]"]
            },
            {
              setId: "set6",
              name: "Set 6: SL 160 + TG phục hồi -40 + Kháng lôi 30% + CHSTTNL 15%",
              visibleLines: ["Sinh lực tối đa: +160 điểm [85]", "Thời gian phục hồi: -40 [113]", "Nội lực tối đa: +180 điểm [89]"],
              hiddenLines: ["Kháng lôi: +30% [103]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Phục hồi sinh lực mỗi nửa giây: +1 điểm [88]"]
            }
          ]
        };
      }
      if (elementId === "THO") {
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(105,108) • DongAn_2(105,108)",
          sets: [
            {
              setId: "set1",
              name: "Set 1 (Lọc Thông Minh): SL 190 + NL 180 + TG phục hồi -40 + Kháng băng 25% + TG trúng độc -40% + CHSTTNL 15%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +180 điểm [89]", "Thời gian phục hồi: -40 [113]"],
              hiddenLines: ["Kháng băng: +25% [105]", "Thời gian trúng độc: -40% [108]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            },
            {
              setId: "set2",
              name: "Set 2: SL 180 + Phản đòn cận chiến 20% + TG phục hồi -40 + Kháng băng 25% + TG trúng độc -40%",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Thời gian phục hồi: -40 [113]", "Phản đòn cận chiến: +20% [117]"],
              hiddenLines: ["Kháng băng: +25% [105]", "Thời gian trúng độc: -40% [108]", "Không thể phá hủy [43]"]
            }
          ]
        };
      }
      // ÁO KIM
      return {
        luaFile: luaFileName,
        dongAnRule: "DongAn_1(101)",
        sets: [
          {
            setId: "set1",
            name: "Set 1: SL 180 + NL 180 + TG phục hồi -40 + Kháng độc 25% + Phản đòn 20% + CHSTTNL 10%",
            visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]", "Thời gian phục hồi: -40 [113]"],
            hiddenLines: ["Kháng độc: +25% [101]", "Phản đòn cận chiến: +20% [117]", "Chuyển hóa sát thương thành nội lực: +10% [134]"]
          },
          {
            setId: "set2",
            name: "Set 2: SL 190 + Không thể phá hủy + TG phục hồi -40 + Kháng độc 25%",
            visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Thời gian phục hồi: -40 [113]", "Không thể phá hủy [43]"],
            hiddenLines: ["Kháng độc: +25% [101]", "Chuyển hóa sát thương thành nội lực: +10% [134]", "Phục hồi sinh lực mỗi nửa giây: +5 điểm [88]"]
          }
        ]
      };
    }

    // 3. HÀI / GIÀY (pa_nam_giay_*.lua) - Đặc trưng có Tốc độ di chuyển +40% [111]
    if (slotId === "hai") {
      if (elementId === "HOA") {
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(104,106) • DongAn_2(104,106)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 190 + NL 190 + Tốc chạy 40% + PTVL 25% + TG làm chậm -40% + Thân pháp 20",
              visibleLines: ["Tốc độ di chuyển: +40% [111]", "Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]"],
              hiddenLines: ["Phòng thủ vật lý: +25% [104]", "Thời gian làm chậm: -40% [106]", "Thân pháp: +20 điểm [98]"]
            },
            {
              setId: "set2",
              name: "Set 2: SL 190 + TL 190 + Tốc chạy 40% + PTVL 25% + TG làm chậm -40% + Thân pháp 20",
              visibleLines: ["Tốc độ di chuyển: +40% [111]", "Sinh lực tối đa: +190 điểm [85]", "Thể lực tối đa: +190 điểm [93]"],
              hiddenLines: ["Phòng thủ vật lý: +25% [104]", "Thời gian làm chậm: -40% [106]", "Thân pháp: +20 điểm [98]"]
            },
            {
              setId: "set3",
              name: "Set 3: SL 180 + Không thể phá hủy + Tốc chạy 40% + PTVL 25% + TG làm chậm -40%",
              visibleLines: ["Tốc độ di chuyển: +40% [111]", "Sinh lực tối đa: +180 điểm [85]", "Không thể phá hủy [43]"],
              hiddenLines: ["Phòng thủ vật lý: +25% [104]", "Thời gian làm chậm: -40% [106]", "Thân pháp: +20 điểm [98]"]
            },
            {
              setId: "set5",
              name: "Set 5: SL 130 + Tốc chạy 33% + PTVL 25% + TG làm chậm -40% + CHSTTNL 13%",
              visibleLines: ["Tốc độ di chuyển: +33% [111]", "Sinh lực tối đa: +130 điểm [85]", "Không thể phá hủy [43]"],
              hiddenLines: ["Phòng thủ vật lý: +25% [104]", "Thời gian làm chậm: -40% [106]", "Chuyển hóa sát thương thành nội lực: +13% [134]"]
            }
          ]
        };
      }
      if (elementId === "THUY") {
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(102,110) • DongAn_2(102,110)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 180 + NL 180 + Tốc chạy 40% + Kháng hỏa 25% + TG choáng -40% + Sinh khí 20",
              visibleLines: ["Tốc độ di chuyển: +40% [111]", "Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]"],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Sinh khí: +20 điểm [99]"]
            },
            {
              setId: "set3",
              name: "Set 3: SL 180 + Không thể phá hủy + Tốc chạy 40% + Kháng hỏa 25% + TG choáng -40%",
              visibleLines: ["Tốc độ di chuyển: +40% [111]", "Sinh lực tối đa: +180 điểm [85]", "Không thể phá hủy [43]"],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Sinh khí: +20 điểm [99]"]
            },
            {
              setId: "set5",
              name: "Set 5: SL 130 + Tốc chạy 33% + Kháng hỏa 25% + TG choáng -40% + CHSTTNL 13%",
              visibleLines: ["Tốc độ di chuyển: +33% [111]", "Sinh lực tối đa: +130 điểm [85]", "Nội lực tối đa: +180 điểm [89]"],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Chuyển hóa sát thương thành nội lực: +13% [134]"]
            }
          ]
        };
      }
      if (elementId === "MOC") {
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(103)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 180 + NL 180 + Tốc chạy 40% + Kháng lôi 30%",
              visibleLines: ["Tốc độ di chuyển: +40% [111]", "Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]"],
              hiddenLines: ["Kháng lôi: +30% [103]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Phục hồi sinh lực mỗi nửa giây: +1 điểm [88]"]
            },
            {
              setId: "set3",
              name: "Set 3: SL 180 + Không thể phá hủy + Tốc chạy 40% + Kháng lôi 30%",
              visibleLines: ["Tốc độ di chuyển: +40% [111]", "Sinh lực tối đa: +180 điểm [85]", "Không thể phá hủy [43]"],
              hiddenLines: ["Kháng lôi: +30% [103]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Phục hồi sinh lực mỗi nửa giây: +1 điểm [88]"]
            },
            {
              setId: "set5",
              name: "Set 5: SL 170 + Tốc chạy 40% + Kháng lôi 30% + CHSTTNL 15%",
              visibleLines: ["Tốc độ di chuyển: +40% [111]", "Sinh lực tối đa: +170 điểm [85]", "Nội lực tối đa: +180 điểm [89]"],
              hiddenLines: ["Kháng lôi: +30% [103]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Phục hồi sinh lực mỗi nửa giây: +1 điểm [88]"]
            }
          ]
        };
      }
      if (elementId === "THO") {
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(105,108) • DongAn_2(105,108)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 180 + NL 180 + Tốc chạy 40% + Kháng băng 25% + TG trúng độc -40%",
              visibleLines: ["Tốc độ di chuyển: +40% [111]", "Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]"],
              hiddenLines: ["Kháng băng: +25% [105]", "Thời gian trúng độc: -40% [108]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            },
            {
              setId: "set4",
              name: "Set 4: SL 180 + Không thể phá hủy + Tốc chạy 40% + Kháng băng 25% + TG trúng độc -40%",
              visibleLines: ["Tốc độ di chuyển: +40% [111]", "Sinh lực tối đa: +180 điểm [85]", "Không thể phá hủy [43]"],
              hiddenLines: ["Kháng băng: +25% [105]", "Thời gian trúng độc: -40% [108]", "Phục hồi sinh lực mỗi nửa giây: +1 điểm [88]"]
            }
          ]
        };
      }
      // GIÀY KIM
      return {
        luaFile: luaFileName,
        dongAnRule: "DongAn_1(101)",
        sets: [
          {
            setId: "set1",
            name: "Set 1: SL 180 + NL 180 + Tốc chạy 40% + Kháng độc 25% + CHSTTNL 10%",
            visibleLines: ["Tốc độ di chuyển: +40% [111]", "Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]"],
            hiddenLines: ["Kháng độc: +25% [101]", "Chuyển hóa sát thương thành nội lực: +10% [134]", "Phục hồi sinh lực mỗi nửa giây: +5 điểm [88]"]
          }
        ]
      };
    }

    // 4. HẠNG LIÊN / DÂY CHUYỀN (pa_nam_day_chuyen_*.lua) - Đặc trưng có Kháng tất cả +20% [114] & Kỹ năng +1 [139]
    if (slotId === "hang_lien") {
      if (elementId === "HOA") {
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(106)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 190 + NL 190 + Kháng tất cả 20% + Thân pháp 20 + TG làm chậm -40%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Kháng tất cả: +20% [114]"],
              hiddenLines: ["Thời gian làm chậm: -40% [106]", "Thân pháp: +20 điểm [98]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            },
            {
              setId: "set7",
              name: "Set 7: Kỹ năng vốn có +1 cấp [139] + Kháng tất cả 20% + TG làm chậm -40%",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Kháng tất cả: +20% [114]", "Phục hồi thể lực mỗi nửa giây: +5 điểm [96]"],
              hiddenLines: ["Kỹ năng vốn có: +1 cấp [139]", "Thời gian làm chậm: -40% [106]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            }
          ]
        };
      }
      if (elementId === "THUY") {
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(102,110) • DongAn_2(102,110)",
          sets: [
            {
              setId: "set1",
              name: "Set 1 (Lọc Thông Minh): SL 190 + NL 190 + Kháng tất cả 20% + Kháng hỏa 25% + TG choáng -40% + CHSTTNL 15%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Kháng tất cả: +20% [114]"],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            },
            {
              setId: "set2",
              name: "Set 2: SL 180 + NL 180 + Kháng tất cả 20% + Kháng hỏa 25% + TG choáng -40% + Kỹ năng +1 [139]",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]", "Kháng tất cả: +20% [114]"],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Kỹ năng vốn có: +1 cấp [139]"]
            }
          ]
        };
      }
      if (elementId === "MOC") {
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(103)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 190 + NL 190 + Kháng tất cả 20% + Kháng lôi 30% + CHSTTNL 15%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Kháng tất cả: +20% [114]"],
              hiddenLines: ["Kháng lôi: +30% [103]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Kỹ năng vốn có: +1 cấp [139]"]
            },
            {
              setId: "set2",
              name: "Set 2: SL 180 + Kháng tất cả 20% + Phục hồi TL +9 + Kháng lôi 30% + Kỹ năng +1 [139]",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Kháng tất cả: +20% [114]", "Phục hồi thể lực mỗi nửa giây: +9 điểm [96]"],
              hiddenLines: ["Kháng lôi: +30% [103]", "Kỹ năng vốn có: +1 cấp [139]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            }
          ]
        };
      }
      if (elementId === "THO") {
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(105,108) • DongAn_2(105,108)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 190 + NL 190 + Kháng tất cả 20% + Kháng băng 25% + TG trúng độc -40%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Kháng tất cả: +20% [114]"],
              hiddenLines: ["Kháng băng: +25% [105]", "Thời gian trúng độc: -40% [108]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            },
            {
              setId: "set2",
              name: "Set 2: SL 180 + NL 180 + Kháng tất cả 20% + Kháng băng 25% + TG trúng độc -40% + Kỹ năng +1 [139]",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]", "Kháng tất cả: +20% [114]"],
              hiddenLines: ["Kháng băng: +25% [105]", "Thời gian trúng độc: -40% [108]", "Kỹ năng vốn có: +1 cấp [139]"]
            }
          ]
        };
      }
      // DÂY CHUYỀN KIM
      return {
        luaFile: luaFileName,
        dongAnRule: "DongAn_1(97,101) • DongAn_2(97,101)",
        sets: [
          {
            setId: "set1",
            name: "Set 1: SL 190 + NL 190 + Kháng tất cả 20% + Kháng độc 25% + Sức mạnh 20 + CHSTTNL 10%",
            visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Kháng tất cả: +20% [114]"],
            hiddenLines: ["Kháng độc: +25% [101]", "Sức mạnh: +20 điểm [97]", "Chuyển hóa sát thương thành nội lực: +10% [134]"]
          },
          {
            setId: "set2",
            name: "Set 2: SL 180 + Kháng tất cả 20% + Kháng độc 25% + Sức mạnh 20 + Kỹ năng +1 [139]",
            visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]", "Kháng tất cả: +20% [114]"],
            hiddenLines: ["Kháng độc: +25% [101]", "Sức mạnh: +20 điểm [97]", "Kỹ năng vốn có: +1 cấp [139]"]
          }
        ]
      };
    }

    // 5. NHẪN TRÊN & NHẪN DƯỚI (pa_chung_nhan_*.lua) và NGỌC BỘI (pa_nam_ngoc_boi_*.lua)
    if (slotId === "nhan_tren" || slotId === "nhan_duoi" || slotId === "ngoc_boi") {
      const recoveryLine =
        slotId === "ngoc_boi"
          ? "Phục hồi nội lực mỗi nửa giây: +4 điểm [92]"
          : "Phục hồi thể lực mỗi nửa giây: +5 điểm [96]";

      if (elementId === "HOA") {
        // Trong pa_chung_nhan_hoa.lua & pa_nam_ngoc_boi_hoa.lua: DongAn_1(106) (Không có PTVL 104!)
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(106)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 190 + NL 190 + TL 190 + Thân pháp 20 + TG làm chậm -40%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", recoveryLine],
              hiddenLines: ["Thời gian làm chậm: -40% [106]", "Thân pháp: +20 điểm [98]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            },
            {
              setId: "set2",
              name: "Set 2: SL 190 + NL 190 + Phục hồi + Thân pháp 20 + TG làm chậm -40%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", recoveryLine],
              hiddenLines: ["Thời gian làm chậm: -40% [106]", "Thân pháp: +20 điểm [98]", "Phục hồi sinh lực mỗi nửa giây: +5 điểm [88]"]
            },
            {
              setId: "set4",
              name: "Set 4: SL 180 + NL 180 + CHSTTNL 15% + TG làm chậm -40% + Kỹ năng +1 [139]",
              visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]", recoveryLine],
              hiddenLines: ["Thời gian làm chậm: -40% [106]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Kỹ năng vốn có: +1 cấp [139]"]
            }
          ]
        };
      }
      if (elementId === "THUY") {
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(102,110) • DongAn_2(102,110)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 190 + NL 190 + TL 190 + Kháng hỏa 25% + TG làm choáng -40%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Thể lực tối đa: +190 điểm [93]"],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Sinh khí: +20 điểm [99]"]
            },
            {
              setId: "set2",
              name: "Set 2: SL 190 + NL 190 + Phục hồi + Kháng hỏa 25% + TG làm choáng -40%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", recoveryLine],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            },
            {
              setId: "set4",
              name: "Set 4: Kỹ năng vốn có +1 cấp [139] + Kháng hỏa 25% + TG làm choáng -40%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", recoveryLine],
              hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Kỹ năng vốn có: +1 cấp [139]"]
            }
          ]
        };
      }
      if (elementId === "MOC") {
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(103)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 190 + NL 190 + TL 190 + Kháng lôi 30%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Thể lực tối đa: +190 điểm [93]"],
              hiddenLines: ["Kháng lôi: +30% [103]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Thời gian trúng độc: -40% [108]"]
            },
            {
              setId: "set2",
              name: "Set 2: SL 190 + NL 190 + Phục hồi + Kháng lôi 30%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", recoveryLine],
              hiddenLines: ["Kháng lôi: +30% [103]", "Chuyển hóa sát thương thành nội lực: +15% [134]", "Phục hồi sinh lực mỗi nửa giây: +5 điểm [88]"]
            },
            {
              setId: "set4",
              name: "Set 4: Kỹ năng vốn có +1 cấp [139] + Kháng lôi 30%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", recoveryLine],
              hiddenLines: ["Kháng lôi: +30% [103]", "Kỹ năng vốn có: +1 cấp [139]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            }
          ]
        };
      }
      if (elementId === "THO") {
        return {
          luaFile: luaFileName,
          dongAnRule: "DongAn_1(105,108) • DongAn_2(105,108)",
          sets: [
            {
              setId: "set1",
              name: "Set 1: SL 190 + NL 190 + TL 190 + Kháng băng 25% + TG trúng độc -40%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Thể lực tối đa: +190 điểm [93]"],
              hiddenLines: ["Kháng băng: +25% [105]", "Thời gian trúng độc: -40% [108]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            },
            {
              setId: "set2",
              name: "Set 2: SL 190 + NL 190 + Phục hồi + Kháng băng 25% + TG trúng độc -40%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", recoveryLine],
              hiddenLines: ["Kháng băng: +25% [105]", "Thời gian trúng độc: -40% [108]", "Chuyển hóa sát thương thành nội lực: +15% [134]"]
            },
            {
              setId: "set4",
              name: "Set 4: Kỹ năng vốn có +1 cấp [139] + Kháng băng 25% + TG trúng độc -40%",
              visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", recoveryLine],
              hiddenLines: ["Kháng băng: +25% [105]", "Thời gian trúng độc: -40% [108]", "Kỹ năng vốn có: +1 cấp [139]"]
            }
          ]
        };
      }
      // NHẪN / NGỌC BỘI KIM
      return {
        luaFile: luaFileName,
        dongAnRule: "DongAn_1(97,101) • DongAn_2(97,101)",
        sets: [
          {
            setId: "set1",
            name: "Set 1: SL 190 + NL 190 + Kháng độc 25% + Sức mạnh 20 + CHSTTNL 10%",
            visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", recoveryLine],
            hiddenLines: ["Kháng độc: +25% [101]", "Sức mạnh: +20 điểm [97]", "Chuyển hóa sát thương thành nội lực: +10% [134]"]
          },
          {
            setId: "set2",
            name: "Set 2: SL 190 + NL 190 + Kỹ năng vốn có +1 cấp [139] + Kháng độc 25% + Sức mạnh 20",
            visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", recoveryLine],
            hiddenLines: ["Kháng độc: +25% [101]", "Sức mạnh: +20 điểm [97]", "Kỹ năng vốn có: +1 cấp [139]"]
          }
        ]
      };
    }

    // 6. VŨ KHÍ (pa_vk_*.lua)
    if (elementId === "THUY") {
      return {
        luaFile: "pa_vk_bsnc.lua",
        dongAnRule: "DongAn_1(169,110) • DongAn_2(169,110)",
        sets: [
          {
            setId: "set1",
            name: "Set 1 (Nội công - pa_vk_bsnc.lua): SL 190 + NL 190 + Băng sát nội công 190 + Kháng hỏa 25% + TG choáng 40%",
            visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Sinh khí: +20 điểm [99]"],
            hiddenLines: ["Băng sát nội công: +190 điểm [169]", "Thời gian làm choáng: -40% [110]", "Kháng hỏa: +25% [102]"]
          },
          {
            setId: "set3",
            name: "Set 3 (Ngoại công - pa_vk_bsnc.lua): SL 190 + Tốc đánh 30% + STVL 98% + Băng sát ngoại 98 + Kháng hỏa 25%",
            visibleLines: ["Tốc độ đánh ngoại công: +30% [115]", "Sát thương vật lý ngoại công: +98% [126]", "Băng sát ngoại công: +98 điểm [123]"],
            hiddenLines: ["Kháng hỏa: +25% [102]", "Thời gian làm choáng: -40% [110]", "Sinh lực tối đa: +190 điểm [85]"]
          }
        ]
      };
    }
    if (elementId === "MOC") {
      return {
        luaFile: "pa_vk_dsnc.lua",
        dongAnRule: "DongAn_1(172)",
        sets: [
          {
            setId: "set1",
            name: "Set 1 (pa_vk_dsnc.lua): SL 190 + NL 190 + Độc sát nội công 50 + Tốc đánh ngoại 30%",
            visibleLines: ["Sinh lực tối đa: +190 điểm [85]", "Nội lực tối đa: +190 điểm [89]", "Tốc độ đánh ngoại công: +30% [115]"],
            hiddenLines: ["Độc sát nội công: +50 điểm [172]", "Kháng lôi: +30% [103]", "Kỹ năng vốn có: +1 cấp [139]"]
          }
        ]
      };
    }
    if (elementId === "HOA") {
      return {
        luaFile: "pa_vk_hsnc.lua / pa_vk_khong_tuoc_linh_hoa.lua",
        dongAnRule: "DongAn_1(170,106) hoặc DongAn_1(122,104)",
        sets: [
          {
            setId: "set1",
            name: "Set 1 (Nội công - pa_vk_hsnc.lua): SL 180 + NL 180 + Hỏa sát nội công 190 + TG làm chậm 40%",
            visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]", "Thân pháp: +20 điểm [98]"],
            hiddenLines: ["Hỏa sát nội công: +190 điểm [170]", "Thời gian làm chậm: -40% [106]", "Kỹ năng vốn có: +1 cấp [139]"]
          },
          {
            setId: "set2",
            name: "Set 2 (Ngoại công - pa_vk_khong_tuoc_linh_hoa.lua): SL 190 + Tốc đánh 30% + STVL 100% + Hỏa sát ngoại 100 + PTVL 25%",
            visibleLines: ["Tốc độ đánh ngoại công: +30% [115]", "Sát thương vật lý ngoại công: +100% [126]", "Sinh lực tối đa: +190 điểm [85]"],
            hiddenLines: ["Hỏa sát ngoại công: +100 điểm [122]", "Phòng thủ vật lý: +25% [104]", "Thời gian làm chậm: -40% [106]"]
          }
        ]
      };
    }
    if (elementId === "THO") {
      return {
        luaFile: "pa_vk_lsnc.lua",
        dongAnRule: "DongAn_1(171,108) • DongAn_2(171,108)",
        sets: [
          {
            setId: "set1",
            name: "Set 1 (pa_vk_lsnc.lua): SL 180 + NL 180 + Lôi sát nội công 190 + TG trúng độc -40%",
            visibleLines: ["Sinh lực tối đa: +180 điểm [85]", "Nội lực tối đa: +180 điểm [89]", "Tốc độ đánh nội công: +40% [116]"],
            hiddenLines: ["Lôi sát nội công: +190 điểm [171]", "Thời gian trúng độc: -40% [108]", "Kỹ năng vốn có: +1 cấp [139]"]
          }
        ]
      };
    }
    // VŨ KHÍ KIM
    return {
      luaFile: "02_loc_do_5_hanh.lua (Vũ khí Hệ Kim)",
      dongAnRule: "DongAn_1(121,101)",
      sets: [
        {
          setId: "set1",
          name: "Set 1 (Vũ khí Kim Ngoại công): Tốc đánh 30% + STVL 100% + Hút sinh lực 8% + STVL 50 điểm + Kháng độc 25%",
          visibleLines: ["Tốc độ đánh ngoại công: +30% [115]", "Sát thương vật lý ngoại công: +100% [126]", "Sinh lực tối đa: +190 điểm [85]"],
          hiddenLines: ["Sát thương vật lý ngoại công: +50 điểm [121]", "Kháng độc: +25% [101]", "Hút sinh lực: +8% [136]"]
        }
      ]
    };
  }

  /**
   * Tạo cấu hình 1 món trang bị Đồ Xanh theo đúng Set trong file .lua của loại trang bị & hệ đó
   */
  function createSlotItem(slotId, elementId, customOverrides) {
    const slotMeta = SLOTS[slotId];
    const elMeta = ELEMENTS[elementId] || ELEMENTS.KIM;
    const luaInfo = getLuaSetsForSlotAndElement(slotId, elMeta.id);
    const firstSet = luaInfo.sets[0];

    const baseItem = {
      slotId: slotId,
      itemTier: "DO_XANH",
      element: elMeta.id,
      luaSetId: firstSet.setId,
      luaFile: luaInfo.luaFile,
      dongAnRule: luaInfo.dongAnRule,
      itemName: slotMeta.defaultItemName,
      visibleLines: [...firstSet.visibleLines],
      hiddenLines: [...firstSet.hiddenLines]
    };

    if (customOverrides) {
      return Object.assign(baseItem, customOverrides);
    }
    return baseItem;
  }

  /**
   * Tạo bộ 10 món Đồ Xanh chuẩn dây chuyền Ngũ Hành 5 cặp:
   * - Dạng 1 (mode = "BY_CHAR"): Nhân vật hệ gì mang Vũ Khí hệ đó (xoay 5 cặp theo charElement).
   * - Dạng 2A (mode = "BY_WEAPON_CHAIN"): Xoay 5 cặp theo Hệ Vũ Khí đang chọn (weaponElement), còn Hệ Nhân Vật (charElement) tự kích +1 dòng vào cặp tương sinh.
   * - Dạng 2B (mode = "BY_CHAR_AND_WEAPON"): Soi cả Nhân Vật (charElement) và Vũ Khí (weaponElement):
   *   Giữ dây chuyền chuẩn theo Hệ Nhân Vật (nhờ Nón giữ hệ Nhân Vật kết hợp dòng NV+1 để kích đủ 2 dòng ẩn cho cặp Giày + Nhẫn trên), riêng Vũ Khí mang hệ đang chọn!
   */
  function generateStandardChainEquipment(charElement, weaponElement, mode) {
    const cleanCharEl = ELEMENTS[charElement] ? charElement : "THUY";
    const cleanWeaponEl =
      weaponElement && ELEMENTS[weaponElement] ? weaponElement : cleanCharEl;

    // Nếu Dạng 2B (Soi cả NV và VK: Giữ mạch NV nhờ Nón + NV tự kích, còn Vũ Khí mang hệ đang chọn)
    if (mode === "BY_CHAR_AND_WEAPON" && cleanWeaponEl !== cleanCharEl) {
      const cIdx = ELEMENT_ORDER.indexOf(cleanCharEl);
      const p1 = ELEMENT_ORDER[(cIdx + 4) % 5]; // Áo + Dây chuyền
      const p2 = ELEMENT_ORDER[cIdx % 5];       // Nón (giữ hệ NV để cùng NV+1 kích đủ 2 dòng cho Giày + Nhẫn trên)
      const p3 = ELEMENT_ORDER[(cIdx + 1) % 5]; // Giày + Nhẫn trên (Hệ tương sinh của NV -> Nhận +1 từ NV + 1 từ Nón = Đủ 2 dòng ẩn!)
      const p4 = ELEMENT_ORDER[(cIdx + 2) % 5]; // Bao tay + Ngọc bội
      const p5 = ELEMENT_ORDER[(cIdx + 3) % 5]; // Thắt lưng + Nhẫn dưới

      return {
        y_phuc: createSlotItem("y_phuc", p1),
        hang_lien: createSlotItem("hang_lien", p1),
        vu_khi: createSlotItem("vu_khi", cleanWeaponEl),
        dau_khoi: createSlotItem("dau_khoi", p2),
        hai: createSlotItem("hai", p3),
        nhan_tren: createSlotItem("nhan_tren", p3),
        ho_uyen: createSlotItem("ho_uyen", p4),
        ngoc_boi: createSlotItem("ngoc_boi", p4),
        yeu_dai: createSlotItem("yeu_dai", p5),
        nhan_duoi: createSlotItem("nhan_duoi", p5)
      };
    }

    // Dạng 1 (quando cleanWeaponEl === cleanCharEl) hoặc Dạng 2A (Xoay 5 cặp theo Hệ Vũ Khí đang chọn)
    const wIdx = ELEMENT_ORDER.indexOf(cleanWeaponEl);
    const pair1El = ELEMENT_ORDER[(wIdx + 4) % 5]; // Hệ sinh ra Vũ Khí (Áo + Dây chuyền)
    const pair2El = ELEMENT_ORDER[wIdx % 5];       // Hệ Vũ Khí & Nón (Mốc chính)
    const pair3El = ELEMENT_ORDER[(wIdx + 1) % 5]; // Giày + Nhẫn trên
    const pair4El = ELEMENT_ORDER[(wIdx + 2) % 5]; // Bao tay + Ngọc bội
    const pair5El = ELEMENT_ORDER[(wIdx + 3) % 5]; // Thắt lưng + Nhẫn dưới

    const pairElementMap = {
      1: pair1El,
      2: pair2El,
      3: pair3El,
      4: pair4El,
      5: pair5El
    };

    const equipment = {};
    Object.keys(SLOTS).forEach(function (slotId) {
      const pairId = SLOTS[slotId].pairId;
      equipment[slotId] = createSlotItem(slotId, pairElementMap[pairId]);
    });

    return equipment;
  }

  /**
   * Tạo bộ Phá Hành dựa trên Chuẩn Dạng 2:
   * - Giữ nguyên cấu trúc Dạng 2 và GIỮ NGUYÊN VŨ KHÍ của Dạng 2 (weaponElement).
   * - Thay đổi các món khác (ngoài Vũ Khí) sang hệ tương sinh của Nhân Vật (resistEl = ELEMENTS[charElement].sinh,
   *   được Nhân Vật tự kích sáng DongAn_1) để tăng kháng chống lại hệ khắc chế Nhân Vật!
   */
  function generatePhaHanhSampleEquipment(charElement, weaponElement) {
    const cleanCharEl = ELEMENTS[charElement] ? charElement : "THUY";
    const cleanWeaponEl =
      weaponElement && ELEMENTS[weaponElement] ? weaponElement : cleanCharEl;
    const resistEl = ELEMENTS[cleanCharEl].sinh; // Hệ được NV tự kích DongAn_1 (tăng kháng hệ khắc)

    // 1. Lấy nguyên bộ Chuẩn Dạng 2 theo Vũ Khí đang chọn làm nền tảng
    const d2Gear = generateStandardChainEquipment(
      cleanCharEl,
      cleanWeaponEl,
      "BY_WEAPON_CHAIN"
    );

    // 2. Tìm cặp trong Dạng 2 đang mang hệ trùng với Hệ Nhân Vật (cleanCharEl)
    // Vì cặp kế tiếp (mang hệ resistEl) đã có Nhân Vật tự kích +1, nó chỉ cần 1 món của cặp cleanCharEl là đủ 2 dòng ẩn!
    // Ta giữ lại 1 món (ưu tiên giữ Vũ Khí nếu là Cặp 2) và đổi món còn lại trong cặp đó sang resistEl để lấy thêm kháng!
    FIVE_PAIRS.forEach(function (pair) {
      const slotA = pair.slots[0];
      const slotB = pair.slots[1];
      if (d2Gear[slotA] && d2Gear[slotA].element === cleanCharEl) {
        // Nếu cặp này là Cặp 2 (vu_khi + dau_khoi), giữ nguyên vu_khi và đổi dau_khoi sang resistEl
        // Nếu là cặp khác, giữ slotA và đổi slotB sang resistEl
        const slotToChange = slotA === "vu_khi" ? slotB : slotB;
        d2Gear[slotToChange] = createSlotItem(slotToChange, resistEl);
      }
    });

    // 3. Đổi thêm Cặp 5 (Thắt lưng + Nhẫn dưới) sang resistEl để cộng dồn kháng hệ khắc
    // (Nếu Cặp 5 đã là resistEl hoặc cleanCharEl trong Dạng 2 thì đổi Cặp 4 Bao tay + Ngọc bội sang resistEl, tuyệt đối không đụng vào Cặp 2 Vũ Khí)
    if (
      d2Gear.yeu_dai.element !== resistEl &&
      d2Gear.yeu_dai.element !== cleanCharEl
    ) {
      d2Gear.yeu_dai = createSlotItem("yeu_dai", resistEl);
      d2Gear.nhan_duoi = createSlotItem("nhan_duoi", resistEl);
    } else {
      d2Gear.ho_uyen = createSlotItem("ho_uyen", resistEl);
      d2Gear.ngoc_boi = createSlotItem("ngoc_boi", resistEl);
    }

    // Đảm bảo Vũ Khí luôn giữ nguyên 100% theo Vũ Khí của Dạng 2
    d2Gear.vu_khi = createSlotItem("vu_khi", cleanWeaponEl);

    return d2Gear;
  }

  global.JX1_DATA = {
    ELEMENTS: ELEMENTS,
    ELEMENT_ORDER: ELEMENT_ORDER,
    SLOTS: SLOTS,
    FIVE_PAIRS: FIVE_PAIRS,
    getLuaSetsForSlotAndElement: getLuaSetsForSlotAndElement,
    createSlotItem: createSlotItem,
    generateStandardChainEquipment: generateStandardChainEquipment,
    generatePhaHanhSampleEquipment: generatePhaHanhSampleEquipment
  };
})(window);
