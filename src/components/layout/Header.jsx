import { Bell, Globe, FileStack, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Sparkle icon with gradient
const SparkleIcon = ({ className }) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="sparkle-gradient" x1="17.143" y1="5.143" x2="5.999" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0.02" stopColor="#6D4CFF" />
        <stop offset="1" stopColor="#5E40DF" />
      </linearGradient>
    </defs>
    <path
      d="M11.256 1.318c.256-.69 1.232-.69 1.488 0l1.165 3.149a9.519 9.519 0 0 0 5.624 5.624l3.15 1.165c.69.256.69 1.232 0 1.488l-3.15 1.165a9.52 9.52 0 0 0-5.624 5.624l-1.165 3.15c-.255.69-1.232.69-1.488 0l-1.165-3.15a9.52 9.52 0 0 0-5.624-5.624l-3.149-1.165c-.69-.255-.69-1.232 0-1.488l3.149-1.165a9.52 9.52 0 0 0 5.624-5.624l1.165-3.149Z"
      fill="url(#sparkle-gradient)"
    />
  </svg>
)

// Gift box icon
const GiftBoxIcon = ({ className }) => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.667 2 8 3.333 9.333 2c1.23-1.23 3.334-.359 3.334 1.38a1.953 1.953 0 0 1-1.953 1.953H5.286a1.953 1.953 0 0 1-1.953-1.952C3.333 1.64 5.436.77 6.667 2Zm-.849.849 1.285 1.284H5.286a.753.753 0 1 1 .532-1.284Zm4.364 0L8.897 4.133h1.817a.753.753 0 1 0-.532-1.284Z"
      fill="#FC5C19"
    />
    <path d="M2.667 8h10.666v5.333c0 .737-.597 1.334-1.333 1.334H4a1.333 1.333 0 0 1-1.333-1.334V8Z" fill="#FC5C19" />
    <path d="M2 5.333C2 4.597 2.597 4 3.333 4h9.334C13.403 4 14 4.597 14 5.333v2H2v-2Z" fill="#E67626" />
    <path d="M7 8h2v6.667H7V8Z" fill="#FD9762" />
  </svg>
)

export function Header() {
  return (
    <header className="h-[72px] min-h-[72px] border-b border-border bg-[hsla(0,0%,100%,0.9)] backdrop-blur-[20px] flex items-center justify-between px-4 sm:px-6 md:px-10 py-[10px] sticky top-0 z-[99] select-none">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Breadcrumb/Title area - sẽ được populate bởi page content */}
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Subscription Group */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Credits */}
          <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
            <SparkleIcon className="h-3 w-3" />
            <span className="text-xs sm:text-sm font-bold text-[#5e40df]">550</span>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1 hidden md:block" />

          {/* Subscribe */}
          <Button variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 h-auto hover:bg-accent rounded-lg">
            <span className="underline font-bold text-[#5e40df] hidden md:inline">Try for ₫0</span>
            <span className="underline font-bold text-[#5e40df] md:hidden">₫0</span>
          </Button>
        </div>

        {/* Earn Credits */}
        <div className="relative hidden lg:block">
          <Button variant="ghost" size="sm" className="gap-1.5 px-2 sm:px-3 py-1.5 h-auto hover:bg-accent rounded-lg relative">
            <GiftBoxIcon className="h-4 w-4" />
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">Earn credits</span>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></div>
          </Button>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent rounded-lg">
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>

        {/* Export Tasks */}
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent rounded-lg hidden sm:flex">
          <FileStack className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>

        {/* Language */}
        <Button variant="ghost" size="sm" className="gap-1.5 px-2 sm:px-3 py-1.5 h-auto hover:bg-accent rounded-lg">
          <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs sm:text-sm font-medium hidden sm:inline">EN</span>
        </Button>

        {/* User Avatar */}
        <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-accent transition-all">
          <AvatarImage
            src="https://sf16-passport-sg.ibytedtos.com/img/user-avatar-alisg/jhhkpvwiqgisfyb91y74rxirhpbcr5tv~tplv-resize:100:0.image"
            alt="User"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

