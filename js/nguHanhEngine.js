(function (global) {
  "use strict";

  const DATA = global.JX1_DATA;

  /**
   * Tính toán trạng thái kích thuộc tính âm cho 1 ô trang bị
   * Quy tắc chuẩn VLTK 1:
   * - Mỗi trang bị có Hệ `itemEl`. Để kích thuộc tính âm của trang bị này, cần nguồn mang hệ `requiredEl = ELEMENTS[itemEl].duocSinhBoi` (vì `requiredEl` sinh `itemEl`).
   * - Có tối đa 3 nguồn kích:
   *   1. Nguồn Nhân Vật (`charElement === requiredEl`): Nếu Nhân Vật mang hệ tương sinh cho trang bị, bản thân Nhân Vật tự kích 1 dòng ẩn!
   *   2. Nguồn Trang Bị Mồi 1 (`reqSlot1` có hệ `=== requiredEl`).
   *   3. Nguồn Trang Bị Mồi 2 (`reqSlot2` có hệ `=== requiredEl`).
   */
  function evaluateSlotActivation(slotId, charElement, equipmentMap) {
    const slotMeta = DATA.SLOTS[slotId];
    const item = equipmentMap[slotId];
    const itemElMeta = DATA.ELEMENTS[item.element];
    const requiredElementId = itemElMeta.duocSinhBoi;
    const requiredElMeta = DATA.ELEMENTS[requiredElementId];

    const reqSlotId1 = slotMeta.requiredSlots[0];
    const reqSlotId2 = slotMeta.requiredSlots[1];
    const reqSlotMeta1 = DATA.SLOTS[reqSlotId1];
    const reqSlotMeta2 = DATA.SLOTS[reqSlotId2];

    const reqItem1 = equipmentMap[reqSlotId1];
    const reqItem2 = equipmentMap[reqSlotId2];

    // Kiểm tra từng nguồn kích
    const isActivatedByChar = charElement === requiredElementId;
    const isActivatedBySlot1 = reqItem1 && reqItem1.element === requiredElementId;
    const isActivatedBySlot2 = reqItem2 && reqItem2.element === requiredElementId;

    const activeSources = [];
    if (isActivatedByChar) {
      activeSources.push({
        type: "CHAR",
        label: "Nhân vật " + DATA.ELEMENTS[charElement].fullName
      });
    }
    if (isActivatedBySlot1) {
      activeSources.push({
        type: "SLOT_1",
        slotId: reqSlotId1,
        label: reqSlotMeta1.shortName + " (" + DATA.ELEMENTS[reqItem1.element].name + ")"
      });
    }
    if (isActivatedBySlot2) {
      activeSources.push({
        type: "SLOT_2",
        slotId: reqSlotId2,
        label: reqSlotMeta2.shortName + " (" + DATA.ELEMENTS[reqItem2.element].name + ")"
      });
    }

    const activeCount = activeSources.length; // 0, 1, 2, hoặc 3 dòng ẩn được kích

    // Kiểm tra xem món này có đang bị "Phá hành" (không nhận được bất kỳ nguồn kích trang bị nào từ 2 món mồi) hay không
    const equippedGearSourcesCount = (isActivatedBySlot1 ? 1 : 0) + (isActivatedBySlot2 ? 1 : 0);
    const isPhaHanh = equippedGearSourcesCount < 2;

    // Câu nhắc chuẩn dưới đáy Tooltip VLTK 1:
    // Ví dụ: "Cần hệ Thổ của Nhẫn trái (dưới) và Thắt lưng để kích thuộc tính âm"
    const requirementText =
      "Cần hệ " +
      requiredElMeta.name +
      " của " +
      reqSlotMeta1.tooltipReqName +
      " và " +
      reqSlotMeta2.tooltipReqName +
      " để kích thuộc tính âm";

    // Xây dựng 6 dòng thuộc tính xen kẽ: Hiện 1 - Ẩn 1 - Hiện 2 - Ẩn 2 - Hiện 3 - Ẩn 3
    const interleavedLines = [];
    for (let i = 0; i < 3; i++) {
      // Dòng Hiện (i + 1)
      interleavedLines.push({
        kind: "VISIBLE",
        index: i + 1,
        text: item.visibleLines[i] || "Sinh lực tối đa: +120 điểm",
        isActive: true,
        sourceLabel: "Dòng hiện (Luôn sáng)"
      });

      // Dòng Ẩn / Thuộc tính âm (i + 1)
      const isHiddenActive = activeCount >= i + 1;
      const matchedSource = isHiddenActive ? activeSources[i] : null;
      interleavedLines.push({
        kind: "HIDDEN",
        index: i + 1,
        text: item.hiddenLines[i] || itemElMeta.defaultHidden1,
        isActive: isHiddenActive,
        sourceType: matchedSource ? matchedSource.type : null,
        sourceLabel: matchedSource
          ? "Kích bởi: " + matchedSource.label
          : "Chưa kích (Thiếu nguồn hệ " + requiredElMeta.name + ")"
      });
    }

    return {
      slotId: slotId,
      slotMeta: slotMeta,
      item: item,
      itemElementMeta: itemElMeta,
      requiredElementMeta: requiredElMeta,
      isActivatedByChar: isActivatedByChar,
      isActivatedBySlot1: isActivatedBySlot1,
      isActivatedBySlot2: isActivatedBySlot2,
      reqSlot1: {
        slotId: reqSlotId1,
        meta: reqSlotMeta1,
        currentElement: reqItem1 ? DATA.ELEMENTS[reqItem1.element] : null,
        isMatching: isActivatedBySlot1
      },
      reqSlot2: {
        slotId: reqSlotId2,
        meta: reqSlotMeta2,
        currentElement: reqItem2 ? DATA.ELEMENTS[reqItem2.element] : null,
        isMatching: isActivatedBySlot2
      },
      activeCount: activeCount,
      equippedGearSourcesCount: equippedGearSourcesCount,
      isPhaHanh: isPhaHanh,
      requirementText: requirementText,
      interleavedLines: interleavedLines
    };
  }

  /**
   * Đánh giá toàn bộ 10 món trang bị trên người nhân vật
   */
  function evaluateFullBuild(charElement, equipmentMap) {
    const slotResults = {};
    let totalHiddenActivated = 0;
    let totalCharAutoActivated = 0;
    let phaHanhSlotsCount = 0;
    const activeStatsList = [];

    Object.keys(DATA.SLOTS).forEach(function (slotId) {
      const res = evaluateSlotActivation(slotId, charElement, equipmentMap);
      slotResults[slotId] = res;
      totalHiddenActivated += res.activeCount;
      if (res.isActivatedByChar) {
        totalCharAutoActivated += 1;
      }
      if (res.isPhaHanh) {
        phaHanhSlotsCount += 1;
      }

      res.interleavedLines.forEach(function (line) {
        if (line.isActive) {
          activeStatsList.push({
            slotName: res.slotMeta.shortName,
            kind: line.kind,
            text: line.text,
            sourceLabel: line.sourceLabel
          });
        }
      });
    });

    const charElMeta = DATA.ELEMENTS[charElement];
    const autoActivatedTargetEl = DATA.ELEMENTS[charElMeta.sinh];
    const khắcTargetEl = DATA.ELEMENTS[charElMeta.khac];
    const biKhacByEl = DATA.ELEMENTS[charElMeta.biKhac];

    return {
      charElement: charElement,
      charElementMeta: charElMeta,
      autoActivatedTargetEl: autoActivatedTargetEl,
      khacTargetEl: khắcTargetEl,
      biKhacByEl: biKhacByEl,
      slotResults: slotResults,
      totalHiddenActivated: totalHiddenActivated,
      maxPossibleHidden: 22, // Chuẩn VLTK1: 8 món kích tối đa 2 dòng + 2 món hệ tương sinh với nhân vật kích 3 dòng = 22 (hoặc tối đa 30 nếu dồn toàn bộ đồ nhận kích từ nhân vật)
      totalCharAutoActivated: totalCharAutoActivated,
      phaHanhSlotsCount: phaHanhSlotsCount,
      isPhaHanhBuild: phaHanhSlotsCount > 0,
      activeStatsList: activeStatsList
    };
  }

  global.JX1_ENGINE = {
    evaluateSlotActivation: evaluateSlotActivation,
    evaluateFullBuild: evaluateFullBuild
  };
})(window);

