import * as React from "react"
import { cn } from "@/lib/utils"

const DropdownMenuContext = React.createContext({
  open: false,
  setOpen: () => {},
})

const DropdownMenu = ({ children, ...props }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative" {...props}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

const DropdownMenuTrigger = React.forwardRef(({ className, children, asChild, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext)

  const handleClick = () => {
    context.setOpen(!context.open)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      className: cn("outline-none", className),
      onClick: handleClick,
      ...props,
    })
  }
  return (
    <button
      ref={ref}
      className={cn("outline-none", className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef(({ className, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext)
  const contentRef = React.useRef(null)
  const combinedRef = React.useCallback((node) => {
    contentRef.current = node
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }, [ref])

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        context.setOpen(false)
      }
    }

    if (context.open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [context.open, context])

  if (!context.open) return null

  return (
    <div
      ref={combinedRef}
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md top-full right-0 mt-1",
        className
      )}
      {...props}
    />
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef(({ className, onClick, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext)

  const handleClick = (e) => {
    onClick?.(e)
    context.setOpen(false)
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={handleClick}
      {...props}
    />
  )
})
DropdownMenuItem.displayName = "DropdownMenuItem"

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem }

