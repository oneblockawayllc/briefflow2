import * as React from "react"
import { cn } from "../../lib/utils"
import Tooltip from "./Tooltip"
import { InfoIcon } from "../icons/InfoIcon"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  tooltip?: string
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, id, tooltip, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="flex items-center mb-2">
          <label
            htmlFor={id}
            className="block font-medium text-foreground text-body"
          >
            {label}
          </label>
          {tooltip && (
            <Tooltip content={tooltip}>
              <InfoIcon className="w-4 h-4 ml-1.5 text-muted-foreground cursor-help" />
            </Tooltip>
          )}
        </div>
        <textarea
          id={id}
          rows={4}
          className={cn(
            "flex min-h-[120px] w-full rounded-lg border bg-background px-3 py-3 text-body font-sans text-foreground shadow-sm transition-all placeholder:text-muted-foreground resize-vertical",
            "focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive/50 ring-2 ring-destructive/20",
            !error && "border-border",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export default Textarea
