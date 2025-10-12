export default function BoldButton({ title, prefixIcon, suffixIcon, onClick, disabled }: { title: string, prefixIcon?: React.ReactNode, suffixIcon?: React.ReactNode, onClick?: () => void, disabled?: boolean }) {
    return (
        <button 
            className={`flex items-center gap-2 px-[20px] py-[12px] rounded-[12px] font-bold ${disabled ? 'cursor-not-allowed bg-gray-200 text-gray-400' : 'cursor-pointer bg-[#fd8c06] text-white'}`} 
            onClick={onClick}
            disabled={disabled}
        >
            {prefixIcon}
            {title}
            {suffixIcon}
        </button>
    )
}