import * as React from "react"

import { cn } from "@/lib/utils"

function ScrollArea({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div ref={props.ref as React.Ref<HTMLDivElement>} className={cn("min-h-0 overflow-hidden", className)} {...props}>
      <div className="h-full min-h-0 overflow-y-auto">{children}</div>
    </div>
  )
}

export { ScrollArea }
