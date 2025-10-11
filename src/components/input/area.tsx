export default function BaseInputArea({
    label,
    placeholder = "",
    value = "",
    onChange = () => { },
    onBlur = () => { },
    onFocus = () => { },
    error = "",
    disabled = false,
    readOnly = false,
    required = false,
    name = "",
    id = "",
    ...props
}: {
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    onFocus: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    error: string;
    disabled: boolean;
    readOnly: boolean;
    required: boolean;
    name: string;
    id: string;
}) {
    return (
        <div>
            <label className="text-[#383637] text-[16px] font-[600]">{label} {required && <span className="text-red-500">*</span>}</label>
            <textarea className="outline-none w-full rounded-[12px] bg-white border border-[#E0DBD6] mt-[6px] px-[20px] py-[12px] text-[18px] text-[#898A85]" placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} onFocus={onFocus} disabled={disabled} readOnly={readOnly} required={required} name={name} id={id} {...props} />
            {error && <p className="text-red-500 mt-[6px]">{error}</p>}
        </div>
    )
}