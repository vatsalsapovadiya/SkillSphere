import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import PropTypes from 'prop-types';

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

// The generic type argument is removed from createContext.
const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef(
  ({ className, variant, size, children, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("flex items-center justify-center gap-1", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
)

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

// PropTypes are added for runtime validation of props.
ToggleGroup.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node,
};

const ToggleGroupItem = React.forwardRef(
  ({ className, children, variant, size, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext)

    return (
      <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(
          toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
          }),
          className
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    )
  }
)

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

// PropTypes are also added to the item component.
ToggleGroupItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.string,
  size: PropTypes.string,
};

export { ToggleGroup, ToggleGroupItem }