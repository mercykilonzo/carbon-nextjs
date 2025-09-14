import { IoSettingsOutline, IoPersonOutline } from "react-icons/io5";
import { FiMoon } from "react-icons/fi";
import { FiSun } from "react-icons/fi";

export default function PageHeader({ onToggleTheme, isDark }: { onToggleTheme: () => void; isDark: boolean }) {
  const iconColor = isDark ? "#F79B72" : "#214A5A";
  return (
    <div className="flex items-center gap-7 w-full justify-end">
      <IoSettingsOutline className={`w-7 h-7 hover:text-[#c76c4c] transition-colors cursor-pointer`} style={{ color: iconColor }} />
      <IoPersonOutline className={`w-7 h-7 hover:text-[#c76c4c] transition-colors cursor-pointer`} style={{ color: iconColor }} />
      <button onClick={onToggleTheme} aria-label="Toggle Day/Night" className="focus:outline-none cursor-pointer">
        {isDark
          ? <FiSun className="w-7 h-7" style={{ color: iconColor }} />
          : <FiMoon className="w-7 h-7" style={{ color: iconColor }} />}
      </button>
    </div>
  );
}