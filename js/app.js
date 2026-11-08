(function (global) {
  "use strict";

  const DATA = global.JX1_DATA;
  const ENGINE = global.JX1_ENGINE;
  const STORAGE = global.JX1_STORAGE;

  // State của ứng dụng
  const state = {
    charElement: "THUY",
    selectedSlotId: "y_phuc", // Mặc định chọn Áo (Kim Phong Kỳ Lân Huyết) để người dùng thấy ngay ví dụ của họ
    showLines: true,
    equipment: {}
  };

  // Khởi tạo dữ liệu từ bản nháp gần nhất hoặc bộ chuẩn Hệ Thủy
  function initAppState() {
    const savedDraft = STORAGE.loadCurrentDraft();
    if (savedDraft && savedDraft.charElement && savedDraft.equipment) {
      state.charElement = savedDraft.charElement;
      state.equipment = savedDraft.equipment;
    } else {
      state.charElement = "THUY";
      state.equipment = DATA.generateStandardChainEquipment("THUY");
    }
  }

  /**
   * Tạo HTML chuẩn Tooltip Đồ Xanh VLTK 1 (6 dòng: Hiện 1 - Ẩn 1 - Hiện 2 - Ẩn 2 - Hiện 3 - Ẩn 3)
   */
  function buildTooltipHtml(slotEval) {
    const item = slotEval.item;
    const slotMeta = slotEval.slotMeta;
    const itemEl = slotEval.itemElementMeta;
    const isGold = item.itemTier === "HOANG_KIM";
    const tierClass = isGold ? " tier-gold" : "";

    const baseStatsHtml = slotMeta.baseStats
      .map(function (st) {
        return '<div class="tt-meta-line">' + escapeHtml(st) + "</div>";
      })
      .join("");

    const linesHtml = slotEval.interleavedLines
      .map(function (line) {
        if (line.kind === "VISIBLE") {
          return (
            '<div class="tt-attr-line visible-line' +
            tierClass +
            '">' +
            escapeHtml(line.text) +
            '<span class="tt-source-tag" style="color:#38BDF8; opacity:0.75;">Hiện ' +
            line.index +
            "</span>" +
            "</div>"
          );
        } else {
          const statusClass = line.isActive
            ? "hidden-active" + tierClass
            : "hidden-inactive";
          let badgeColor = "#64748B";
          if (line.isActive) {
            badgeColor = line.sourceType === "CHAR" ? "#4ADE80" : "#60A5FA";
          }
          return (
            '<div class="tt-attr-line ' +
            statusClass +
            '">' +
            escapeHtml(line.text) +
            '<span class="tt-source-tag" style="color:' +
            badgeColor +
            ';">' +
            escapeHtml(line.sourceLabel) +
            "</span>" +
            "</div>"
          );
        }
      })
      .join("");

    return (
      '<div class="tt-item-name' +
      tierClass +
      '">' +
      escapeHtml(item.itemName) +
      "</div>" +
      '<div class="tt-meta-line">Thuộc tính Ngũ hành: <strong style="color:' +
      itemEl.color +
      '">' +
      escapeHtml(itemEl.name) +
      "</strong></div>" +
      '<div class="tt-gold-type">' +
      (isGold ? "Trang bị Hoàng Kim (" : "Trang bị Xanh 6 Dòng (") +
      escapeHtml(slotMeta.name) +
      ")</div>" +
      (item.luaFile
        ? '<div class="tt-meta-line" style="font-size:11px; color:#86EFAC;">Nguồn Lua: <code>' +
          escapeHtml(item.luaFile) +
          "</code>" +
          (item.dongAnRule ? " • " + escapeHtml(item.dongAnRule) : "") +
          "</div>"
        : "") +
      '<div class="tt-base-stats">' +
      baseStatsHtml +
      "</div>" +
      '<div class="tt-attr-list">' +
      linesHtml +
      "</div>" +
      '<div class="tt-meta-line" style="color: #93C5FD; font-size: 12px;">' +
      "Kích thuộc tính âm: " +
      slotEval.activeCount +
      " / 3 dòng ẩn" +
      (slotEval.isActivatedByChar ? " (Có +1 tự kích từ Hệ Nhân Vật)" : "") +
      "</div>" +
      '<div class="tt-Requirement-footer">' +
      escapeHtml(slotEval.requirementText) +
      "</div>"
    );
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /**
   * Render toàn bộ giao diện
   */
  function renderAll() {
    const buildEval = ENGINE.evaluateFullBuild(state.charElement, state.equipment);
    STORAGE.saveCurrentDraft(state.charElement, state.equipment);

    renderCharacterHeader(buildEval);
    renderTenEquipmentSlots(buildEval);
    renderSelectedSlotInspector(buildEval);
    renderSummaryAndPairs(buildEval);
    renderPresetsList();

    requestAnimationFrame(function () {
      renderActivationLinesSvg(buildEval);
    });
  }

  /**
   * Render phần thanh chọn Hệ Nhân Vật (thay cho ô Tên) & Banner Tương Sinh/Tương Khắc
   */
  function renderCharacterHeader(buildEval) {
    const selectEl = document.getElementById("charElementSelect");
    if (selectEl.value !== state.charElement) {
      selectEl.value = state.charElement;
    }

    // Cập nhật 5 nút pill Hệ Nhân Vật
    const pills = document.querySelectorAll("#charElementPills > .el-pill[data-el]");
    pills.forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-el") === state.charElement);
    });

    // Cập nhật 5 nút pill Hệ Vũ Khí làm mốc xếp chuẩn 5 cặp
    const currentVkEl =
      state.equipment && state.equipment.vu_khi
        ? state.equipment.vu_khi.element
        : state.charElement;
    const vkPills = document.querySelectorAll("#weaponAnchorPills .el-pill[data-vk-el]");
    vkPills.forEach(function (btn) {
      const el = btn.getAttribute("data-vk-el");
      btn.setAttribute("data-el", el);
      btn.classList.toggle("active", el === currentVkEl);
    });

    // Nhãn Chuẩn Ngũ Hành hay Đang Mặc Phá Hành
    const modeLabel = document.getElementById("charBuildModeLabel");
    if (buildEval.isPhaHanhBuild) {
      modeLabel.textContent = "Đang Phá Hành (" + buildEval.phaHanhSlotsCount + " món)";
      modeLabel.style.color = "#FBBF24";
    } else {
      modeLabel.textContent = "Chuẩn Dây Chuyền";
      modeLabel.style.color = "#4ADE80";
    }

    // Banner quy tắc nhân vật tự kích dòng
    const charMeta = buildEval.charElementMeta;
    const targetMeta = buildEval.autoActivatedTargetEl;
    const khacMeta = buildEval.khacTargetEl;
    const banner = document.getElementById("charPassiveBanner");

    banner.innerHTML =
      "<div>" +
      '<strong style="color:' +
      charMeta.color +
      '">Nhân vật ' +
      charMeta.fullName +
      "</strong> sinh <strong style=\"color:" +
      targetMeta.color +
      '">Hệ ' +
      targetMeta.name +
      '</strong> → <span style="color:#4ADE80; font-weight:700;">Tự kích +1 dòng ẩn</span> cho mọi trang bị <strong>Hệ ' +
      targetMeta.name +
      "</strong> (" +
      buildEval.totalCharAutoActivated +
      " món đang hưởng)" +
      "</div>" +
      '<div style="font-size:11px; color:var(--text-muted); white-space:nowrap;">' +
      "Khắc: <strong style=\"color:" +
      khacMeta.color +
      '">' +
      khacMeta.name +
      "</strong>" +
      "</div>";
  }

  /**
   * Render đúng 10 ô trang bị vào 3 cột (Trái 4, Giữa 3, Phải 3)
   */
  function renderTenEquipmentSlots(buildEval) {
    const colLeft = document.getElementById("colSlotsLeft");
    const colCenter = document.getElementById("colSlotsCenter");
    const colRight = document.getElementById("colSlotsRight");

    colLeft.innerHTML = "";
    colCenter.innerHTML = "";
    colRight.innerHTML = "";

    const selectedEval = buildEval.slotResults[state.selectedSlotId];
    const highlightedReqSlots = selectedEval ? selectedEval.slotMeta.requiredSlots : [];

    Object.keys(DATA.SLOTS).forEach(function (slotId) {
      const slotMeta = DATA.SLOTS[slotId];
      const slotEval = buildEval.slotResults[slotId];
      const itemElMeta = slotEval.itemElementMeta;

      const slotDiv = document.createElement("div");
      slotDiv.className = "equip-slot";
      slotDiv.setAttribute("data-slot", slotId);
      slotDiv.setAttribute("role", "button");
      slotDiv.setAttribute("tabindex", "0");
      slotDiv.setAttribute(
        "aria-label",
        slotMeta.name + " - Hệ " + itemElMeta.name + " - Kích " + slotEval.activeCount + "/3 dòng ẩn"
      );

      if (slotId === state.selectedSlotId) {
        slotDiv.classList.add("selected");
      }
      if (highlightedReqSlots.indexOf(slotId) !== -1) {
        slotDiv.classList.add("source-highlight");
      }
      if (slotEval.isPhaHanh) {
        slotDiv.classList.add("broken-chain");
      }

      // 3 chấm hiển thị trạng thái kích 3 dòng ẩn
      let dotsHtml = "";
      for (let d = 1; d <= 3; d++) {
        let dotClass = "hidden-dot";
        if (slotEval.activeCount >= d) {
          dotClass += d === 1 && slotEval.isActivatedByChar ? " on-char" : " on";
        }
        dotsHtml += '<span class="' + dotClass + '"></span>';
      }

      const charStarHtml = slotEval.isActivatedByChar
        ? '<span class="slot-char-star" title="Được Nhân Vật tự kích +1 dòng ẩn">NV+1</span>'
        : "";

      slotDiv.innerHTML =
        '<span class="slot-el-badge" data-el="' +
        itemElMeta.id +
        '">' +
        itemElMeta.name +
        "</span>" +
        charStarHtml +
        '<div class="slot-icon-wrap">' +
        slotMeta.svg +
        '<span class="slot-name-label">' +
        escapeHtml(slotMeta.shortName) +
        "</span>" +
        "</div>" +
        '<div class="slot-hidden-dots">' +
        dotsHtml +
        "</div>";

      // Sự kiện click chọn ô trang bị
      slotDiv.addEventListener("click", function () {
        state.selectedSlotId = slotId;
        renderAll();
      });

      slotDiv.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          state.selectedSlotId = slotId;
          renderAll();
        }
      });

      // Sự kiện Hover hiện Floating Tooltip kiểu VLTK 1
      slotDiv.addEventListener("mouseenter", function (ev) {
        showFloatingTooltip(slotEval, ev);
      });
      slotDiv.addEventListener("mousemove", function (ev) {
        moveFloatingTooltip(ev);
      });
      slotDiv.addEventListener("mouseleave", function () {
        hideFloatingTooltip();
      });

      if (slotMeta.column === "left") {
        colLeft.appendChild(slotDiv);
      } else if (slotMeta.column === "center") {
        colCenter.appendChild(slotDiv);
      } else {
        colRight.appendChild(slotDiv);
      }
    });
  }

  /**
   * Vẽ tia sáng nối từ 2 món đồ mồi tới món đang chọn trên sân khấu 10 món
   */
  function renderActivationLinesSvg(buildEval) {
    const svg = document.getElementById("activationLinesSvg");
    if (!svg) return;
    svg.innerHTML = "";

    if (!state.showLines) return;

    const stage = document.getElementById("equipmentStage");
    const stageRect = stage.getBoundingClientRect();
    const selectedEval = buildEval.slotResults[state.selectedSlotId];
    if (!selectedEval) return;

    const targetEl = stage.querySelector('.equip-slot[data-slot="' + state.selectedSlotId + '"]');
    if (!targetEl) return;
    const targetRect = targetEl.getBoundingClientRect();
    const tx = targetRect.left - stageRect.left + targetRect.width / 2;
    const ty = targetRect.top - stageRect.top + targetRect.height / 2;

    [selectedEval.reqSlot1, selectedEval.reqSlot2].forEach(function (reqInfo) {
      const sourceDom = stage.querySelector('.equip-slot[data-slot="' + reqInfo.slotId + '"]');
      if (!sourceDom) return;
      const sRect = sourceDom.getBoundingClientRect();
      const sx = sRect.left - stageRect.left + sRect.width / 2;
      const sy = sRect.top - stageRect.top + sRect.height / 2;

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(sx));
      line.setAttribute("y1", String(sy));
      line.setAttribute("x2", String(tx));
      line.setAttribute("y2", String(ty));

      if (reqInfo.isMatching) {
        line.setAttribute("stroke", "#4ADE80");
        line.setAttribute("stroke-width", "2.5");
      } else {
        line.setAttribute("stroke", "#F59E0B");
        line.setAttribute("stroke-width", "1.8");
        line.setAttribute("stroke-dasharray", "5 4");
      }
      svg.appendChild(line);
    });
  }

  /**
   * Render Cột 2: Tooltip chi tiết + 3 nguồn kích + Bộ chỉnh Hệ / Thuộc tính của món đang chọn
   */
  function renderSelectedSlotInspector(buildEval) {
    const slotEval = buildEval.slotResults[state.selectedSlotId];
    if (!slotEval) return;

    document.getElementById("inspectorHeaderTitle").textContent =
      "CHI TIẾT: " + slotEval.slotMeta.name.toUpperCase();
    document.getElementById("inspectorPairBadge").textContent =
      "Thuộc Cặp " + slotEval.slotMeta.pairId + " / 5";

    // Render Tooltip chính
    const tooltipBox = document.getElementById("mainTooltipBox");
    tooltipBox.innerHTML = buildTooltipHtml(slotEval);

    // Render 3 thẻ nguồn kích (Nhân vật + Món mồi 1 + Món mồi 2)
    const reqElName = slotEval.requiredElementMeta.name;
    const reqElColor = slotEval.requiredElementMeta.color;
    const charElMeta = buildEval.charElementMeta;

    const sourcesHtml = [
      {
        title: "1. Nguồn Hệ Nhân Vật",
        isActive: slotEval.isActivatedByChar,
        detail: slotEval.isActivatedByChar
          ? "Nhân vật " +
            charElMeta.fullName +
            " tương sinh Hệ " +
            slotEval.itemElementMeta.name +
            " → Tự kích +1 dòng ẩn!"
          : "Nhân vật đang là " +
            charElMeta.fullName +
            " (Cần NV Hệ " +
            reqElName +
            " mới tự kích từ nhân vật)."
      },
      {
        title: "2. Món kích 1: " + slotEval.reqSlot1.meta.shortName,
        isActive: slotEval.reqSlot1.isMatching,
        detail: slotEval.reqSlot1.isMatching
          ? "Đang mặc Hệ " + reqElName + " (Đúng hệ tương sinh → +1 dòng ẩn)."
          : "Đang mặc Hệ " +
            slotEval.reqSlot1.currentElement.name +
            ' (Cần đổi sang <strong style="color:' +
            reqElColor +
            '">Hệ ' +
            reqElName +
            "</strong> để kích)."
      },
      {
        title: "3. Món kích 2: " + slotEval.reqSlot2.meta.shortName,
        isActive: slotEval.reqSlot2.isMatching,
        detail: slotEval.reqSlot2.isMatching
          ? "Đang mặc Hệ " + reqElName + " (Đúng hệ tương sinh → +1 dòng ẩn)."
          : "Đang mặc Hệ " +
            slotEval.reqSlot2.currentElement.name +
            ' (Cần đổi sang <strong style="color:' +
            reqElColor +
            '">Hệ ' +
            reqElName +
            "</strong> để kích)."
      }
    ]
      .map(function (src) {
        return (
          '<div class="source-card ' +
          (src.isActive ? "active" : "inactive") +
          '">' +
          '<div class="source-card-title">' +
          "<span>" +
          escapeHtml(src.title) +
          "</span>" +
          "<span>" +
          (src.isActive ? "✅ Đã kích" : "⚪ Chưa kích") +
          "</span>" +
          "</div>" +
          '<div style="color:var(--text-muted); font-size:11.5px;">' +
          src.detail +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    document.getElementById("sourcesBreakdownBox").innerHTML = sourcesHtml;

    // Cập nhật tiêu đề & trạng thái 5 nút chọn hệ của món đang chọn
    document.getElementById("editorSlotTitle").textContent =
      "Đổi Ngũ Hành cho [" + slotEval.slotMeta.shortName + "] (Mặc Chuẩn hoặc Phá Hành):";

    const pairObj = DATA.FIVE_PAIRS.find(function (p) {
      return p.pairId === slotEval.slotMeta.pairId;
    });
    const lblSyncPairText = document.getElementById("lblSyncPairText");
    if (lblSyncPairText && pairObj) {
      const sA = DATA.SLOTS[pairObj.slots[0]].shortName;
      const sB = DATA.SLOTS[pairObj.slots[1]].shortName;
      lblSyncPairText.textContent = "Đổi luôn cả cặp (" + sA + " + " + sB + ")";
    }

    const itemButtons = document.querySelectorAll("#itemElementButtons .el-pill[data-item-el]");
    itemButtons.forEach(function (btn) {
      const el = btn.getAttribute("data-item-el");
      btn.setAttribute("data-el", el);
      btn.classList.toggle("active", el === slotEval.item.element);
    });

    // Cập nhật thông tin file .lua và danh sách Set thuộc tính (Set 1 -> Set 8)
    const luaInfo = DATA.getLuaSetsForSlotAndElement(
      slotEval.slotId,
      slotEval.item.element
    );
    const luaFileBadge = document.getElementById("luaFileBadge");
    const luaDongAnBadge = document.getElementById("luaDongAnBadge");
    const luaSetSelect = document.getElementById("luaSetSelect");

    if (luaFileBadge && luaInfo) {
      luaFileBadge.textContent = luaInfo.luaFile;
    }
    if (luaDongAnBadge && luaInfo) {
      luaDongAnBadge.textContent = luaInfo.dongAnRule || "";
    }
    if (luaSetSelect && luaInfo) {
      luaSetSelect.innerHTML = luaInfo.sets
        .map(function (st) {
          const isSelected = st.setId === slotEval.item.luaSetId;
          return (
            '<option value="' +
            escapeHtml(st.setId) +
            '"' +
            (isSelected ? " selected" : "") +
            ">" +
            escapeHtml(st.name) +
            "</option>"
          );
        })
        .join("");
    }

    // Cập nhật các ô input sửa tên trang bị & 6 dòng thuộc tính
    const inputName = document.getElementById("inputItemName");
    inputName.value = slotEval.item.itemName;

    const attrContainer = document.getElementById("attrEditInputsContainer");
    attrContainer.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      // Ô sửa dòng Hiện (i+1)
      const visWrap = document.createElement("div");
      visWrap.className = "attr-edit-item";
      visWrap.innerHTML =
        "<label>Dòng Hiện " +
        (i + 1) +
        " (Dương " +
        (i + 1) +
        " - Luôn sáng):</label>" +
        '<input type="text" list="jx1VisibleOptions" class="jx1-input" data-kind="visible" data-idx="' +
        i +
        '" value="' +
        escapeHtml(slotEval.item.visibleLines[i] || "") +
        '" />';
      attrContainer.appendChild(visWrap);

      // Ô sửa dòng Ẩn (i+1)
      const hidWrap = document.createElement("div");
      hidWrap.className = "attr-edit-item";
      hidWrap.innerHTML =
        "<label>Dòng Ẩn " +
        (i + 1) +
        " (Âm " +
        (i + 1) +
        " - Cần kích):</label>" +
        '<input type="text" list="jx1HiddenOptions" class="jx1-input" data-kind="hidden" data-idx="' +
        i +
        '" value="' +
        escapeHtml(slotEval.item.hiddenLines[i] || "") +
        '" />';
      attrContainer.appendChild(hidWrap);
    }

    // Lắng nghe thay đổi nội dung dòng thuộc tính
    const attrInputs = attrContainer.querySelectorAll("input.jx1-input");
    attrInputs.forEach(function (inp) {
      inp.addEventListener("input", function () {
        const kind = inp.getAttribute("data-kind");
        const idx = Number(inp.getAttribute("data-idx"));
        const currentItem = state.equipment[state.selectedSlotId];
        if (kind === "visible") {
          currentItem.visibleLines[idx] = inp.value;
        } else {
          currentItem.hiddenLines[idx] = inp.value;
        }
        renderAll();
      });
    });

    // Render đoạn code Lua (ThemSetThuocTinh) của món đang chọn
    const luaCodePreview = document.getElementById("luaCodePreview");
    if (luaCodePreview) {
      const allSixLines = slotEval.item.visibleLines.concat(slotEval.item.hiddenLines);
      const luaEntries = [];
      allSixLines.forEach(function (lineText) {
        const idMatch = String(lineText).match(/\[(\d+)\]/);
        const valMatch = String(lineText).match(/[+-]?(\d+)/);
        if (idMatch) {
          const attrId = idMatch[1];
          const attrVal = valMatch ? valMatch[1] : "1";
          const cleanComment = String(lineText).replace(/\s*\[\d+\].*$/, "");
          luaEntries.push("    [" + attrId + "] = " + attrVal + ", -- " + cleanComment);
        }
      });
      const elLuaIdx = DATA.ELEMENTS[slotEval.item.element]
        ? DATA.ELEMENTS[slotEval.item.element].luaIndex
        : 0;
      const nhanTbCall =
        "NhanTrangBi(" + (slotEval.slotMeta.nhanTrangBiBase || "1,1,1,") + elLuaIdx + ")";
      luaCodePreview.textContent =
        "-- File: " +
        (slotEval.item.luaFile || "") +
        "\nThemSetThuocTinh({\n" +
        luaEntries.join("\n") +
        "\n})\n" +
        (slotEval.item.dongAnRule
          ? "-- Dòng ẩn: " + slotEval.item.dongAnRule + "\n"
          : "") +
        "function main()\n    " +
        nhanTbCall +
        "\nend";
    }
  }

  /**
   * Render Cột 3: Bảng KPI & Sơ đồ 5 Cặp Đồng Hành
   */
  function renderSummaryAndPairs(buildEval) {
    const kpiGrid = document.getElementById("summaryKpiGrid");
    kpiGrid.innerHTML =
      '<div class="kpi-box">' +
      '<div class="kpi-num">' +
      buildEval.totalHiddenActivated +
      " / 30</div>" +
      '<div class="kpi-label">Dòng Ẩn Đã Kích</div>' +
      "</div>" +
      '<div class="kpi-box">' +
      '<div class="kpi-num" style="color:var(--text-jade);">+' +
      buildEval.totalCharAutoActivated +
      "</div>" +
      '<div class="kpi-label">Món NV Tự Kích</div>' +
      "</div>" +
      '<div class="kpi-box">' +
      '<div class="kpi-num" style="color:' +
      (buildEval.phaHanhSlotsCount > 0 ? "#FBBF24" : "#4ADE80") +
      ';">' +
      buildEval.phaHanhSlotsCount +
      "</div>" +
      '<div class="kpi-label">Vị Trí Phá Hành</div>' +
      "</div>";

    const pairList = document.getElementById("pairChainList");
    pairList.innerHTML = DATA.FIVE_PAIRS.map(function (pair) {
      const s1 = buildEval.slotResults[pair.slots[0]];
      const s2 = buildEval.slotResults[pair.slots[1]];
      const isPairPhaHanh = s1.isPhaHanh || s2.isPhaHanh || s1.item.element !== s2.item.element;

      return (
        '<div class="pair-row ' +
        (isPairPhaHanh ? "pha-hanh" : "full-kic") +
        '">' +
        "<div>" +
        '<div style="font-weight:700; color:var(--text-title);">' +
        escapeHtml(pair.title) +
        "</div>" +
        '<div style="font-size:11px; color:var(--text-muted);">Cần: ' +
        escapeHtml(pair.requiredSlotNames) +
        "</div>" +
        "</div>" +
        '<div style="text-align:right;">' +
        '<span style="color:' +
        s1.itemElementMeta.color +
        '; font-weight:700;">' +
        s1.itemElementMeta.name +
        " (" +
        s1.activeCount +
        "/3)</span> • " +
        '<span style="color:' +
        s2.itemElementMeta.color +
        '; font-weight:700;">' +
        s2.itemElementMeta.name +
        " (" +
        s2.activeCount +
        "/3)</span>" +
        "</div>" +
        "</div>"
      );
    }).join("");

    // Render Bảng Tổng Hợp Chỉ Số Nhân Vật (Cộng dồn 10 món: Dòng Hiện + Dòng Ẩn Đã Kích)
    const totalBox = document.getElementById("totalAggregatedStatsBox");
    if (totalBox) {
      const totals = {
        85: { label: "Sinh lực tối đa [85]", val: 0, unit: " điểm", color: "#F87171" },
        89: { label: "Nội lực tối đa [89]", val: 0, unit: " điểm", color: "#60A5FA" },
        104: { label: "Phòng thủ vật lý [104]", val: 0, unit: "%", color: "#FBBF24" },
        105: { label: "Kháng băng [105]", val: 0, unit: "%", color: "#38BDF8" },
        103: { label: "Kháng lôi [103]", val: 0, unit: "%", color: "#A3E635" },
        102: { label: "Kháng hỏa [102]", val: 0, unit: "%", color: "#FB7185" },
        101: { label: "Kháng độc [101]", val: 0, unit: "%", color: "#4ADE80" },
        114: { label: "Kháng tất cả [114]", val: 0, unit: "%", color: "#FDE047" },
        106: { label: "TG làm chậm [106]", val: 0, unit: "%", color: "#93C5FD" },
        110: { label: "TG làm choáng [110]", val: 0, unit: "%", color: "#93C5FD" },
        108: { label: "TG trúng độc [108]", val: 0, unit: "%", color: "#86EFAC" },
        113: { label: "TG phục hồi [113]", val: 0, unit: "", color: "#E2E8F0" },
        111: { label: "Tốc độ di chuyển [111]", val: 0, unit: "%", color: "#38BDF8" },
        134: { label: "Chuyển hóa ST->NL [134]", val: 0, unit: "%", color: "#67E8F9" },
        139: { label: "Kỹ năng vốn có [139]", val: 0, unit: " cấp", color: "#FDE047" }
      };

      Object.keys(DATA.SLOTS).forEach(function (slotId) {
        const slotRes = buildEval.slotResults[slotId];
        slotRes.interleavedLines.forEach(function (line) {
          if (line.kind === "VISIBLE" || (line.kind === "HIDDEN" && line.isActive)) {
            const idMatch = String(line.text).match(/\[(\d+)\]/);
            const numMatch = String(line.text).match(/([+-]?\d+)/);
            if (idMatch && numMatch && totals[idMatch[1]]) {
              const id = idMatch[1];
              const v = Math.abs(parseInt(numMatch[1], 10));
              totals[id].val += v;
              // Nếu kháng tất cả [114], cộng thêm vào 5 loại kháng
              if (id === "114") {
                totals[104].val += v;
                totals[105].val += v;
                totals[103].val += v;
                totals[102].val += v;
                totals[101].val += v;
              }
            }
          }
        });
      });

      totalBox.innerHTML = Object.keys(totals)
        .map(function (k) {
          const item = totals[k];
          const prefix =
            k === "106" || k === "110" || k === "108" || k === "113" ? "-" : "+";
          const displayVal = item.val > 0 ? prefix + item.val + item.unit : "0" + item.unit;
          return (
            '<div style="display:flex; justify-content:space-between; align-items:center; padding:4px 6px; background:#121814; border:1px solid #1F2A23;">' +
            '<span style="color:var(--text-muted);">' +
            escapeHtml(item.label) +
            "</span>" +
            '<strong style="color:' +
            (item.val > 0 ? item.color : "#64748B") +
            ';">' +
            displayVal +
            "</strong>" +
            "</div>"
          );
        })
        .join("");

      // Đồng bộ sang Tab "Thuộc tính" và "Đánh giá" trong khung F3 VLTK 1
      const statsPane = document.getElementById("charStatsTabPane");
      if (statsPane) {
        statsPane.innerHTML =
          '<div style="color:var(--text-gold-tip); font-weight:700; font-size:13px; margin-bottom:8px; text-align:center; border-bottom:1px solid #2A382E; padding-bottom:6px;">' +
          "BẢNG THUỘC TÍNH & KHÁNG CỘNG DỒN 10 MÓN" +
          "</div>" +
          '<div style="display:flex; flex-direction:column; gap:5px; font-size:12px;">' +
          totalBox.innerHTML +
          "</div>";
      }
      const evalPane = document.getElementById("charEvalTabPane");
      if (evalPane) {
        evalPane.innerHTML =
          '<div style="color:var(--text-gold-tip); font-weight:700; font-size:13px; margin-bottom:8px; text-align:center; border-bottom:1px solid #2A382E; padding-bottom:6px;">' +
          "ĐÁNH GIÁ 5 CẶP NGŨ HÀNH (" +
          buildEval.totalHiddenActivated +
          "/30 DÒNG ẨN)" +
          "</div>" +
          '<div class="pair-chain-list">' +
          pairList.innerHTML +
          "</div>";
      }
    }

    // Render tổng hợp các dòng ẩn (thuộc tính âm / kháng) đã kích hoạt trên toàn bộ 10 món
    const activeHiddenSummaryEl = document.getElementById("activeHiddenAttributesSummary");
    if (activeHiddenSummaryEl) {
      const hiddenActiveItems = [];
      Object.keys(DATA.SLOTS).forEach(function (slotId) {
        const slotRes = buildEval.slotResults[slotId];
        slotRes.interleavedLines.forEach(function (line) {
          if (line.kind === "HIDDEN" && line.isActive) {
            hiddenActiveItems.push({
              slotName: slotRes.slotMeta.shortName,
              elementColor: slotRes.itemElementMeta.color,
              text: line.text,
              sourceType: line.sourceType,
              sourceLabel: line.sourceLabel
            });
          }
        });
      });

      if (hiddenActiveItems.length === 0) {
        activeHiddenSummaryEl.innerHTML =
          '<div style="color:var(--text-muted); font-size:11.5px; text-align:center; padding:8px;">Chưa có dòng thuộc tính âm nào được kích hoạt.</div>';
      } else {
        activeHiddenSummaryEl.innerHTML = hiddenActiveItems
          .map(function (h) {
            const tagColor = h.sourceType === "CHAR" ? "#4ADE80" : "#FDE047";
            return (
              '<div style="display:flex; align-items:center; justify-content:space-between; gap:6px; padding:4px 6px; background:#121814; border-left:2px solid ' +
              tagColor +
              '; font-size:11.5px;">' +
              '<div><strong style="color:' +
              h.elementColor +
              '">[' +
              escapeHtml(h.slotName) +
              "]</strong> " +
              '<span style="color:#FEF08A;">' +
              escapeHtml(h.text) +
              "</span></div>" +
              '<span style="font-size:10px; color:' +
              tagColor +
              '; white-space:nowrap;">' +
              escapeHtml(h.sourceLabel) +
              "</span>" +
              "</div>"
            );
          })
          .join("");
      }
    }
  }

  /**
   * Render danh sách các bộ phối đồ (3 Bộ Gợi Ý Động theo đúng Hệ NV + Hệ Vũ Khí đang chọn & Các bộ do người dùng lưu)
   */
  function renderPresetsList() {
    const container = document.getElementById("presetListContainer");
    const currentVkEl =
      state.equipment && state.equipment.vu_khi
        ? state.equipment.vu_khi.element
        : state.charElement;

    const dynamicTemplates = STORAGE.getDynamicTemplatesForCurrentSelection(
      state.charElement,
      currentVkEl
    );
    const savedPresets = STORAGE.loadAllPresets();
    const allItems = dynamicTemplates.concat(savedPresets);

    container.innerHTML = allItems
      .map(function (preset) {
        const charEl = DATA.ELEMENTS[preset.charElement] || DATA.ELEMENTS.THUY;
        const badgeClass = preset.isPhaHanh ? "type-phahanh" : "type-chuan";
        const badgeText = preset.isPhaHanh ? "Phá Hành" : "Chuẩn Ngũ Hành";

        return (
          '<div class="preset-item">' +
          '<div class="preset-top">' +
          '<span class="preset-name">' +
          escapeHtml(preset.name) +
          "</span>" +
          '<span class="preset-badge ' +
          badgeClass +
          '">' +
          badgeText +
          "</span>" +
          "</div>" +
          '<div class="preset-meta">' +
          'NV: <strong style="color:' +
          charEl.color +
          '">' +
          charEl.fullName +
          "</strong> • " +
          escapeHtml(preset.createdAt || "") +
          "<br/>" +
          escapeHtml(preset.note || "") +
          "</div>" +
          '<div class="preset-actions">' +
          '<button type="button" class="btn-jx1 btn-gold" data-action="load" data-id="' +
          escapeHtml(preset.id) +
          '" style="padding:3px 10px; font-size:11px;">📂 Mặc Bộ Này</button>' +
          (preset.isTemplate
            ? ""
            : '<button type="button" class="btn-jx1 btn-danger" data-action="delete" data-id="' +
              escapeHtml(preset.id) +
              '" style="padding:3px 10px; font-size:11px;">🗑️ Xóa</button>') +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    // Gắn sự kiện Mặc / Xóa Preset
    container.querySelectorAll("button[data-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const action = btn.getAttribute("data-action");
        const id = btn.getAttribute("data-id");
        if (action === "load") {
          const target = allItems.find(function (p) {
            return p.id === id;
          });
          if (target) {
            state.charElement = target.charElement;
            state.equipment = STORAGE.cloneDeep(target.equipment);
            showToast("📂 Đã mặc bộ đồ: " + target.name);
            renderAll();
          }
        } else if (action === "delete") {
          STORAGE.deleteBuildPreset(id);
          showToast("🗑️ Đã xóa bộ phối đồ đã lưu.");
          renderPresetsList();
        }
      });
    });
  }

  function showToast(msg) {
    const toast = document.getElementById("saveStatusToast");
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = "block";
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () {
      toast.style.display = "none";
    }, 3200);
  }

  /**
   * Floating Tooltip khi rê chuột vào 10 ô trang bị
   */
  function showFloatingTooltip(slotEval, ev) {
    const floatEl = document.getElementById("floatingTooltip");
    if (!floatEl) return;
    floatEl.innerHTML =
      '<div class="jx1-tooltip-box" style="padding:10px 12px; font-size:12px;">' +
      buildTooltipHtml(slotEval) +
      "</div>";
    floatEl.classList.add("show");
    moveFloatingTooltip(ev);
  }

  function moveFloatingTooltip(ev) {
    const floatEl = document.getElementById("floatingTooltip");
    if (!floatEl || !floatEl.classList.contains("show")) return;
    const offset = 16;
    let left = ev.clientX + offset;
    let top = ev.clientY + offset;

    if (left + 350 > window.innerWidth) {
      left = ev.clientX - 355;
    }
    if (top + 320 > window.innerHeight) {
      top = Math.max(10, window.innerHeight - 330);
    }
    floatEl.style.left = left + "px";
    floatEl.style.top = top + "px";
  }

  function hideFloatingTooltip() {
    const floatEl = document.getElementById("floatingTooltip");
    if (floatEl) {
      floatEl.classList.remove("show");
    }
  }

  /**
   * Gắn toàn bộ sự kiện điều khiển chính
   */
  function bindGlobalEvents() {
    // 0. Chuyển đổi 3 Tab (Thuộc tính / Trang bị 10 Món / Đánh giá) trên cửa sổ F3 VLTK 1
    const windowTabs = document.querySelectorAll("#jx1WindowTabs .jx1-tab[data-tab]");
    windowTabs.forEach(function (tabBtn) {
      tabBtn.addEventListener("click", function () {
        const targetTab = tabBtn.getAttribute("data-tab");
        windowTabs.forEach(function (b) {
          const active = b.getAttribute("data-tab") === targetTab;
          b.classList.toggle("active", active);
          b.setAttribute("aria-selected", String(active));
        });
        const equipStage = document.getElementById("equipmentStage");
        const statsPane = document.getElementById("charStatsTabPane");
        const evalPane = document.getElementById("charEvalTabPane");
        if (equipStage) equipStage.style.display = targetTab === "equip" ? "" : "none";
        if (statsPane) statsPane.style.display = targetTab === "stats" ? "block" : "none";
        if (evalPane) evalPane.style.display = targetTab === "eval" ? "block" : "none";
        if (targetTab === "equip") {
          const buildEval = ENGINE.evaluateFullBuild(state.charElement, state.equipment);
          requestAnimationFrame(function () {
            renderActivationLinesSvg(buildEval);
          });
        }
      });
    });

    // 1. Đổi Hệ Nhân Vật từ Dropdown -> Tự động xoay 10 món trang bị theo Hệ Nhân Vật mới
    const selectEl = document.getElementById("charElementSelect");
    selectEl.addEventListener("change", function () {
      state.charElement = selectEl.value;
      const keepGearChk = document.getElementById("chkKeepGearOnCharChange");
      if (!keepGearChk || !keepGearChk.checked) {
        state.equipment = DATA.generateStandardChainEquipment(state.charElement);
      }
      showToast(
        "🔄 Đã chuyển sang Nhân vật " +
          DATA.ELEMENTS[state.charElement].fullName +
          " & cập nhật bộ 10 trang bị Ngũ Hành tương ứng!"
      );
      renderAll();
    });

    // 2. Đổi Hệ Nhân Vật từ 5 nút chọn nhanh -> Tự động xoay 10 món trang bị theo Hệ Nhân Vật mới
    const charPills = document.querySelectorAll("#charElementPills > .el-pill[data-el]");
    charPills.forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.charElement = btn.getAttribute("data-el");
        const keepGearChk = document.getElementById("chkKeepGearOnCharChange");
        if (!keepGearChk || !keepGearChk.checked) {
          state.equipment = DATA.generateStandardChainEquipment(state.charElement);
        }
        showToast(
          "🔄 Đã chuyển sang Nhân vật " +
            DATA.ELEMENTS[state.charElement].fullName +
            " & cập nhật bộ 10 trang bị Ngũ Hành tương ứng!"
        );
        renderAll();
      });
    });

    // 2b. Chọn Hệ Vũ Khí làm mốc xếp chuẩn 5 cặp (VD: NV Thủy cầm Vũ Khí Thủy hoặc Vũ Khí Kim)
    const vkAnchorPills = document.querySelectorAll("#weaponAnchorPills .el-pill[data-vk-el]");
    vkAnchorPills.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const vkEl = btn.getAttribute("data-vk-el");
        state.equipment = DATA.generateStandardChainEquipment(state.charElement, vkEl);
        showToast(
          "🗡️ Đã xếp chuẩn 5 cặp theo Vũ Khí " +
            DATA.ELEMENTS[vkEl].fullName +
            " (Nhân vật " +
            DATA.ELEMENTS[state.charElement].fullName +
            ")"
        );
        renderAll();
      });
    });

    // 3. Đổi Hệ của món trang bị đang chọn (Hỗ trợ đổi lẻ Phá Hành hoặc đổi cả cặp)
    const itemElButtons = document.querySelectorAll("#itemElementButtons .el-pill[data-item-el]");
    itemElButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const newEl = btn.getAttribute("data-item-el");
        const syncPair = document.getElementById("chkSyncPair").checked;
        const currentSlotMeta = DATA.SLOTS[state.selectedSlotId];

        state.equipment[state.selectedSlotId] = DATA.createSlotItem(
          state.selectedSlotId,
          newEl
        );

        if (syncPair && currentSlotMeta) {
          Object.keys(DATA.SLOTS).forEach(function (otherId) {
            if (DATA.SLOTS[otherId].pairId === currentSlotMeta.pairId) {
              state.equipment[otherId] = DATA.createSlotItem(otherId, newEl);
            }
          });
        }
        renderAll();
      });
    });

    // 3b. Đổi Set thuộc tính từ file .lua (Set 1 -> Set 8)
    const luaSetSelect = document.getElementById("luaSetSelect");
    if (luaSetSelect) {
      luaSetSelect.addEventListener("change", function () {
        const currentItem = state.equipment[state.selectedSlotId];
        if (!currentItem) return;
        const luaInfo = DATA.getLuaSetsForSlotAndElement(
          state.selectedSlotId,
          currentItem.element
        );
        const chosenSet = luaInfo.sets.find(function (s) {
          return s.setId === luaSetSelect.value;
        });
        if (chosenSet) {
          currentItem.luaSetId = chosenSet.setId;
          currentItem.luaFile = luaInfo.luaFile;
          currentItem.dongAnRule = luaInfo.dongAnRule;
          currentItem.visibleLines = chosenSet.visibleLines.slice();
          currentItem.hiddenLines = chosenSet.hiddenLines.slice();
          showToast(
            "📜 Đã áp dụng " +
              chosenSet.name.split(":")[0] +
              " từ " +
              luaInfo.luaFile
          );
          renderAll();
        }
      });
    }

    // 4. Đổi tên món trang bị đang chọn
    const inputItemName = document.getElementById("inputItemName");
    inputItemName.addEventListener("input", function () {
      if (state.equipment[state.selectedSlotId]) {
        state.equipment[state.selectedSlotId].itemName = inputItemName.value;
        renderAll();
      }
    });

    // 4b. Nút Copy Code Lua của món đang chọn
    const btnCopyLuaSet = document.getElementById("btnCopyLuaSet");
    if (btnCopyLuaSet) {
      btnCopyLuaSet.addEventListener("click", function () {
        const luaPre = document.getElementById("luaCodePreview");
        if (luaPre && navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(luaPre.textContent).then(function () {
            showToast("📋 Đã sao chép đoạn code Lua (ThemSetThuocTinh) của món đang chọn!");
          });
        }
      });
    }

    // 5a. Nút Chuẩn Dạng 1: Theo Hệ Nhân Vật (Nhân vật hệ gì mang Vũ Khí hệ đó)
    const btnStandardByChar = document.getElementById("btnStandardByChar");
    if (btnStandardByChar) {
      btnStandardByChar.addEventListener("click", function () {
        state.equipment = DATA.generateStandardChainEquipment(
          state.charElement,
          state.charElement,
          "BY_CHAR"
        );
        showToast(
          "⚡ [Chuẩn Dạng 1] Nhân vật " +
            DATA.ELEMENTS[state.charElement].fullName +
            " mang Vũ Khí " +
            DATA.ELEMENTS[state.charElement].fullName +
            " (Đủ 5 cặp khép kín)!"
        );
        renderAll();
      });
    }

    // 5b. Nút Chuẩn Dạng 2: Theo Hệ Vũ Khí Đang Chọn (Soi cả Nhân Vật và Vũ Khí)
    document.getElementById("btnAutoStandard").addEventListener("click", function () {
      const currentVkEl =
        state.equipment && state.equipment.vu_khi
          ? state.equipment.vu_khi.element
          : state.charElement;
      state.equipment = DATA.generateStandardChainEquipment(
        state.charElement,
        currentVkEl,
        "BY_WEAPON_CHAIN"
      );
      showToast(
        "🗡️ [Chuẩn Dạng 2] Đã soi NV " +
          DATA.ELEMENTS[state.charElement].fullName +
          " + Vũ Khí " +
          DATA.ELEMENTS[currentVkEl].fullName +
          " để xếp chuẩn 5 cặp!"
      );
      renderAll();
    });

    // 6. Nút Thử Mẫu Mặc Phá Hành (Căn cứ vào Hệ Vũ Khí đang cầm + Thay món tăng kháng hệ bị khắc)
    document.getElementById("btnSamplePhaHanh").addEventListener("click", function () {
      const currentVkEl =
        state.equipment && state.equipment.vu_khi
          ? state.equipment.vu_khi.element
          : state.charElement;
      state.equipment = DATA.generatePhaHanhSampleEquipment(
        state.charElement,
        currentVkEl
      );
      const boostEl = DATA.ELEMENTS[state.charElement].sinh;
      showToast(
        "🔥 [Phá Hành] Đã giữ Vũ Khí " +
          DATA.ELEMENTS[currentVkEl].fullName +
          " & tăng thêm đồ " +
          DATA.ELEMENTS[boostEl].fullName +
          " để tăng kháng hệ khắc (" +
          DATA.ELEMENTS[boostEl].resistanceLabel +
          ")!"
      );
      renderAll();
    });

    // 7. Nút Bật/Tắt đường nối kích hệ
    const btnToggleLines = document.getElementById("btnToggleLines");
    btnToggleLines.addEventListener("click", function () {
      state.showLines = !state.showLines;
      btnToggleLines.setAttribute("aria-pressed", String(state.showLines));
      btnToggleLines.textContent = state.showLines
        ? "🔗 Đường Nối Kích Hệ: BẬT"
        : "🔗 Đường Nối Kích Hệ: TẮT";
      renderAll();
    });

    // 8. Nút Lưu Bộ Trang Bị (Lưu được cả Chuẩn lẫn Phá Hành)
    document.getElementById("btnSavePreset").addEventListener("click", function () {
      const nameInput = document.getElementById("inputPresetName");
      const noteInput = document.getElementById("inputPresetNote");
      const buildEval = ENGINE.evaluateFullBuild(state.charElement, state.equipment);

      const saved = STORAGE.saveBuildPreset(
        nameInput.value,
        noteInput.value,
        state.charElement,
        state.equipment,
        buildEval.isPhaHanhBuild
      );

      nameInput.value = "";
      noteInput.value = "";
      showToast("✅ Đã lưu bộ phối đồ: " + saved.name);
      renderPresetsList();
    });

    // 9. Nút Copy JSON cấu hình
    document.getElementById("btnExportJson").addEventListener("click", function () {
      const payload = JSON.stringify(
        {
          charElement: state.charElement,
          equipment: state.equipment
        },
        null,
        2
      );
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(payload).then(function () {
          showToast("📋 Đã sao chép mã JSON bộ trang bị vào Clipboard!");
        });
      }
    });

    // 10. Nút Nhập (Import) JSON cấu hình
    const btnImportJson = document.getElementById("btnImportJson");
    if (btnImportJson) {
      btnImportJson.addEventListener("click", function () {
        const rawJson = window.prompt(
          "Dán mã JSON bộ trang bị (Chuẩn hoặc Phá Hành) vào đây để mở:"
        );
        if (!rawJson) return;
        try {
          const parsed = JSON.parse(rawJson);
          if (parsed && parsed.charElement && parsed.equipment) {
            state.charElement = parsed.charElement;
            state.equipment = parsed.equipment;
            showToast("📥 Đã nhập thành công cấu hình bộ trang bị từ JSON!");
            renderAll();
          } else {
            showToast("⚠️ Mã JSON không đúng định dạng bộ trang bị VLTK 1.");
          }
        } catch (err) {
          showToast("⚠️ Lỗi đọc mã JSON. Vui lòng kiểm tra lại.");
        }
      });
    }

    // Vẽ lại đường nối khi thay đổi kích thước cửa sổ
    window.addEventListener("resize", function () {
      const buildEval = ENGINE.evaluateFullBuild(state.charElement, state.equipment);
      renderActivationLinesSvg(buildEval);
    });
  }

  // Khởi chạy khi DOM sẵn sàng
  document.addEventListener("DOMContentLoaded", function () {
    initAppState();
    bindGlobalEvents();
    renderAll();
  });
})(window);

