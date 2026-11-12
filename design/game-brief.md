# Game Brief: Pixel Watering Game

**One-sentence pitch:** Chạm để tưới một chậu cây pixel, tích lũy token qua mỗi chu kỳ tăng trưởng rồi dùng chúng quay gacha, sưu tầm cây và vật phẩm mới.

## Core loop

- Chạm tưới; bình nghiêng, nước chảy, cây phản ứng và thanh tăng trưởng tiến.
- Thanh đầy thì nhận token trong game, rồi bắt đầu chu kỳ mới.
- Tích token, dùng máy gacha nhận cây hoặc vật phẩm ngẫu nhiên, thêm vào bộ sưu tập.

## Player goal & fail state — what "working" looks like

Mở rộng bộ sưu tập theo nhịp riêng; không có trạng thái thua, người chơi có thể dừng sau bất kỳ chu kỳ nào.

## MVP — what must exist to be the game

- Cảnh dọc 9:16: trời xanh, mây, bàn gỗ, một chậu cây ở giữa và tay cầm bình tưới ở góc phải dưới.
- Chạm để nghiêng bình và tưới; cây có animation phản ứng cùng thanh tăng trưởng.
- Hoàn tất chu kỳ tăng trưởng sẽ trao token và khởi động chu kỳ mới.
- Máy gacha dùng token kiếm trong game để mở ngẫu nhiên cây hoặc vật phẩm; hiện popup phần thưởng.
- Bộ sưu tập hiển thị cây và vật phẩm đã mở; lưu token và bộ sưu tập cục bộ trên thiết bị.

## Out of scope — not building this

Nhiều chậu hoặc khu vườn; cây héo, thời hạn hay trạng thái thua; token trả phí, quảng cáo, tài khoản hoặc đồng bộ cloud.

## Build order

1. Chứng minh thao tác chạm, nước chảy, phản ứng cây và thanh tăng trưởng trên màn hình điện thoại.
2. Thêm token theo chu kỳ, lượt gacha dùng token và phần thưởng ngẫu nhiên.
3. Thêm bộ sưu tập và lưu cục bộ.
4. Hoàn thiện cảnh pixel 9:16 cùng âm thanh nước và nhận thưởng.

---
**Who it's for / what they feel:** Người chơi mobile muốn những phiên ngắn, thư giãn và có tiến triển sưu tầm.

**Art & audio direction:** Pixel art 16-bit; khu vườn yên bình với trời xanh, mây, bàn gỗ và chậu cây; âm thanh nước cùng hiệu ứng nhận thưởng nhẹ nhàng.

**Reference game:** Đề xuất *Viridi* cho cảm giác chăm cây thư thái; không lấy tăng trưởng thời gian thực.
