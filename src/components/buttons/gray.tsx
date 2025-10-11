export default function GrayButton({ title, prefixIcon, suffixIcon, onClick, isActive }: { title: string, prefixIcon?: React.ReactNode, suffixIcon?: React.ReactNode, onClick?: () => void, isActive?: boolean }) {
    return (
        <button onClick={onClick} className={`cursor-pointer flex items-center gap-2 px-[20px] py-[12px] bg-[#F0F2F3] rounded-[12px] text-[#585858] font-bold ${isActive ? "bg-[#FAE4E4] text-[#CE6F70]" : ""}`}>
            {prefixIcon}
            {title}
            {suffixIcon}
        </button>
    )
}