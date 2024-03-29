"use client"

interface MenuItemsProps {
    onClick: () => void;
    label: string;
}
const MenuItem:React.FC<MenuItemsProps> = ({onClick,
    label}) => {
  return (
    <div onClick={onClick} className="px-4 py-3 hover:bg-slate-600 hover:text-white transition font-semibold">{label}</div>
  )
}

export default MenuItem