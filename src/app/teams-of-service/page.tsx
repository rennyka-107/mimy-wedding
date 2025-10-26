import Content from "@/components/wedding/Content";

const contents = [
    {
        label: "1. Giới thiệu", 
        value: ["Chào mừng bạn đến với website thiết kế thiệp online của chúng tôi. Khi truy cập và sử dụng dịch vụ, bạn đồng ý tuân thủ đầy đủ các điều khoản dưới đây. Vui lòng đọc kỹ trước khi bắt đầu sử dụng."],
        id: "1"
    },
    {
        label: "2. Tài khoản người dùng", 
        value: [
            "Khi đăng ký tài khoản, bạn cần cung cấp thông tin chính xác, đầy đủ và được cập nhật.",
            "Bạn có trách nhiệm bảo mật thông tin đăng nhập và mọi hoạt động diễn ra trong tài khoản của mình.",
            "Nếu phát hiện có hành vi sử dụng trái phép tài khoản, bạn cần thông báo ngay cho chúng tôi.",
            "Chúng tôi có quyền tạm khóa hoặc chấm dứt tài khoản nếu phát hiện vi phạm điều khoản dịch vụ hoặc có hành vi gian lận, gây hại cho hệ thống."
        ],
        id: "2"
    },
    {
        label: "3. Quyền sở hữu trí tuệ", 
        value: [
            "Toàn bộ nội dung, thiết kế, hình ảnh, mẫu thiệp, mã nguồn, và các tài sản trí tuệ khác trên website thuộc quyền sở hữu của chúng tôi, trừ khi có ghi chú khác.",
            "Người dùng không được sao chép, chỉnh sửa, phân phối, hoặc sử dụng cho mục đích thương mại bất kỳ nội dung nào nếu chưa có sự đồng ý bằng văn bản.",
            "Đối với các thiết kế riêng (custom), bạn sở hữu quyền sử dụng bản thiết kế cho mục đích cá nhân, nhưng không được bán lại, sao chép, phân phối hoặc sử dụng cho mục đích thương mại dưới bất kỳ hình thức nào nếu không có sự đồng ý bằng văn bản từ chúng tôi.",
            "Nếu phát hiện hành vi vi phạm, chúng tôi có quyền:",
            "Yêu cầu chấm dứt ngay việc sử dụng trái phép.",
            "Thu hồi toàn bộ doanh thu phát sinh từ việc khai thác trái phép bản thiết kế.",
            "Áp dụng các biện pháp pháp lý cần thiết để bảo vệ quyền lợi, bao gồm nhưng không giới hạn ở việc yêu cầu bồi thường thiệt hại và xử lý theo quy định pháp luật hiện hành."
        ],
        id: "3"
    },
    {
        label: "4. Sử dụng nội dung cho mục đích quảng bá", 
        value: [
            "Khi bạn sử dụng dịch vụ và tạo thiệp, chúng tôi có thể trích dẫn một phần hình ảnh, mẫu hoặc nội dung để phục vụ mục đích quảng bá, giới thiệu dịch vụ trên website hoặc kênh truyền thông, trừ khi bạn yêu cầu bằng văn bản không sử dụng.",
            "Chúng tôi cam kết không tiết lộ thông tin cá nhân nhạy cảm (địa chỉ, số điện thoại, email, số tài khoản ngân hàng) mà không có sự đồng ý của bạn."
        ],
        id: "4"
    },
    {
        label: "5. Dịch vụ và thanh toán", 
        value: [
            "Các gói dịch vụ được phân thành miễn phí và trả phí, với mức phí được công khai rõ ràng trên website.",
            "Thanh toán được thực hiện qua các hình thức được hỗ trợ (ví điện tử, chuyển khoản ngân hàng, thẻ…).",
            "Mọi khoản phí đã thanh toán sẽ không được hoàn lại trừ trường hợp dịch vụ không thể cung cấp do lỗi hệ thống từ phía chúng tôi."
        ],
        id: "5"
    },
    {
        label: "6. Trách nhiệm và giới hạn trách nhiệm", 
        value: [
            "Chúng tôi nỗ lực đảm bảo dịch vụ luôn hoạt động ổn định và chính xác, tuy nhiên không đảm bảo dịch vụ sẽ không bao giờ bị gián đoạn hoặc không có lỗi.",
            "Người dùng chịu trách nhiệm về mọi nội dung mà mình tạo ra và chia sẻ.",
            "Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp, đặc biệt hoặc phát sinh nào từ việc sử dụng dịch vụ."
        ],
        id: "6"
    },
    {
        label: "7. Thay đổi điều khoản", 
        value: [
            "Chúng tôi có thể cập nhật, điều chỉnh điều khoản dịch vụ bất kỳ lúc nào.",
            "Phiên bản cập nhật sẽ được công bố trên website, và việc tiếp tục sử dụng dịch vụ đồng nghĩa với việc bạn chấp nhận điều khoản mới."
        ],
        id: "7"
    },
    {
        label: "8. Sự đồng ý của người dùng", 
        value: [
            "Bằng cách đánh dấu vào ô \"Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật\" trong quá trình đăng ký, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý tuân thủ tất cả các điều khoản và điều kiện được nêu trong tài liệu này, cũng như trong Chính sách bảo mật của chúng tôi. Việc đồng ý này có hiệu lực pháp lý và ràng buộc bạn với các quy định của Mimy.vn.",
            "Nếu bạn đăng ký thông qua tài khoản Google, bạn cũng đồng ý với các điều khoản này và cho phép chúng tôi thu thập thông tin từ các nền tảng đó theo Chính sách bảo mật của chúng tôi."
        ],
        id: "8"
    }
]

export default function TeamsOfService() {
    return (
        <div className="w-full bg-[#FFFFFF] px-[15%] py-[50px]">
            <Content
                title="ĐIỀU KHOẢN DỊCH VỤ"
                description="Lần cập nhật gần nhất: 12/10/2025"
                contents={contents}
            />
        </div>
    )
}   