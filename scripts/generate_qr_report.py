import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=140, bottom=140, left=180, right=180):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'''
        <w:tcMar {nsdecls("w")}>
            <w:top w:w="{top}" w:type="dxa"/>
            <w:bottom w:w="{bottom}" w:type="dxa"/>
            <w:left w:w="{left}" w:type="dxa"/>
            <w:right w:w="{right}" w:type="dxa"/>
        </w:tcMar>
    ''')
    tcPr.append(tcMar)

def add_callout(doc, text_content, title="LƯU Ý CHIẾN LƯỢC"):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    cell = table.cell(0, 0)
    cell.width = Inches(6.5)
    set_cell_background(cell, "F5F8F5")
    set_cell_margins(cell, top=160, bottom=160, left=220, right=200)
    
    # Left thick border
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(f'''
        <w:tcBorders {nsdecls("w")}>
            <w:left w:val="single" w:sz="36" w:space="0" w:color="2D5A2D"/>
            <w:top w:val="none"/>
            <w:right w:val="none"/>
            <w:bottom w:val="none"/>
        </w:tcBorders>
    ''')
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(4)
    run_title = p.add_run(f"📌 {title}: ")
    run_title.bold = True
    run_title.font.name = "Segoe UI"
    run_title.font.size = Pt(10.5)
    run_title.font.color.rgb = RGBColor(45, 90, 45)
    
    run_text = p.add_run(text_content)
    run_text.font.name = "Segoe UI"
    run_text.font.size = Pt(10)
    run_text.font.color.rgb = RGBColor(40, 50, 40)
    
    p_after = doc.add_paragraph()
    p_after.paragraph_format.space_before = Pt(4)
    p_after.paragraph_format.space_after = Pt(6)

def format_row(row, bg_hex, text_color_rgb, is_header=False, font_size=9.5):
    for cell in row.cells:
        set_cell_background(cell, bg_hex)
        set_cell_margins(cell, top=120, bottom=120, left=140, right=140)
        cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
        for p in cell.paragraphs:
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(2)
            for r in p.runs:
                r.font.name = "Segoe UI"
                r.font.size = Pt(font_size)
                r.font.color.rgb = text_color_rgb
                if is_header:
                    r.bold = True

def create_report():
    doc = Document()
    
    # Page setup
    for section in doc.sections:
        section.top_margin = Inches(0.9)
        section.bottom_margin = Inches(0.9)
        section.left_margin = Inches(0.9)
        section.right_margin = Inches(0.9)
        section.page_width = Inches(8.27)  # A4
        section.page_height = Inches(11.69)
        
    # Styles config
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Segoe UI'
    normal_style.font.size = Pt(10.5)
    normal_style.font.color.rgb = RGBColor(45, 45, 45)
    normal_style.paragraph_format.line_spacing = 1.25
    normal_style.paragraph_format.space_after = Pt(6)

    # ─── HEADER / BANNER TITLE ───
    title_p = doc.add_paragraph()
    title_p.paragraph_format.space_before = Pt(0)
    title_p.paragraph_format.space_after = Pt(4)
    title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    subtag_run = title_p.add_run("DỰ ÁN CHIẾU NẪU — BÁO CÁO NGHIÊN CỨU & KHẢO SÁT ỨNG DỤNG\n")
    subtag_run.font.name = "Segoe UI"
    subtag_run.font.size = Pt(10)
    subtag_run.bold = True
    subtag_run.font.color.rgb = RGBColor(201, 169, 110) # Gold
    
    main_title_run = title_p.add_run("GIẢI PHÁP ĐỊNH DANH ĐỘC BẢN & TRUY XUẤT NGUỒN GỐC SẢN PHẨM\nBẰNG TEM MÃ QR SỐ HÓA (DIGITAL PRODUCT PASSPORT)")
    main_title_run.font.name = "Segoe UI"
    main_title_run.font.size = Pt(17)
    main_title_run.bold = True
    main_title_run.font.color.rgb = RGBColor(45, 90, 45) # Forest Green
    
    desc_p = doc.add_paragraph()
    desc_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    desc_p.paragraph_format.space_after = Pt(18)
    desc_run = desc_p.add_run("Khảo sát mô hình thực tế từ các nhãn hàng quốc tế & trong nước | Quy trình kỹ thuật sinh mã, in ấn, dán thẻ bài mộc lên từng sản phẩm riêng lẻ | Lộ trình nâng cấp hệ thống Chiếu Nẫu")
    desc_run.font.name = "Segoe UI"
    desc_run.font.size = Pt(10)
    desc_run.italic = True
    desc_run.font.color.rgb = RGBColor(100, 100, 100)
    
    # Metadata info table
    meta_table = doc.add_table(rows=2, cols=4)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_table.autofit = False
    col_widths = [Inches(1.5), Inches(1.8), Inches(1.5), Inches(1.7)]
    for row in meta_table.rows:
        for i, w in enumerate(col_widths):
            row.cells[i].width = w
            
    meta_data = [
        [("Đơn vị thực hiện", True), ("Dự án Chiếu Nẫu", False), ("Ngày lập báo cáo", True), ("Tháng 09/2026", False)],
        [("Nền tảng mục tiêu", True), ("Web App PWA & Thẻ bài mộc", False), ("Phạm vi áp dụng", True), ("Làng nghề cói Phú Tân", False)]
    ]
    for row_idx, row_content in enumerate(meta_data):
        row = meta_table.rows[row_idx]
        for col_idx, (text, is_bold) in enumerate(row_content):
            cell = row.cells[col_idx]
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(2)
            r = p.add_run(text)
            r.font.name = "Segoe UI"
            r.font.size = Pt(9)
            if is_bold:
                r.bold = True
                set_cell_background(cell, "EAEFEA")
                r.font.color.rgb = RGBColor(45, 90, 45)
            else:
                set_cell_background(cell, "FAFAFA")
                r.font.color.rgb = RGBColor(50, 50, 50)
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            
    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # Helper function for Headings
    def add_heading_1(text):
        h = doc.add_paragraph()
        h.paragraph_format.space_before = Pt(16)
        h.paragraph_format.space_after = Pt(6)
        h.paragraph_format.keep_with_next = True
        r = h.add_run(text)
        r.font.name = "Segoe UI"
        r.font.size = Pt(13.5)
        r.bold = True
        r.font.color.rgb = RGBColor(45, 90, 45)
        return h

    def add_heading_2(text):
        h = doc.add_paragraph()
        h.paragraph_format.space_before = Pt(10)
        h.paragraph_format.space_after = Pt(4)
        h.paragraph_format.keep_with_next = True
        r = h.add_run(text)
        r.font.name = "Segoe UI"
        r.font.size = Pt(11.5)
        r.bold = True
        r.font.color.rgb = RGBColor(180, 135, 60) # Warm Gold
        return h

    # ══════════════════════════════════════════════════════════════
    # PHẦN 1
    # ══════════════════════════════════════════════════════════════
    add_heading_1("1. ĐẶT VẤN ĐỀ & Ý NGHĨA CHIẾN LƯỢC")
    
    p = doc.add_paragraph()
    p.add_run("Trong ngành thủ công mỹ nghệ truyền thống Việt Nam nói chung và các sản phẩm từ cói Phú Tân (Chiếu Nẫu) nói riêng, người tiêu dùng hiện đại — đặc biệt là thế hệ Gen Z, khách hàng doanh nghiệp (B2B) và du khách quốc tế — không chỉ mua một vật phẩm gia dụng đơn thuần, mà họ đang tìm kiếm ")
    r_bold = p.add_run("giá trị văn hóa, nguồn gốc minh bạch và câu chuyện nhân văn phía sau.")
    r_bold.bold = True

    p = doc.add_paragraph()
    p.add_run("Hiện nay, trên thị trường có hàng loạt sản phẩm mây tre đan, chiếu cói công nghiệp trôi nổi không rõ nguồn gốc, nhập khẩu tiểu ngạch giá rẻ hoặc sử dụng hóa chất chống mốc độc hại. Việc tạo ra một ")
    p.add_run("Mã QR định danh riêng biệt (Unit-level Serialized QR) cho từng sản phẩm đơn lẻ ").bold = True
    p.add_run("chính là lời cam kết mạnh mẽ nhất về chất lượng, tạo dựng niềm tin tuyệt đối và nâng tầm giá trị thương hiệu thủ công của Việt Nam.")

    add_callout(
        doc,
        "Khi mỗi chiếc túi, chiếc quạt cói mang một mã số độc bản, sản phẩm không còn là 'hàng loạt vô danh' mà trở thành một 'tác phẩm nghệ thuật có căn cước công dân riêng'. Khách hàng biết chính xác ai là người đã đan ra chiếc quạt của họ và bao nhiêu tiền công đã được chuyển trực tiếp tới tay người thợ.",
        "GIÁ TRỊ CỐT LÕI CỦA ĐỊNH DANH SỐ"
    )

    # ══════════════════════════════════════════════════════════════
    # PHẦN 2
    # ══════════════════════════════════════════════════════════════
    add_heading_1("2. KHẢO SÁT THỊ TRƯỜNG: ĐÃ CÓ NHÃN HÀNG NÀO LÀM CHƯA?")
    
    p = doc.add_paragraph()
    p.add_run("Câu trả lời là: ")
    p.add_run("CÁC TẬP ĐOÀN ĐỈNH CAO THẾ GIỚI VÀ CÁC THƯƠNG HIỆU ĐẦU NGÀNH TẠI VIỆT NAM ĐÃ VÀ ĐANG COI ĐÂY LÀ TIÊU CHUẨN BẮT BUỘC.").bold = True
    p.add_run(" Dưới đây là các case study điển hình chứng minh tính hiệu quả vượt trội:")

    add_heading_2("2.1. Các thương hiệu & tập đoàn Quốc tế")
    
    # Table case studies quốc tế
    t_global = doc.add_table(rows=5, cols=3)
    t_global.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_global.autofit = False
    for row in t_global.rows:
        row.cells[0].width = Inches(1.5)
        row.cells[1].width = Inches(1.8)
        row.cells[2].width = Inches(3.2)
        
    headers_global = ["Thương hiệu", "Giải pháp áp dụng", "Hiệu quả & Giá trị mang lại"]
    for i, h_text in enumerate(headers_global):
        t_global.rows[0].cells[i].paragraphs[0].add_run(h_text)
    format_row(t_global.rows[0], "2D5A2D", RGBColor(255, 255, 255), is_header=True)
    
    data_global = [
        ("Patagonia (Mỹ)\nThời trang bền vững", "Chương trình 'Footprint Chronicles' & QR Tag trên từng sản phẩm", "Quét mã để xem nguồn gốc sợi bông hữu cơ, nhà máy may, chứng nhận Fair Trade và lượng khí thải carbon được bù đắp. Tạo nên cộng đồng khách hàng trung thành bậc nhất thế giới."),
        ("Tập đoàn LVMH\n(Louis Vuitton, Dior, Hennessy)", "Aura Blockchain Consortium & QR Passport", "Mỗi chiếc túi xách cao cấp có 1 thẻ bài kèm mã QR gắn chip bảo mật. Quét mã xác nhận quyền sở hữu độc bản, chống 100% hàng giả và hỗ trợ chuyển nhượng đồ vintage xa xỉ minh bạch."),
        ("Breitling (Thụy Sĩ)\nĐồng hồ cơ khí xa xỉ", "Digital Passport thay thế sổ bảo hành giấy truyền thống", "Mỗi chiếc đồng hồ có một định danh số duy nhất lưu trữ lịch sử bảo dưỡng, chứng nhận xuất xưởng của nghệ nhân và cho phép kích hoạt bảo hành điện tử một chạm."),
        ("Liên minh Châu Âu (EU)\nQuy định Pháp lý mới", "Chỉ thị DPP (Digital Product Passport) bắt buộc từ 2026", "Tất cả các sản phẩm dệt may, giày dép và thủ công xuất khẩu vào châu Âu bắt buộc phải có mã QR dẫn đến dữ liệu truy xuất chuỗi cung ứng, tái chế và tác động môi trường.")
    ]
    for row_idx, data in enumerate(data_global, start=1):
        row = t_global.rows[row_idx]
        for col_idx, text in enumerate(data):
            row.cells[col_idx].paragraphs[0].add_run(text)
        bg = "FFFFFF" if row_idx % 2 != 0 else "F9FAF9"
        format_row(row, bg, RGBColor(50, 50, 50))

    add_heading_2("2.2. Các thương hiệu & Làng nghề tiêu biểu tại Việt Nam")
    
    p = doc.add_paragraph()
    p.add_run("Tại Việt Nam, xu hướng này đang phát triển cực kỳ mạnh mẽ trong chương trình OCOP Quốc gia và ngành nông sản - thủ công cao cấp:")

    t_vn = doc.add_table(rows=4, cols=3)
    t_vn.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_vn.autofit = False
    for row in t_vn.rows:
        row.cells[0].width = Inches(1.5)
        row.cells[1].width = Inches(1.8)
        row.cells[2].width = Inches(3.2)
        
    headers_vn = ["Mô hình tại Việt Nam", "Hình thức mã QR", "Ý nghĩa thực tiễn"]
    for i, h_text in enumerate(headers_vn):
        t_vn.rows[0].cells[i].paragraphs[0].add_run(h_text)
    format_row(t_vn.rows[0], "C9A96E", RGBColor(30, 30, 30), is_header=True)
    
    data_vn = [
        ("Làng Gốm Bát Tràng\n(Hà Nội)", "Tem QR 'Bát Tràng Authentic' dán dưới đáy sản phẩm", "Truy xuất danh tính lò nung, nghệ nhân vuốt gốm, nhiệt độ nung và chứng nhận chỉ dẫn địa lý. Giúp khách du lịch phân biệt gốm truyền thống với gốm sứ công nghiệp nhập giá rẻ."),
        ("HTX Lanh Lùng Tám\n(Quản Bạ, Hà Giang)", "Thẻ bài Kraft kẹp sợi lanh có in mã QR câu chuyện", "Quét mã để xem đoạn video ngắn về người phụ nữ H'Mông dệt cuộn vải đó, quá trình nhuộm chàm tự nhiên 20 ngày và hỗ trợ sinh kế cho đồng bào vùng cao."),
        ("Vinamilk Organic &\nCầu Đất Farm", "Mã QR Serialized dán trên từng hộp sản phẩm", "Xem nhật ký điện tử: bò được chăn thả ở trang trại nào, ngày vắt sữa, công nghệ đóng gói. Giúp khẳng định vị thế sản phẩm Organic chuẩn châu Âu.")
    ]
    for row_idx, data in enumerate(data_vn, start=1):
        row = t_vn.rows[row_idx]
        for col_idx, text in enumerate(data):
            row.cells[col_idx].paragraphs[0].add_run(text)
        bg = "FFFFFF" if row_idx % 2 != 0 else "FAF8F5"
        format_row(row, bg, RGBColor(50, 50, 50))

    # ══════════════════════════════════════════════════════════════
    # PHẦN 3
    # ══════════════════════════════════════════════════════════════
    add_heading_1("3. QUY TRÌNH KỸ THUẬT: TẠO MÃ, IN ẤN VÀ GẮN LÊN TỪNG SẢN PHẨM RIÊNG BIỆT")
    
    add_heading_2("3.1. Phân biệt Mã QR chung (Batch QR) và Mã QR độc bản (Serialized Unique QR)")
    p = doc.add_paragraph()
    p.add_run("• ")
    p.add_run("Mã QR chung theo loại (Batch QR): ").bold = True
    p.add_run("Tất cả chiếc quạt in cùng 1 mã QR trỏ về trang web /san-pham/quat-coi. Ưu điểm là in dễ, nhưng nhược điểm là không chứng minh được chiếc quạt trên tay khách là hàng số mấy, ai đan, xuất xưởng ngày nào.\n")
    p.add_run("• ")
    p.add_run("Mã QR định danh độc bản (Serialized QR - Khuyên dùng): ").bold = True
    p.add_run("Mỗi một sản phẩm duy nhất mang một mã số định danh riêng biệt (ví dụ: ")
    p.add_run("CN-QT-2026-00124").bold = True
    p.add_run("). Khi quét, khách hàng thấy số thứ tự tạo tác độc bản, chữ ký điện tử của nghệ nhân và ngày hoàn thành.")

    add_heading_2("3.2. Cấu trúc link và công nghệ bảo mật của Mã QR")
    p = doc.add_paragraph()
    p.add_run("Đường dẫn trong mã QR được định dạng dưới dạng liên kết tự động mở trang web (Deep Link):\n")
    p.add_run("👉 https://chieunau.vn/quet-ma?ser=CN-QT-2026-00124&sig=a8f4c2\n").bold = True
    p.add_run("Trong đó:\n")
    p.add_run("- ser: Mã số định danh của chiếc sản phẩm (Serial Number).\n")
    p.add_run("- sig: Chữ ký số mã hóa chống giả mạo (Secret Hash/Checksum), ngăn chặn người ngoài tự sinh mã giả.")

    add_heading_2("3.3. Quy trình 4 bước từ xưởng sản xuất đến tay khách hàng")

    steps_data = [
        ("Bước 1: Khởi tạo lô mã trên hệ thống quản trị (Admin CMS)", "Quản trị viên vào trang Admin, nhập số lượng sản phẩm hoàn thành tại xưởng (ví dụ: 100 chiếc Túi Bán Nguyệt Sê-rê-pốk). Hệ thống tự động sinh 100 mã số duy nhất kèm chữ ký số và lưu vào cơ sở dữ liệu ở trạng thái 'Đã xuất xưởng'."),
        ("Bước 2: Xuất file in & Tiến hành in ấn tem nhãn vật lý", "Hệ thống xuất ra file PDF vector chứa lưới 100 mã QR kèm tên sản phẩm và logo Chiếu Nẫu. File này được chuyển cho nhà in tem nhãn theo các chất liệu mộc mạc đặc thù."),
        ("Bước 3: Gắn thẻ bài / dán tem tại Hợp tác xã Phú Tân", "Tại khâu KCS (kiểm định chất lượng cuối cùng), nghệ nhân xỏ dây cói/dây đay treo thẻ bài mộc lên quai túi xách hoặc gắn tem niêm phong dưới cán quạt. Sản phẩm chính thức sẵn sàng phân phối."),
        ("Bước 4: Khách hàng quét mã & Kích hoạt quyền sở hữu", "Khách hàng nhận hàng, dùng camera Zalo/iPhone hoặc trang web quét mã. Màn hình hiện 'Hàng thật - Đã xác thực' cùng danh tính nghệ nhân. Khách hàng có thể bấm 'Kích hoạt bảo hành điện tử' lưu số điện thoại cá nhân.")
    ]

    for title, desc in steps_data:
        p_step = doc.add_paragraph()
        p_step.paragraph_format.space_before = Pt(4)
        p_step.paragraph_format.space_after = Pt(2)
        p_step.add_run(f"🔷 {title}\n").bold = True
        p_step.runs[0].font.color.rgb = RGBColor(45, 90, 45)
        p_step.add_run(desc)

    add_heading_2("3.4. Các giải pháp vật liệu in ấn phù hợp với sản phẩm thủ công cói")
    
    t_print = doc.add_table(rows=4, cols=3)
    t_print.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_print.autofit = False
    for row in t_print.rows:
        row.cells[0].width = Inches(1.8)
        row.cells[1].width = Inches(2.5)
        row.cells[2].width = Inches(2.2)
        
    headers_print = ["Hình thức tem/thẻ", "Quy cách & Chất liệu", "Ưu điểm & Chi phí dự kiến"]
    for i, h_text in enumerate(headers_print):
        t_print.rows[0].cells[i].paragraphs[0].add_run(h_text)
    format_row(t_print.rows[0], "2D5A2D", RGBColor(255, 255, 255), is_header=True)
    
    data_print = [
        ("Thẻ bài treo (Eco-Hangtag)\n(Khuyên dùng nhất)", "Giấy Kraft nâu tái sinh dày 350gsm hoặc Giấy ép sợi cói tự nhiên. Đục lỗ xỏ dây đay/dây cói thủ công.", "Rất sang trọng, mộc mạc, đậm hồn quê làng nghề. Dễ in mã biến đổi (Variable Data Printing). Chi phí: ~400 – 800 đ/thẻ."),
        ("Tem vải dệt / Ruy-băng\n(Cho túi xách cao cấp)", "Mác vải satin hoặc vải canvas may giấu tinh tế ở lớp lót bên trong túi xách.", "Bền vững theo thời gian sử dụng, không bị rách hay rơi mất như thẻ giấy. Chi phí: ~700 – 1.200 đ/tem."),
        ("Tem cào bảo mật QR\n(Phòng chống gian lận)", "Tem giấy decal vỡ (tamper-evident) in mã QR kèm phần cào phủ bạc chứa mã PIN xác thực.", "Chống tuyệt đối việc người khác chụp trộm mã QR khi sản phẩm đang trưng bày tại showroom. Chi phí: ~300 – 500 đ/tem.")
    ]
    for row_idx, data in enumerate(data_print, start=1):
        row = t_print.rows[row_idx]
        for col_idx, text in enumerate(data):
            row.cells[col_idx].paragraphs[0].add_run(text)
        bg = "FFFFFF" if row_idx % 2 != 0 else "F7F9F7"
        format_row(row, bg, RGBColor(50, 50, 50))

    # ══════════════════════════════════════════════════════════════
    # PHẦN 4
    # ══════════════════════════════════════════════════════════════
    add_heading_1("4. HƯỚNG DẪN KỸ THUẬT TRIỂN KHAI TRÊN DỰ ÁN CHIẾU NẪU HIỆN CÓ")
    
    p = doc.add_paragraph()
    p.add_run("Dự án ")
    p.add_run("duAnCuocThiMoi").bold = True
    p.add_run(" hiện tại đã có sẵn nền tảng mã nguồn vững chắc: thư viện ")
    p.add_run("html5-qrcode").bold = True
    p.add_run(", trang ")
    p.add_run("VerifyPage.jsx").bold = True
    p.add_run(" và cơ sở dữ liệu Express/SQLite/JSON store. Việc nâng cấp lên hệ thống mã độc bản cho từng sản phẩm cực kỳ dễ dàng theo 3 bước lập trình:")

    p_c1 = doc.add_paragraph()
    p_c1.add_run("1. Thiết kế cơ sở dữ liệu cá thể hóa (Data Schema):\n").bold = True
    p_c1.add_run("Trong thư mục ")
    p_c1.add_run("server/data/store.json").bold = True
    p_c1.add_run(", bổ sung mảng ")
    p_c1.add_run("product_instances").bold = True
    p_c1.add_run(" lưu trữ từng sản phẩm đơn lẻ:\n")
    p_c1.add_run("""   {
     "serial": "CN-QT-2026-0001",
     "productId": 2,
     "artisan": "Nghệ nhân Ma Biêng (62 tuổi, 38 năm nghề)",
     "village": "Làng nghề chiếu cói Phú Tân, Tuy An, Phú Yên",
     "craftDate": "2026-03-15",
     "batchNumber": "LÔ-01/2026",
     "status": "activated",
     "ownerPhone": "0909055594"
   }""")
    p_c1.runs[-1].font.size = Pt(9)
    p_c1.runs[-1].font.name = "Consolas"

    p_c2 = doc.add_paragraph()
    p_c2.paragraph_format.space_before = Pt(6)
    p_c2.add_run("2. Xây dựng chức năng Xuất mã in trong trang Quản trị (Admin):\n").bold = True
    p_c2.add_run("Tại route ")
    p_c2.add_run("/admin/products").bold = True
    p_c2.add_run(", thêm nút 'Tạo lô mã QR'. Người quản lý chỉ cần bấm chọn số lượng (ví dụ 50 chiếc), thư viện ")
    p_c2.add_run("qrcode").bold = True
    p_c2.add_run(" phía Node.js sẽ tự động kết xuất ra một trang HTML/PDF khổ A4 chứa 50 tem QR để in trực tiếp trên máy in decal hoặc gửi xưởng in ấn.")

    p_c3 = doc.add_paragraph()
    p_c3.paragraph_format.space_before = Pt(6)
    p_c3.add_run("3. Nâng cấp giao diện hiển thị chứng nhận (VerifyPage.jsx):\n").bold = True
    p_c3.add_run("Khi khách hàng quét trúng mã ")
    p_c3.add_run("CN-QT-2026-0001").bold = True
    p_c3.add_run(", ngoài thông số kỹ thuật chung, trang sẽ vinh danh: ")
    p_c3.add_run("Ảnh chân dung nghệ nhân Ma Biêng, lời nhắn gửi viết tay từ làng nghề, ngày cây cói được thu hoạch tại đầm Ô Loan và nút 'Kích hoạt thẻ bảo hành chính hãng'.")

    # ══════════════════════════════════════════════════════════════
    # PHẦN 5
    # ══════════════════════════════════════════════════════════════
    add_heading_1("5. ƯỚC TÍNH CHI PHÍ, RỦI RO & LỘ TRÌNH THỰC HIỆN")

    add_heading_2("5.1. Bảng tính toán chi phí đầu tư ban đầu")
    
    t_cost = doc.add_table(rows=5, cols=4)
    t_cost.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_cost.autofit = False
    for row in t_cost.rows:
        row.cells[0].width = Inches(2.2)
        row.cells[1].width = Inches(1.3)
        row.cells[2].width = Inches(1.4)
        row.cells[3].width = Inches(1.6)
        
    headers_cost = ["Hạng mục công việc", "Số lượng dự kiến", "Đơn giá ước tính", "Tổng chi phí"]
    for i, h_text in enumerate(headers_cost):
        t_cost.rows[0].cells[i].paragraphs[0].add_run(h_text)
    format_row(t_cost.rows[0], "2D5A2D", RGBColor(255, 255, 255), is_header=True)
    
    data_cost = [
        ("In thẻ bài mộc Kraft bồi 2 mặt\n(Variable QR Data)", "1.000 thẻ", "600 đ / thẻ", "600.000 VNĐ"),
        ("Dây đay thắt nơ thủ công", "1.000 sợi", "150 đ / sợi", "150.000 VNĐ"),
        ("Phần mềm sinh mã & Web App", "Đã tích hợp sẵn", "0 đ (In-house)", "0 VNĐ"),
        ("TỔNG CHI PHÍ THỬ NGHIỆM", "1.000 sản phẩm", "Chỉ ~750 đ / món", "750.000 VNĐ")
    ]
    for row_idx, data in enumerate(data_cost, start=1):
        row = t_cost.rows[row_idx]
        for col_idx, text in enumerate(data):
            row.cells[col_idx].paragraphs[0].add_run(text)
        is_total = (row_idx == 4)
        bg = "EAEFEA" if is_total else ("FFFFFF" if row_idx % 2 != 0 else "F9FAF9")
        format_row(row, bg, RGBColor(45, 90, 45) if is_total else RGBColor(50, 50, 50), is_header=is_total)

    add_heading_2("5.2. Lộ trình triển khai 3 giai đoạn (Roadmap)")
    p = doc.add_paragraph()
    p.add_run("• ")
    p.add_run("Giai đoạn 1 (Tham gia Cuộc thi & Ra mắt): ").bold = True
    p.add_run("Sử dụng mã QR theo từng danh mục sản phẩm (Batch QR) đã tích hợp sẵn trong trang web. In thử nghiệm 100 thẻ bài mộc mẫu trưng bày cho Ban Giám Khảo trải nghiệm quét thật tại bàn thi.\n")
    p.add_run("• ")
    p.add_run("Giai đoạn 2 (Thương mại hóa quy mô nhỏ): ").bold = True
    p.add_run("Nâng cấp tính năng sinh mã Serialized QR trong Admin CMS. In 1.000 thẻ bài độc bản gán cho đợt hàng túi xách và set quà tặng doanh nghiệp B2B đầu tiên.\n")
    p.add_run("• ")
    p.add_run("Giai đoạn 3 (Mở rộng toàn diện): ").bold = True
    p.add_run("Tích hợp tính năng 'Bảo hành điện tử 12 tháng' và 'Sổ lưu niệm khách hàng'. Khách quét mã có thể gửi lời cảm ơn trực tiếp đến nghệ nhân làng nghề.")

    # ══════════════════════════════════════════════════════════════
    # KẾT LUẬN
    # ══════════════════════════════════════════════════════════════
    add_heading_1("6. KẾT LUẬN & ĐỀ XUẤT HÀNH ĐỘNG DÀNH CHO DỰ ÁN")
    
    p = doc.add_paragraph()
    p.add_run("Việc trang bị thẻ bài mã QR định danh độc bản cho từng sản phẩm Chiếu Nẫu là một bước đi ")
    p.add_run("HOÀN TOÀN KHẢ THI, CHI PHÍ CỰC THẤP (dưới 800đ/sản phẩm) NHƯNG MANG LẠI GIÁ TRỊ CẠNH TRANH KHỔNG LỒ").bold = True
    p.add_run(" trước hội đồng Ban Giám Khảo cuộc thi khởi nghiệp và khách hàng tiêu dùng.")

    p_summary = doc.add_paragraph()
    p_summary.add_run("1. ")
    p_summary.add_run("Với Ban Giám Khảo cuộc thi: ").bold = True
    p_summary.add_run("Thể hiện dự án có chiều sâu công nghệ, bắt kịp xu hướng Hộ chiếu sản phẩm số (Digital Product Passport) của quốc tế, không dừng lại ở mức bán hàng thủ công truyền thống.\n")
    p_summary.add_run("2. ")
    p_summary.add_run("Với Nghệ nhân làng nghề: ").bold = True
    p_summary.add_run("Là sự tôn vinh xứng đáng khi tên tuổi và đôi bàn tay của họ được khắc ghi trên hồ sơ số của từng chiếc chiếu, chiếc quạt bán ra.\n")
    p_summary.add_run("3. ")
    p_summary.add_run("Với Khách hàng: ").bold = True
    p_summary.add_run("Tạo cảm giác tự hào khi sở hữu một tác phẩm độc bản, minh bạch và có trách nhiệm xã hội cao.")

    # Sign-off box
    sign_table = doc.add_table(rows=1, cols=2)
    sign_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    sign_table.autofit = False
    sign_table.rows[0].cells[0].width = Inches(3.2)
    sign_table.rows[0].cells[1].width = Inches(3.3)
    
    c_left = sign_table.rows[0].cells[0]
    p_l = c_left.paragraphs[0]
    p_l.add_run("NƠI NHẬN:\n").bold = True
    p_l.add_run("- Ban Điều hành Dự án Chiếu Nẫu\n- Hội đồng Giám khảo Cuộc thi\n- Lưu trữ hồ sơ kỹ thuật")
    p_l.runs[0].font.size = Pt(9)
    p_l.runs[1].font.size = Pt(9)
    
    c_right = sign_table.rows[0].cells[1]
    p_r = c_right.paragraphs[0]
    p_r.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_r.add_run("ĐẠI DIỆN ĐỘI NGŨ PHÁT TRIỂN\n").bold = True
    p_r.add_run("Dự Án Chiếu Nẫu 2026\n(Đã ký số)")
    p_r.runs[0].font.size = Pt(9)
    p_r.runs[1].font.size = Pt(9)
    p_r.runs[1].italic = True
    
    output_path = r"d:\test-demo-react\duAnCuocThiMoi\BAO_CAO_TRIEN_KHAI_TEM_QR_DINH_DANH_SAN_PHAM.docx"
    doc.save(output_path)
    print("Word report generated successfully at: " + output_path)

if __name__ == "__main__":
    create_report()
