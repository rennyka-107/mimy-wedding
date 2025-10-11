export default function BaseButton({ title, prefixIcon, suffixIcon, onClick, disabled }: { title: string, prefixIcon?: React.ReactNode, suffixIcon?: React.ReactNode, onClick?: () => void, disabled?: boolean }) {
    return (
        <button 
            className={`flex items-center gap-2 px-[20px] py-[12px] rounded-[12px] font-bold ${disabled ? 'cursor-not-allowed bg-gray-200 text-gray-400' : 'cursor-pointer bg-[#FAE4E4] text-[#CE6F70]'}`} 
            onClick={onClick}
            disabled={disabled}
        >
            {prefixIcon}
            {title}
            {suffixIcon}
        </button>
    )
}