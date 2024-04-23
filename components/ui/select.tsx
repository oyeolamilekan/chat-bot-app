import { generateId } from "@/lib";

export function Select({ name, onChange = () => { }, value, required = false, label, options = [] }: SelectPropTypes) {
  const id = generateId();

  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-sm lg:text-base font-medium">
          {label}
        </label>
      )}
      <select name={name} onChange={(e: any) => onChange(e)} value={value} required={required} className="outline-none h-10 lg:h-12 flex items-center pl-2 lg:pl-4 border rounded text-base font-normal w-full focus:ring-neutral-800 focus:border-black focus:border-[1.2px] mb-6 mt-2">
        <option selected disabled value={''}>{'Select'}</option>
        {options.map((option: string | { name: string; value: string }, key: number) => (
          <option value={typeof option === 'string' ? option : option.value} key={key}>
            {typeof option === 'string' ? option : option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

interface SelectPropTypes {
  label?: string;
  value?: string | number;
  required?: boolean;
  name: string;
  options?: string[] | { name: string; value: string }[];
  onChange?: Function;
}