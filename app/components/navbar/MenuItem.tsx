"use client"

interface MenuItemsProps {
    onClick: () => void;
    label: string;
}
const MenuItem:React.FC<MenuItemsProps> = ({onClick,
    label}) => {
  return (
    <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"></div>
  )
}

export default MenuItem