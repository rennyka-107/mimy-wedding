import Content from "@/components/wedding/Content";

const contents = [
    {
        label: "1. Thông tin thu thập", 
        value: ["Chúng tôi có thể thu thập thông tin cá nhân (tên, email, số điện thoại) và thông tin phi cá nhân (loại thiết bị, trình duyệt, hành vi sử dụng website,...)."],
        id: "1"
    },
    {
        label: "2. Mục đích sử dụng thông tin", 
        value: ["Cung cấp, duy trì và cải thiện dịch vụ.", "Cá nhân hóa trải nghiệm người dùng.", "Gửi thông báo, thông tin khuyến mãi, hoặc hỗ trợ khách hàng.",],
        id: "2"
    },
    {
        label: "3. Bảo mật thông tin", 
        value: ["Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức hợp lý để bảo vệ dữ liệu người dùng khỏi truy cập trái phép, tiết lộ hoặc mất mát.", "Tuy nhiên, không có hệ thống nào đảm bảo an toàn tuyệt đối, và bạn hiểu rằng việc chia sẻ dữ liệu qua Internet luôn tiềm ẩn rủi ro.",],
        id: "3"
    },
    {
        label: "4. Chia sẻ thông tin", 
        value: ["Chúng tôi không bán hoặc trao đổi thông tin cá nhân của bạn cho bên thứ ba.", "Một số trường hợp có thể chia sẻ dữ liệu với đối tác dịch vụ (ví dụ: cổng thanh toán, đơn vị lưu trữ) nhưng sẽ luôn tuân thủ nguyên tắc bảo mật.",],
        id: "4"
    },
    {
        label: "5. Quyền của người dùng", 
        value: [" Bạn có quyền yêu cầu chỉnh sửa, cập nhật hoặc xóa thông tin cá nhân.", " Bạn có thể yêu cầu chúng tôi ngừng gửi thông tin tiếp thị bất kỳ lúc nào.",],
        id: "5"
    },
    {
        label: "6. Cookies và công nghệ theo dõi", 
        value: [" Website có thể sử dụng cookies để cải thiện trải nghiệm, ghi nhớ tùy chọn người dùng, và phân tích hành vi truy cập.", " Bạn có thể tùy chỉnh trình duyệt để từ chối cookies, nhưng một số tính năng có thể bị hạn chế.",],
        id: "6"
    },
    {
        label: "7. Thời gian lưu trữ", 
        value: [" Chúng tôi chỉ lưu giữ thông tin cá nhân trong thời gian cần thiết cho mục đích cung cấp dịch vụ hoặc theo quy định pháp luật.",],
        id: "7"
    },
    {
        label: "8. Thay đổi điều khoản", 
        value: [" Chúng tôi có thể cập nhật, điều chỉnh chính sách bảo mật bất kỳ lúc nào.", " Phiên bản cập nhật sẽ được công bố trên website, và việc tiếp tục sử dụng dịch vụ đồng nghĩa với việc bạn chấp nhận chính sách mới.",],
        id: "8"
    },
    {
        label: "9. Liên hệ", 
        value: ["Nếu có thắc mắc, vui lòng liên hệ qua email hỗ trợ của chúng tôi: ", "Email: contact@mimy.vn", "Zalo: 035.389.7973"],
        id: "9"
    },
]

export default function PrivacyPolicy() {
    return (
        <div className="w-full bg-[#FFFFFF] px-[15%] py-[50px]">
            <Content
                title="CHÍNH SÁCH BẢO MẬT"
                description="Lần cập nhật gần nhất: 12/10/2025"
                contents={contents}
            />
        </div>
    )
}   