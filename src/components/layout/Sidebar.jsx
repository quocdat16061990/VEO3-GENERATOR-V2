import { Home, Video, Image, Sparkles, User, BarChart3, Calendar, Sparkle, Cloud } from "lucide-react"
import { cn } from "@/lib/utils"

// #region agent log
const log = (location, message, data) => {
  fetch('http://127.0.0.1:7244/ingest/f2c7b3d4-ae51-4d6c-84c0-861ab6640502', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location,
      message,
      data: data || {},
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'run1',
      hypothesisId: 'A'
    })
  }).catch(() => {});
};
// #endregion

const menuItems = [
  { id: "HomePage", label: "Home", icon: Home },
  {
    group: "Creation",
    items: [
      { id: "AiVideoGeneratorV2", label: "Video generator", icon: Video },
      { id: "ImageGeneratorEntry", label: "Image studio", icon: Image },
      { id: "Inspiration", label: "Inspiration", icon: Sparkles },
      { id: "AvatarAndVoice", label: "Avatars and voices", icon: User },
    ],
  },
  {
    group: "Management",
    items: [
      { id: "DataAnalytics", label: "Analytics", icon: BarChart3 },
      { id: "SchedulePublish", label: "Publisher", icon: Calendar },
    ],
  },
  {
    group: "Space",
    items: [
      { id: "SmartCreation", label: "Smart creation", icon: Sparkle },
      { id: "AssetManagementMaterial", label: "Assets", icon: Cloud },
    ],
  },
]

export function Sidebar({ selectedId = "AssetManagementMaterial", onMenuChange }) {
  // #region agent log
  log('Sidebar.jsx:32', 'Sidebar render', { selectedId });
  // #endregion

  const handleMenuClick = (menuId) => {
    // #region agent log
    log('Sidebar.jsx:54', 'Menu click', { menuId, hasOnMenuChange: !!onMenuChange });
    // #endregion
    if (onMenuChange) {
      onMenuChange(menuId)
    }
  }

  // #region agent log
  log('Sidebar.jsx:62', 'Sidebar rendering', { selectedId });
  // #endregion

  return (
    <aside 
      className="hidden md:flex w-[216px] border-r border-[rgba(0,0,0,0.08)] bg-white flex-col h-full transition-all duration-500 ease-[cubic-bezier(0.075,0.82,0.165,1)] font-sans flex-shrink-0"
    >
      {/* Logo */}
      <div className="p-4 pb-0">
        <div className="flex items-center justify-between rounded-lg cursor-pointer transition-colors py-2 pl-2 pr-0 hover:bg-[rgba(0,0,0,0.05)]">
          <div className="h-6 flex box-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="24" fill="none" viewBox="0 0 120 24">
              <g fill="#000" clipPath="url(#logo-wide_svg__a)">
                <path fillRule="evenodd" d="M6.428 1.424a4.813 4.813 0 0 0-4.813 4.813v15.127h8.251a4.813 4.813 0 0 0 4.813-4.813V5.23c0-.857.355-1.675.981-2.26l1.655-1.547zM8.32 11.738a3.438 3.438 0 1 0 0-6.876 3.438 3.438 0 0 0 0 6.876" clipRule="evenodd"></path>
                <path fillRule="evenodd" d="M8.205 10.13q.056.003.114.003a1.833 1.833 0 1 0-.114-3.663z" clipRule="evenodd"></path>
                <path d="M24.956 14.806v4.367H21.42V5.447c2.02.081 4.127-.11 6.138 0 3.24.171 5.581 1.69 5.297 5.234-.327 4.093-4.711 4.278-7.9 4.125m0-2.357c1.553-.052 4.199.348 4.747-1.594.292-1.04-.093-2.13-1.096-2.576-.298-.134-1.02-.334-1.33-.334h-2.321v4.507zM42.421 11.2l.484-.522c4.12-2.921 9.14-.038 8.076 5.167-.768 3.771-5.911 5.023-8.09 1.78l-.473-1.017V22.5h-3.327V9.884h3.327V11.2zm2.875.872c-.681-.003-1.313.142-1.907.481-.281.16-.93.65-.974.968-.052.388-.043 1.55 0 1.945.061.504.922 1.026 1.362 1.203 1.594.64 3.976.284 4.182-1.76.185-1.84-.878-2.825-2.67-2.837zM55.798 11.134c.121.028.139-.05.208-.105.945-.721 1.238-1.176 2.548-1.402 3.923-.682 6.537 2.162 5.877 6.016s-5.863 5.307-8.132 1.96l-.498-.992v5.892h-3.258V9.884h3.258v1.25zm2.886.924c-.87.006-1.927.34-2.544.977-.163.168-.247.235-.279.487-.031.252-.028 2.034.038 2.182 1.423 1.823 5.344 1.808 5.506-1.006.099-1.71-1.098-2.652-2.724-2.643zM75.759 7.736v2.148h3.535v2.356h-3.535v3.64c0 .188.388.652.556.76.808.52 1.753.066 2.562-.172 0 .397.58 1.893.455 2.148-.16.322-1.85.756-2.24.814-1.965.281-4.66-.513-4.66-2.927V12.24h-1.594c-.02-.493-.07-.6.275-.936 1.252-1.215 2.686-2.325 3.953-3.533zM69.38 9.884h-3.466v9.288h3.466zM37.706 9.884H34.31v9.288h3.396zM67.427 5.467c1.104-.09 2.33.547 2.156 1.811-.087.635-.829 1.177-1.431 1.272-2.898.452-3.327-2.872-.725-3.08zM35.75 5.467c.71-.07 1.93.313 2.13 1.087.524 2.008-2.463 2.686-3.538 1.321-.902-1.147.203-2.292 1.405-2.408z"></path>
              </g>
              <defs>
                <clipPath id="logo-wide_svg__a">
                  <path fill="#fff" d="M0 0h120v24H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-4">
        <div className="space-y-4">
          {/* Home */}
          <div>
            <button
              onClick={() => handleMenuClick("HomePage")}
              className={cn(
                "w-full flex items-center gap-2 rounded-xl transition-colors cursor-pointer select-none",
                "py-2.5 px-4 text-[13px] leading-[1.5715] whitespace-normal break-all",
                selectedId === "HomePage"
                  ? "bg-[rgba(0,0,0,0.04)] text-[var(--lv-color-text-primary)] font-bold"
                  : "text-[rgba(17,26,44,0.7)] hover:bg-[rgba(0,0,0,0.04)]"
              )}
            >
              <Home className="h-5 w-5 flex-shrink-0" />
              <span className="flex-1 text-left">Home</span>
            </button>
          </div>

          {/* Menu Groups */}
          {menuItems
            .filter((item) => item.group)
            .map((group) => (
              <div key={group.group} className="space-y-0.5">
                <div 
                  className="pl-4 pt-1 pb-1 text-xs font-medium text-[rgba(24,51,78,0.4)] uppercase"
                >
                  {group.group}
                </div>
                {group.items.map((item) => {
                  const Icon = item.icon
                  // #region agent log
                  log('Sidebar.jsx:106', 'Rendering menu item', { itemId: item.id, isSelected: selectedId === item.id });
                  // #endregion
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuClick(item.id)}
                      className={cn(
                        "w-full flex items-center gap-2 rounded-xl transition-colors cursor-pointer select-none",
                        "py-2.5 px-4 text-[13px] leading-[1.5715] whitespace-normal break-all",
                        selectedId === item.id
                          ? "bg-[rgba(0,0,0,0.04)] text-[var(--lv-color-text-primary)] font-bold"
                          : "text-[rgba(17,26,44,0.7)] hover:bg-[rgba(0,0,0,0.04)]"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            ))}
        </div>
      </nav>

      {/* Subscribe Banner */}
      <div className="p-4 border-t border-border">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-4 text-white">
          <div className="text-sm font-medium mb-2">
            Unlock all AI features and trending templates free for 7 days
          </div>
          <button className="w-full bg-white text-purple-600 rounded-lg py-2 px-4 text-sm font-medium hover:bg-white/90 transition-colors">
            Try for ₫0
          </button>
        </div>
      </div>
    </aside>
  )
}

