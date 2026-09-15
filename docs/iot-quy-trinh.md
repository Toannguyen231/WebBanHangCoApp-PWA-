# Quy Trình IoT — Chiếu Nẫu: Gìn Nghề, Giữ Sinh Kế

> Phiên bản: 1.0 — 06/09/2026
> Mục tiêu: số hóa chuỗi giá trị cói đan tay, từ đồng cói → tay khách hàng, gắn thẳng vào web PWA hiện tại.

## 1. Sơ đồ tổng thể

```
[1. Đồng cói] → [2. Phơi/Sấy] → [3. Nhuộm] → [4. Đan/Xưởng] → [5. Kho TP] → [6. Bán/QR] → [7. Vận chuyển B2B]
     ESP32            ESP32          ESP32         RFID+ESP32       ESP32        Web PWA          GPS+Logger
   đất/nước/mưa     nắng/mưa/ẩm   pH/nhiệt/cân   chấm công/cân   nhiệt/ẩm/khí   /quet-ma batch   nhiệt/ẩm/GPS
       │                │              │               │              │               │                 │
       └────────────────┴──────────────┴───────────────┴──────────────┴───────────────┴─────────────────┘
                                                        MQTT (HiveMQ free) → Express server/index.js → store.json
                                                        → AdminDashboard (tab IoT) + VerifyPage (timeline batch)
```

Mã lô xuyên suốt: `BATCH_ID = CN-YYMMDD-LoX` (VD: `CN-260905-B3`).
Mỗi Batch đi qua tất cả công đoạn, lưu lịch sử → khách quét QR thấy full timeline.

## 2. Chi tiết 7 công đoạn

### GĐ1 — Đồng cói (vùng nguyên liệu)
- **Vấn đề:** cói non/già, ngập úng quyết định 70% độ dai sợi. Hiện dựa vào kinh nghiệm.
- **IoT:** 1 trạm ESP32 + cảm biến ẩm đất capacitive + DS18B20 nhiệt đất + mưa + mực nước. Pin năng lượng mặt trời 5W. Gửi LoRa/MQTT 4h/lần.
- **Ngưỡng:** ẩm đất <30% → tưới; ngập >10cm quá 48h → cảnh báo thối gốc.
- **Gắn web:** trang Câu Chuyện `/cau-chuyen` thêm block "Đồng cói hôm nay: 31°C - ẩm 62% - tốt để thu hoạch". Dữ liệu thật → storytelling thi cực mạnh.

### GĐ2 — Phơi / Sấy cói (NÊN LÀM DEMO NHẤT)
- **Vấn đề:** mưa bất chợt = mốc, thâm, bỏ cả mẻ. Nỗi đau lớn nhất làng nghề.
- **IoT:** node ESP32 + DHT22 (nhiệt/ẩm) + BH1750 (cường độ nắng) + cảm biến mưa. Còi + đèn tại sân phơi.
- **Logic:** mưa = 1 HOẶC ẩm >85% → bắn PWA push "Thu cói vào đi chị Ba ơi!". Nắng >50k lux + ẩm <60% = phơi lý tưởng.
- **Nâng cấp:** mái che kéo tự động (motor DC) + quạt sấy khi ẩm cao 3 ngày liên tiếp.
- **Gắn web:** lưu `phoi_logs: [{ngay, nang_gio, dinh_mua: 0/1}]` vào batch. VerifyPage hiện "Mẻ này phơi 3 nắng, không dính mưa".
- **BOM:** ESP32 120k + DHT22 35k + BH1750 65k + rain sensor 30k + còi/box 100k ≈ 350k.

### GĐ3 — Nhuộm màu tự nhiên
- **Vấn đề:** mỗi mẻ lệch màu vì pha bằng cảm quan. Đơn B2B 500 set An Yên lệch màu là toang.
- **IoT:** đầu đo pH analog + DS18B20 nhiệt nồi + loadcell 5kg cân nguyên liệu/thuốc nhuộm.
- **Công thức chuẩn:** lưu `nhuom_recipe: {nhiet: 70°C, tgian: 45ph, pH: 6.2, ti_le: 1:10}`. Lệch >±3°C hoặc ±0.5 pH → kêu.
- **Gắn web:** AdminProducts form thêm field `batchId`, `nhuom_mau`. QR batch chứa mã màu để đối chiếu đơn B2B.

### GĐ4 — Xưởng đan (con người + sinh kế)
- **Vấn đề:** không biết ai đan, năng suất, hàng lỗi ở khâu nào.
- **IoT (nhẹ, tôn trọng thợ):** thẻ RFID cho mỗi nghệ nhân chấm công vào/ra. Cân điện tử check trọng lượng SP trước nhập (túi lệch >15% = lỗi đan). Nút bấm lỗi 3 màu: sợi gãy / lệch màu / đường đan.
- **Gắn web:** bảng `artisans: {id, ten, so_sp, ti_le_loi}`. Trang Tác động xã hội `/tac-dong-xa-hoi` hiện số liệu thật: "12 thợ - 340h công - thu nhập +18%". Đi thi ăn điểm xã hội.

### GĐ5 — Kho thành phẩm
- **Vấn đề:** túi cói để ẩm là mốc, hôi. Hiện kiểm tra bằng mũi.
- **IoT:** 1 node DHT22 + MQ135 (khí mốc/VOC) trong kho. Ngưỡng: ẩm >75% hoặc >38°C → quạt thông gió tự bật + push admin.
- **Gắn web:** thêm widget vào AdminDashboard hiện tại: `Kho: 29°C - 68% - Ổn`. Lưu `kho_logs` theo giờ. Đơn hàng nào xuất kho lúc ẩm cao → flag kiểm tra lại.

### GĐ6 — Bán + Truy xuất QR (NÂNG CẤP /quet-ma HIỆN TẠI)
- **Hiện tại:** VerifyPage.jsx chỉ check `id/slug` tĩnh trong products.js → copy QR là fake được.
- **Nâng cấp:** QR in trên tag chứa `batchId` (VD: `https://chieunau.vn/quet-ma?code=CN-260905-B3`).
- **Luồng mới:**
  1. Quét → GET `/api/batch/:id` → trả về product + phoi_logs + nhuom_recipe + artisan + kho_logs + video đan.
  2. UI timeline 5 bước: Đồng → Phơi → Nhuộm → Đan (tên cô Ba) → Kho. Mỗi bước có số liệu IoT + tick xanh.
  3. Nếu batch không tồn tại → cảnh báo đỏ "Không phải hàng Chiếu Nẫu".
- **Backend:** thêm 2 route vào server/index.js: `POST /api/iot/ingest` (ESP32 đẩy), `GET /api/batch/:id`. Lưu vào store.json (Phase thi) → InfluxDB (Phase thật).

### GĐ7 — Vận chuyển B2B + Trưng bày
- **Vấn đề:** set quà 320-580k đi xa dễ ẩm mốc, không chứng minh được.
- **IoT:** logger nhiệt ẩm + GPS giá rẻ (Quectel L76 + DHT22 + SIM) nhét vào thùng B2B. Khách nhận quét thấy hành trình "Sài Gòn 2 ngày - max 33°C - ẩm max 70% - An toàn".
- **Shop:** beacon BLE ở kệ, khách PWA tới gần kệ quạt → tự bắn voucher CHIEUNAU20.

## 3. Kiến trúc kỹ thuật (rẻ nhất để thi)

```
ESP32 (Arduino) → WiFi/MQTT → HiveMQ Cloud free → Node worker trong server/index.js
→ validate → append store.json: {batches, iot_readings, alerts}
→ SSE/WebSocket → Admin IoT Dashboard (biểu đồ) + PWA push (cảnh báo thu cói)
```

- **Firmware:** Arduino + PubSubClient, deep-sleep 15ph để tiết kiệm pin, topic `chieunau/phoi/node1`.
- **Backend thêm:** `POST /api/iot/ingest {node, temp, hum, lux, rain, batchId}` + `GET /api/iot/latest?node=phoi1` + `GET /api/batch/:id`.
- **Frontend thêm:** `src/pages/admin/AdminIoT.jsx` tab mới + nâng `VerifyPage.jsx` thêm timeline batch.
- **Bảo mật thi:** token đơn giản `IOT_KEY` trong .env, ESP32 gửi kèm header. Ghi rõ "Phase thật dùng TLS + per-device cert".

## 4. Data model (thêm vào store.json)

```json
{
  "batches": [{ "id": "CN-260905-B3", "product_slug": "tui-xach-coi", "ngay_cat": "2026-09-05", "artisan": "Cô Ba", "phoi": {"nang_gio": 21, "dinh_mua": 0}, "nhuom": {"T": 70, "pH": 6.2, "phut": 45}, "kho": {"Tmax": 31, "Hmax": 69}, "status": "dang_ban" }],
  "iot_readings": [{ "node": "phoi1", "T": 33.2, "H": 58, "lux": 62000, "rain": 0, "ts": "2026-09-06T04:00:00Z" }],
  "alerts": [{ "ts": "...", "node": "phoi1", "msg": "Mưa! Thu cói", "level": "urgent" }]
}
```

## 5. Lộ trình 3 phase (để slide thi)

- **Phase 1 — 1 tuần, 350k:** GĐ2 phơi + GĐ6 QR batch mock. Có demo bấm được, có số liệu thật.
- **Phase 2 — 1 tháng:** GĐ3 nhuộm + GĐ5 kho + tab Admin IoT. Chuẩn hóa chất lượng.
- **Phase 3 — 3 tháng:** GĐ1 đồng cói + GĐ4 RFID + GĐ7 GPS. Hoàn thiện chuỗi.

## 6. Kịch bản demo 3 phút (giám khảo nhớ mãi)

1. Xịt nước vào cảm biến mưa → 5s sau PWA trên tay giám khảo rung "Thu cói vào!".
2. Quét QR túi mẫu → hiện timeline "Phơi 3 nắng - Nhuộm 70°C pH6.2 - Cô Ba đan - Kho ổn".
3. Mở Admin → biểu đồ nắng/mưa realtime nhảy. Chốt: "Từ sợi cói ướt mưa → chiếc túi có số phận rõ ràng".
