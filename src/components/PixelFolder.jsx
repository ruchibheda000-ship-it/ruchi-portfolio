import { Link } from 'react-router-dom'

export default function PixelFolder({ to = "/work", className = "" }) {
  return (
    <Link
      to={to}
      title="Click to view Work & Projects"
      aria-label="Open Work and Projects archive"
      className={`group relative inline-block transition-transform hover:scale-105 active:scale-95 duration-200 cursor-pointer ${className}`}
    >
      {/* Folder Container */}
      <div className="relative w-28 h-20 sm:w-32 sm:h-24 filter drop-shadow-md">
        <svg
          viewBox="0 0 64 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          shapeRendering="crispEdges"
          aria-hidden="true"
          focusable="false"
        >
          {/* Folder Tab (dark brown) */}
          <rect x="2" y="4" width="22" height="8" rx="2" fill="#281712" />
          
          {/* Folder Body (periwinkle blue) */}
          <rect x="2" y="10" width="58" height="34" rx="3" fill="#9db5e4" />
          
          {/* Folder Inset Highlight */}
          <rect x="4" y="12" width="54" height="2" fill="#b9cbf0" />
          <rect x="4" y="14" width="2" height="28" fill="#b9cbf0" />
          
          {/* Folder Bottom Shadow Line */}
          <rect x="4" y="42" width="54" height="2" fill="#7a96cb" />
          <rect x="58" y="12" width="2" height="32" fill="#7a96cb" />
        </svg>

        {/* Pixel Cursor Pointer Overlay */}
        <div className="absolute -bottom-2 -right-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
          <svg
            width="28"
            height="28"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="crispEdges"
            aria-hidden="true"
            focusable="false"
          >
            {/* Black Outline */}
            <path
              d="M0 0V14L4 10.5L6.5 15.5L8.5 14.5L6 9.5H11.5L0 0Z"
              fill="#281712"
            />
            {/* White Interior */}
            <path
              d="M1 1.5V12L4 9.5L6.5 14.5L7.5 14L5.2 9H10L1 1.5Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>

      <div className="text-center mt-1">
        <span className="font-pixel text-[11px] tracking-wider text-[#281712] font-semibold bg-[#eae3d2] px-2 py-0.5 rounded border border-[#281712]/40 group-hover:bg-[#281712] group-hover:text-white transition-colors">
          OPEN WORK
        </span>
      </div>
    </Link>
  )
}
