import logo from "../../logo.svg";
export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      
      <img 
        src={logo} 
        alt="InsightHub Logo" 
        className="w-10 h-10 object-contain"
      />

      <span className="text-xl font-bold text-gray-800 dark:text-white">
        Insight<span className="text-green-500">Hub</span>
      </span>

    </div>
  );
}