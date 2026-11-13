# Art Bible: Pixel Watering Game

> **Status**: Approved
> **Owned By**: art-director
> **Last Updated**: 2026-11-13
> **Art Director Sign-Off (AD-ART-BIBLE)**: SKIPPED 2026-11-13 — solo mode

\`$art-bible\` writes these nine sections in this order and replaces each
section's \`[To be designed]\` line as that section is approved. A section still
holding its placeholder is incomplete; a later run fills only those.

## 1. Visual Identity Statement

**Quy tắc hình ảnh:** Hãy dựng khu vườn thành một khoảnh khắc chăm cây ấm áp, rõ nét trong khung 180×320: mắt người chơi đi từ trời dịu đến cây, rồi theo dòng nước; mọi chi tiết pixel phục vụ cảm giác thư thái và điểm tập trung ấy.

- **Cây là tâm điểm sống động.** Khi chi tiết nền cạnh tranh với cây, hãy giản lược nền và giữ hình dáng cây, chậu cùng dòng nước dễ nhận ra. Nguyên tắc này phục vụ vòng lặp tưới và sưu tầm.
- **Ánh sáng tự nhiên, ấm và trong.** Khi sắc ấm làm giảm độ rõ, hãy giữ ánh sáng ấm ở nền nhưng tăng tương phản sáng tối quanh cây và nước. Nguyên tắc này phục vụ cảm giác thư giãn trên mobile.
- **Niềm vui đến nhẹ nhàng.** Khi cần nhấn mạnh tưới hoặc nhận thưởng, hãy chọn một điểm nhấn màu và chuyển động ngắn, dịu thay vì hiệu ứng chói hoặc dồn dập. Nguyên tắc này phục vụ những phiên chơi ngắn, thư thái.

Ghibli là cảm hứng rộng về sự gần gũi với thiên nhiên và kể chuyện bằng môi trường; không mô phỏng nhân vật, bố cục hoặc dấu ấn cụ thể của phim hay studio.

## 2. Mood & Atmosphere

- **Vườn nghỉ giữa các thao tác:** bình yên, có sức sống; ánh sáng tự nhiên ấm, tương phản thấp ở nền và vừa quanh cây; trong, xanh, mềm, yên tĩnh; năng lượng chiêm nghiệm.
- **Đang tưới:** tập trung, vui nhẹ; nền giữ ổn định, tương phản cục bộ tăng giữa nước sáng với cây và chậu; trong trẻo, lấp lánh, gần gũi, dịu; năng lượng vừa phải.
- **Khoảnh khắc nhận thưởng:** hài lòng, bất ngờ êm; điểm vàng ấm cục bộ, tương phản cao hơn nền nhưng không chớp sáng; ấm, tươi, tinh tế, ngắn gọn; năng lượng nhích lên rồi lắng xuống.
- **Xem bộ sưu tập:** tự hào và thư thái; ánh sáng ấm ổn định, tương phản đủ để phân biệt từng cây và vật phẩm; ngăn nắp, thân thuộc, phong phú, tĩnh; năng lượng thấp.

Các trạng thái dùng chung một khu vườn và ánh sáng tự nhiên; chỉ thay đổi điểm nhấn và tương phản cục bộ để giữ master scene nhất quán.

## 3. Shape Language

- **Silhouette:** cây là khối hữu cơ cao với lá tách bạch; chậu là khối thang cân, miệng chậu rõ; bình tưới có thân gọn và vòi chéo dễ nhận ra; bàn tay dùng khối ngón giản lược. Mỗi hình phải nhận ra được ở kích thước sprite nhỏ.
- **Hình môi trường:** mây và lá dùng đường bậc cong, không đều; bàn, chậu và bình dùng cạnh pixel gọn, có góc mềm hoặc vát bậc. Hình nền ít cạnh tương phản để cây nổi bật.
- **HUD/popup:** khung chữ nhật pixel có góc vát nhẹ, viền rõ và mặt phẳng màu ấm; biểu tượng có silhouette riêng, không dùng kính mờ hoặc viền trang trí dày. Đây là quy tắc hình dáng, không quy định bố cục UI.
- **Thứ bậc:** cây, chậu và dòng nước là nhóm chính; tay và bình dẫn mắt tới cây; bàn và mây hỗ trợ không khí, giữ tương phản và chi tiết thấp hơn.

## 4. Color System

| Màu | HEX | Vai trò và ý nghĩa |
|---|---|---|
| Trời dịu | `#82C6D3` | Mảng trời xanh, tạo cảm giác thoáng và trong. |
| Kem mây | `#F4E8C8` | Mây, vùng sáng và nền giấy UI; tạo độ ấm dịu. |
| Xanh viền vườn | `#315A45` | Viền, bóng sâu và chữ cần tương phản; neo hình vào cảm giác khu vườn. |
| Xanh lá | `#6F9A57` | Lá và thân cây; dấu hiệu sự sống, không đại diện trạng thái riêng. |
| Gỗ ấm | `#9A6344` | Bàn và bóng gỗ; tạo nền vật liệu ấm. |
| Đất nung | `#C87558` | Chậu đất; phân biệt chậu với lá và mặt bàn. |
| Nắng vàng | `#F2C76E` | Ánh sáng và điểm nhấn thưởng; không báo nguy hiểm. |

- Giữ 7 màu nền tảng; tạo sáng tối bằng phân bố pixel và phối màu có kiểm soát, không mở rộng bảng màu tùy tiện.
- Trời và mây sáng, mát nhẹ; cây nhận sắc xanh trung tính; bàn và chậu ấm hơn nền. Điểm vàng chỉ dùng ở vùng sáng hoặc nhấn thưởng.
- UI dùng kem mây làm nền và xanh viền vườn cho chữ/viền; không thêm màu semantic riêng.
- Không dùng màu đơn độc để biểu đạt tương tác hay thưởng: ghép với hình giọt nước, silhouette phần thưởng, đường viền hoặc chuyển động ngắn. Không phân biệt cây/vật phẩm chỉ bằng màu lá.

## 5. Character Design Direction

[To be designed] — the player character's visual archetype, how players tell
enemies, NPCs and allies apart at a glance, expression and pose style, and how
much detail survives at game camera distance (LOD philosophy).

## 6. Environment Design Language

- **Master scene:** một khung dọc duy nhất 180×320, không tách biome hoặc parallax. Dành 10–20% phía trên làm khoảng thoáng cho thanh tăng trưởng; trời và mây chiếm khoảng 0–45% chiều cao; nhóm cảnh chính nằm trong dải 45–82%; phần dưới còn lại giữ yên và ít chi tiết.
- **Bố cục và tỷ lệ:** cây/chậu ở giữa khung (x≈50%); tán cây khoảng y=45–65%, chậu y=65–75%. Mặt bàn bắt đầu gần y=75%, kéo ngang khung và dày 5–8% chiều cao. Tay/bình ở bên phải (x=73–100%, y=64–82%), vòi nghiêng vào cây. Dòng nước đi chéo ngắn vào chậu, không che silhouette chính.
- **Layer từ sau ra trước:** trời → vườn xa ít tương phản → mây → mặt/cạnh bàn → tán/lá/thân → thành sau, thân chậu và đất → mép trước chậu → dòng nước và splash nhỏ trong chậu → tay/bình; ngón tay phủ lên quai, đầu vòi che nhẹ điểm bắt đầu dòng nước.
- **Ánh sáng:** nguồn sáng ấm ngoài khung từ trên trái; highlight ngắn trên lá, mép chậu, bàn và bình; bóng pixel gọn đổ về dưới phải. Không dùng gradient mờ.
- **Chất liệu và mật độ:** trời phẳng, mây có đường bậc cong, gỗ dùng vài dải vân lớn; đất nung và lá dùng mảng sáng–trung–tối gọn. Chỉ dùng thành phần trong brief, không thêm vật trang trí.
- **Độ đọc và kể chuyện môi trường:** cây/chậu/nước có tương phản cao nhất; bàn, mây và vườn xa lùi bằng ít chi tiết hơn. Tay, quai, vòi và nước vẫn nhận ra ở kích thước nhỏ. Kể chuyện bằng ánh sáng, màu và vật liệu của khu vườn, không dựa vào vật thể mới.

Các tỷ lệ là đề xuất bố cục cho Art Bible, bám scaffold hiện có: cây x=90, bình x=144, mặt bàn khoảng y=239. Chúng không thay đổi gameplay hay logic.

## 7. UI/HUD Visual Direction

[To be designed] — diegetic versus screen-space HUD, typography (personality,
weight, size hierarchy, minimum readable size), iconography style, UI animation
feel, and any art-direction versus readability conflict and how it was decided.

## 8. Asset Standards

- **Thứ tự sản xuất:** duyệt một scene preview hợp nhất trước; sau đó mới tách sprite riêng. Mọi sprite vẫn thuộc master scene 180×320, palette 7 màu và hướng sáng trên-trái.
- **Định dạng:** sprite runtime dùng PNG RGBA lossless; nền trời có thể opaque, các layer chồng ghép dùng transparency.
- **Lưới pixel và animation:** vẽ trên lưới pixel logic, tránh anti-aliasing và tọa độ/scale lẻ. Mọi frame animation giữ cùng canvas và anchor để không giật vị trí. Sprite tĩnh cắt phần padding trong suốt dư sát nội dung; frame animation giữ biên chung cần thiết.
- **Kích thước:** lấy theo vùng và tỷ lệ trong Section 6; chưa quy định kích thước rời rạc cho từng sprite. Lượt đầu dùng sprite PNG riêng, chưa tạo atlas vì repo chưa có ảnh/pipeline atlas và chưa có số liệu cho thấy cần.
- **Tên file:** theo mẫu `[category]_[name]_[variant]_[size].png`; nhãn size tương đối với master scene (`scene`, `wide`, `medium`, `small`). Ví dụ: `env_sky_base_scene.png`, `env_table_wood_base_wide.png`, `plant_pot_terracotta_base_medium.png`, `prop_watering_can_tilt_base_medium.png`, `vfx_water_stream_pour_small.png`.
- **Web/Phaser:** project pin Web/Vite 8.3.4 và Phaser 4.2.1; game đã bật `pixelArt`. Tài liệu Phaser 4 khuyến nghị WebGL, ghi Canvas renderer đã deprecated và pixel rounding mặc định tắt. Giữ điểm ảnh ở lưới nguyên; kiểm tra độ sắc nét khi scale trên thiết bị mục tiêu.
- **Giới hạn chưa được đánh giá:** project và technical-preferences chưa cấu hình budget draw call/frame, memory hoặc texture ceiling; tài liệu Phaser đã đọc không nêu ceiling riêng cho project. Ghi các giới hạn này là NOT ASSESSED, không suy diễn số. Ngân sách polygon/material slot không áp dụng cho bộ asset 2D này.

Các ghi chú engine là tham chiếu tài liệu, không phải kết quả đo hiệu năng trên thiết bị.

## 9. Reference Direction

[To be designed] — 3–5 references (games, films, art styles or artists). For
each: the specific element to take from it, and what to avoid so the result
does not read as a copy.
