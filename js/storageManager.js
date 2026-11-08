(function (global) {
  "use strict";

  const STORAGE_KEY = "jx1_ngu_hanh_user_saved_builds_v9";
  const CURRENT_DRAFT_KEY = "jx1_ngu_hanh_current_draft_v9";
  const DATA = global.JX1_DATA;

  function cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Tạo danh sách 3 bộ mẫu động (Dynamic Templates) luôn bám sát Hệ Nhân Vật (charElement)
   * và Hệ Vũ Khí đang chọn (weaponElement) hiện tại!
   */
  function getDynamicTemplatesForCurrentSelection(charElement, weaponElement) {
    const cleanCharEl = DATA.ELEMENTS[charElement] ? charElement : "THUY";
    const cleanVkEl =
      weaponElement && DATA.ELEMENTS[weaponElement] ? weaponElement : cleanCharEl;

    const charMeta = DATA.ELEMENTS[cleanCharEl];
    const vkMeta = DATA.ELEMENTS[cleanVkEl];
    const resistMeta = DATA.ELEMENTS[charMeta.sinh]; // Hệ đồ tự kích +1 từ NV để chống hệ khắc

    // Chuỗi mô tả 5 cặp cho Dạng 1 (Theo Hệ NV)
    const cIdx = DATA.ELEMENT_ORDER.indexOf(cleanCharEl);
    const d1_p2 = DATA.ELEMENTS[DATA.ELEMENT_ORDER[cIdx % 5]].name;
    const d1_p3 = DATA.ELEMENTS[DATA.ELEMENT_ORDER[(cIdx + 1) % 5]].name;
    const d1_p4 = DATA.ELEMENTS[DATA.ELEMENT_ORDER[(cIdx + 2) % 5]].name;
    const d1_p5 = DATA.ELEMENTS[DATA.ELEMENT_ORDER[(cIdx + 3) % 5]].name;
    const d1_p1 = DATA.ELEMENTS[DATA.ELEMENT_ORDER[(cIdx + 4) % 5]].name;

    // Chuỗi mô tả 5 cặp cho Dạng 2 (Theo Hệ Vũ Khí đang chọn)
    const wIdx = DATA.ELEMENT_ORDER.indexOf(cleanVkEl);
    const d2_p2 = DATA.ELEMENTS[DATA.ELEMENT_ORDER[wIdx % 5]].name;
    const d2_p3 = DATA.ELEMENTS[DATA.ELEMENT_ORDER[(wIdx + 1) % 5]].name;
    const d2_p4 = DATA.ELEMENTS[DATA.ELEMENT_ORDER[(wIdx + 2) % 5]].name;
    const d2_p5 = DATA.ELEMENTS[DATA.ELEMENT_ORDER[(wIdx + 3) % 5]].name;
    const d2_p1 = DATA.ELEMENTS[DATA.ELEMENT_ORDER[(wIdx + 4) % 5]].name;

    return [
      {
        id: "tpl_dang1_char",
        isTemplate: true,
        name:
          "Chuẩn Dạng 1: NV " +
          charMeta.fullName +
          " — Mang Vũ Khí " +
          charMeta.fullName,
        note:
          "VK+Nón " +
          d1_p2 +
          " -> Giày+Nhẫn trên " +
          d1_p3 +
          " (NV " +
          charMeta.name +
          " tự kích +1) -> Bao tay+Ngọc bội " +
          d1_p4 +
          " -> Thắt lưng+Nhẫn dưới " +
          d1_p5 +
          " -> Áo+Dây chuyền " +
          d1_p1 +
          ".",
        isPhaHanh: false,
        charElement: cleanCharEl,
        createdAt: "Dạng 1 (Theo Hệ NV)",
        equipment: DATA.generateStandardChainEquipment(
          cleanCharEl,
          cleanCharEl,
          "BY_CHAR"
        )
      },
      {
        id: "tpl_dang2_vk",
        isTemplate: true,
        name:
          "Chuẩn Dạng 2: NV " +
          charMeta.fullName +
          " — Mang Vũ Khí " +
          vkMeta.fullName +
          " (Đang chọn)",
        note:
          "Soi NV " +
          charMeta.name +
          " + VK " +
          vkMeta.name +
          ": VK+Nón " +
          d2_p2 +
          " -> Giày+Nhẫn trên " +
          d2_p3 +
          " -> Bao tay+Ngọc bội " +
          d2_p4 +
          " -> Thắt lưng+Nhẫn dưới " +
          d2_p5 +
          " -> Áo+Dây chuyền " +
          d2_p1 +
          " (Cặp " +
          resistMeta.name +
          " hưởng +1 từ NV " +
          charMeta.name +
          ").",
        isPhaHanh: false,
        charElement: cleanCharEl,
        createdAt: "Dạng 2 (Theo Hệ VK)",
        equipment: DATA.generateStandardChainEquipment(
          cleanCharEl,
          cleanVkEl,
          "BY_WEAPON_CHAIN"
        )
      },
      {
        id: "tpl_phahanh_resist",
        isTemplate: true,
        name:
          "Phá Hành (Từ Dạng 2 — Giữ VK " +
          vkMeta.name +
          ") — Tăng Đồ " +
          resistMeta.fullName,
        note:
          "Giữ nguyên nền Chuẩn Dạng 2 & giữ nguyên Vũ Khí " +
          vkMeta.fullName +
          ", thay các món khác sang " +
          resistMeta.fullName +
          " (được NV " +
          charMeta.name +
          " tự kích " +
          resistMeta.resistanceLabel +
          ") để tăng kháng hệ khắc!",
        isPhaHanh: true,
        charElement: cleanCharEl,
        createdAt: "Phá Hành (Giữ VK Dạng 2)",
        equipment: DATA.generatePhaHanhSampleEquipment(cleanCharEl, cleanVkEl)
      }
    ];
  }

  function loadAllPresets() {
    try {
      const raw = global.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveAllPresets(presets) {
    try {
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
      return true;
    } catch (e) {
      return false;
    }
  }

  function saveBuildPreset(name, note, charElement, equipmentMap, isPhaHanh) {
    const presets = loadAllPresets();
    const cleanName = (name || "").trim() || ("Bộ Phối Đồ " + DATA.ELEMENTS[charElement].fullName);
    const now = new Date();
    const timeStr =
      String(now.getHours()).padStart(2, "0") +
      ":" +
      String(now.getMinutes()).padStart(2, "0") +
      " " +
      String(now.getDate()).padStart(2, "0") +
      "/" +
      String(now.getMonth() + 1).padStart(2, "0");

    const newPreset = {
      id: "build_" + Date.now(),
      name: cleanName,
      note: (note || "").trim() || (isPhaHanh ? "Cấu hình mặc Phá Hành tùy chỉnh" : "Cấu hình chuẩn dây chuyền Ngũ Hành"),
      isPhaHanh: Boolean(isPhaHanh),
      charElement: charElement,
      createdAt: timeStr,
      equipment: cloneDeep(equipmentMap)
    };

    presets.unshift(newPreset);
    saveAllPresets(presets);
    return newPreset;
  }

  function deleteBuildPreset(presetId) {
    const presets = loadAllPresets().filter(function (p) {
      return p.id !== presetId;
    });
    saveAllPresets(presets);
    return presets;
  }

  function saveCurrentDraft(charElement, equipmentMap) {
    try {
      global.localStorage.setItem(
        CURRENT_DRAFT_KEY,
        JSON.stringify({
          charElement: charElement,
          equipment: equipmentMap
        })
      );
    } catch (e) {
      // Ignore quota errors
    }
  }

  function loadCurrentDraft() {
    try {
      const raw = global.localStorage.getItem(CURRENT_DRAFT_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.charElement && parsed.equipment) {
        return parsed;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  global.JX1_STORAGE = {
    getDynamicTemplatesForCurrentSelection: getDynamicTemplatesForCurrentSelection,
    loadAllPresets: loadAllPresets,
    saveBuildPreset: saveBuildPreset,
    deleteBuildPreset: deleteBuildPreset,
    saveCurrentDraft: saveCurrentDraft,
    loadCurrentDraft: loadCurrentDraft,
    cloneDeep: cloneDeep
  };
})(window);

