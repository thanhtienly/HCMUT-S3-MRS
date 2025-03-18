import React from "react";
import { Col, Row } from "antd";
import bk01 from "../../assets/bku01.jpeg";
import bk02 from "../../assets/bku02.jpeg";
import bk03 from "../../assets/bku03.jpg";
import bk04 from "../../assets/bku04.jpeg";
import bk05 from "../../assets/bku05.png";
import bk07 from "../../assets/bku07.png";
import styles from "./styles.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const About = () => (
  <div class={cx("wrapper_about container")}>
    <div class={cx("wrapper_about_row row")}>
      <div class="col-sm-12 col-md-12 col-lg-6">
        <img className={cx("warpper_picture")} src={bk01} alt="bk01" />
      </div>
      <div class="col-sm-12 col-md-12 col-lg-6">
        <div>
          <h2>Giới thiệu chung về trường</h2>
          <p>
            Tên trường: Đại học Bách Khoa Đại học Quốc Gia TPHCM, tên tiếng Anh
            là Ho Chi Minh City University of Technology, viết tắt là HCMUT.
            –Địa chỉ: 268 Lý Thường Kiệt, P.14, Q.10, TP. Hồ Chí Minh Tiền thân
            của trường là Trung tâm Kỹ thuật Quốc gia được đổi tên thành Đại học
            Bách Khoa TPHCM vào năm 1976 với 5 khoa chuyên ngành: Điện – Điện
            tử, Xây Dựng, Thủy lợi, Hóa học và Cơ khí. Đến năm 1996, Đại học
            Bách Khoa chính thức trở thành thành viên của Đại học Quốc gia TP.
            Hồ Chí Minh. Nhà trường luôn phấn đấu để trở thành cơ sở đào tạo đại
            học đạt trình độ cao với đa ngành đa lĩnh vực, đồng thời là trung
            tâm nghiên cứu khoa học công nghệ hàng đầu của khu vực miền Nam nói
            riêng và của cả nước nói chung. Đội ngũ lãnh đạo nhà trường cũng
            luôn phấn đấu để đưa đại học Bách Khoa trở thành địa chỉ đáng tin
            cậy và hấp dẫn đối với những nhà đầu tư phát triển công nghệ và với
            giới doanh nghiệp trong nước cũng như quốc tế. Đại học Bách Khoa có
            đội ngũ cán bộ công nhân viên chức gồm hơn 930 người, trong đó có 9
            giáo sư, 103 phó giáo sư, hơn 338 Tiến sĩ, hơn 443 Thạc sĩ và 99
            Giảng viên có trình độ đại học. Mỗi giảng viên đều có dày dạn kinh
            nghiệm, có nhiệt huyết đối với các hoạt động đào tạo và nghiên cứu
            khoa học, chuyển giao công nghệ. Nhà trường cũng đang từng bước nâng
            cao chất lượng giảng viên để xây dựng một trường đại học vững mạnh,
            phục vụ đất nước.{" "}
          </p>
        </div>
      </div>
    </div>
    <div class={cx("wrapper_about_row row")}>
      <div class="col-sm-12 col-md-12 col-lg-6">
        <img className={cx("warpper_picture")} src={bk05} alt="bk01" />
        <img className={cx("warpper_picture")} src={bk03} alt="bk03" />
      </div>
      <div class="col-sm-12 col-md-12 col-lg-6">
        <div>
          <h2>Cơ sở vật chất</h2>
          <p>
            Khuôn viên đại học Bách Khoa ĐHQG TPHCM hiện nay có tổng diện tích
            41,23ha với hơn 140 phòng học. Các phòng học được trang bị các thiết
            bị hiện đại phục vụ cho việc học tập và giảng dạy của thầy và trò
            nhà trường. Là cơ sở đào tạo chuyên về kỹ thuật, cơ sở vật chất phục
            vụ việc học tập và nghiên cứu của nhà trường ngày càng hoàn thiện
            với 2 phòng thí nghiệm trọng điểm quốc gia, 6 phòng thí nghiệm trọng
            điểm của ĐHQG TPHCM, 11 xưởng thực tập và phòng thực hành, 9 trung
            tâm nghiên cứu chuyển giao công nghệ. Đại học Bách Khoa ĐHQG TPHCM
            cũng lần đầu tiên có Công ty Cổ phần Khoa học Công nghệ Bách Khoa
            TPHCM, đây là công ty được chuyển đổi từ tổ chức khoa học công nghệ
            của trường nhằm đẩy mạnh các dịch vụ khoa học công nghệ, hoạt động
            chuyển giao công nghệ và các hoạt động sản xuất kinh doanh khác.
            Sinh viên HCMUT có thể đăng ký ở tại Ký túc xá của trường ở địa chỉ
            497 Hòa Hảo, P.7, Q.10, cách cơ sở Lý Thường Kiệt chỉ hơn 1km. Đây
            là một trong các ký túc xá sinh viên an toàn, chất lượng và hiện đại
            bậc nhất của các trường đại học ở TPHCM hiện nay. Ký túc xá có 2
            loại phòng: phòng thường rộng 43m2 cho 8 sinh viên có đầy đủ giường,
            ghế, bàn học, tủ đồ riêng, phòng tắm và vệ sinh rộng rãi thoáng mát,
            sinh viên có thể đăng ký dịch vụ trang bị tủ lạnh và máy giặt, giá
            thuê là 360.000 đồng/ sinh viên. Loại thứ hai là phòng dịch vụ dành
            cho 6 sinh viên. Bên cạnh những tiện ích của phòng thường, phòng
            dịch vụ sẽ có máy lạnh và dịch vụ vệ sinh phòng ở, chi phí là
            1.000.000 đồng/sinh viên.{" "}
          </p>
        </div>
      </div>
    </div>
    <div class={cx("wrapper_about_row row")}>
      <div class="col-sm-12 col-md-12 col-lg-6">
        <img className={cx("warpper_picture")} src={bk07} alt="bk07" />
      </div>
      <div class="col-sm-12 col-md-12 col-lg-6">
        <div>
          <h2>Đời sống sinh viên đại học Bách Khoa</h2>
          <p>
            Sinh viên trúng tuyển vào HCMUT không chỉ là những người có điểm thi
            đại ọc cao mà còn có niềm đam mê và nghị lực quyết tâm với lựa chọn
            của mình. Ngoài giờ học tập như một lẽ tự nhiên, sinh viên bách khoa
            luôn hết mình tham gia các hoạt động ngoại khóa và vui chơi. Vì thế,
            nhà trường luôn tạo điều kiện để sinh viên phát huy tất cả những khả
            năng của mình như các hoạt động văn nghệ, CLB, đội nhóm, thể thao,
            ngoại ngữ, đọc sách giải trí trong thư viện, hoạt động tình nguyện.{" "}
          </p>
        </div>
      </div>
    </div>
  </div>
);
export default About;
