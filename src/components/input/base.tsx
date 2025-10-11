export default function BaseInput({
    label,
    placeholder = "",
    type = "text",
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
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    error: string;
    disabled: boolean;
    readOnly: boolean;
    required: boolean;
    name: string;
    id: string;
}) {
    return (
        <div>
            <label className="text-black text-[18px]">{label} {required && <span className="text-red-500">*</span>}</label>
            <input className="outline-none w-full rounded-[12px] bg-white border border-[#E4E4E4] mt-[6px] px-[20px] py-[12px] text-[18px] text-[#A2A2A2]" type={type} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} onFocus={onFocus} disabled={disabled} readOnly={readOnly} required={required} name={name} id={id} {...props} />
            {error && <p className="text-red-500 mt-[6px]">{error}</p>}
        </div>
    )
}