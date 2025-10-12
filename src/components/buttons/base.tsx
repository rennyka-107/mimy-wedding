export default function BaseButton({ title, prefixIcon, suffixIcon, onClick, disabled }: { title: string, prefixIcon?: React.ReactNode, suffixIcon?: React.ReactNode, onClick?: () => void, disabled?: boolean }) {
    return (
        <button 
        className={`flex gap-2 px-4 py-2 md:px-4 md:py-3 text-[14px] md:text-[16px] font-[500] md:font-[600] justify-center items-center !rounded-[6px]
            ${disabled
              ? 'cursor-not-allowed bg-gray-200 text-gray-400'
              : 'cursor-pointer text-white bg-gradient-to-r from-[#FFBB53] to-[#FD8C06] hover:bg-[#E07000]'
            }`}
            onClick={onClick}
            disabled={disabled}
        >
            {prefixIcon}
            {title}
            {/* {suffixIcon} */}
        </button>
    )
}