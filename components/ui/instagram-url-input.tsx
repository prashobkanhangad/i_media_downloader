"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ClipboardPaste, Loader2, X } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  instagramUrlSchema,
  validateInstagramUrl,
} from "@/lib/validators/instagram-url";
import { cn } from "@/lib/utils";

export interface InstagramUrlInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onValidChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  validateOnChange?: boolean;
  showActions?: boolean;
  className?: string;
  inputClassName?: string;
  id?: string;
  name?: string;
  "aria-label"?: string;
}

export interface InstagramUrlInputRef {
  focus: () => void;
  clear: () => void;
  validate: () => boolean;
  getValue: () => string;
}

export const InstagramUrlInput = forwardRef<
  InstagramUrlInputRef,
  InstagramUrlInputProps
>(function InstagramUrlInput(
  {
    value: controlledValue,
    defaultValue = "",
    onChange,
    onValidChange,
    onBlur,
    error: externalError,
    loading = false,
    disabled = false,
    placeholder = "https://instagram.com/reel/...",
    validateOnChange = true,
    showActions = true,
    className,
    inputClassName,
    id,
    name,
    "aria-label": ariaLabel = "Instagram URL",
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const inputRef = useRef<HTMLInputElement>(null);

  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const [pasteError, setPasteError] = useState<string | null>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const error = externalError ?? internalError ?? pasteError ?? undefined;
  const isDisabled = disabled || loading;
  const hasValue = value.length > 0;

  const setValue = useCallback(
    (nextValue: string) => {
      if (!isControlled) setInternalValue(nextValue);
      onChange?.(nextValue);

      if (validateOnChange && nextValue.trim()) {
        const result = validateInstagramUrl(nextValue);
        if (result.success) {
          setInternalError(null);
          onValidChange?.(result.data);
        } else {
          setInternalError(result.error.issues[0]?.message ?? "Invalid URL");
        }
      } else if (!nextValue.trim()) {
        setInternalError(null);
      }
    },
    [isControlled, onChange, onValidChange, validateOnChange],
  );

  const validate = useCallback(() => {
    const result = validateInstagramUrl(value);
    if (result.success) {
      setInternalError(null);
      onValidChange?.(result.data);
      return true;
    }
    setInternalError(result.error.issues[0]?.message ?? "Invalid URL");
    return false;
  }, [onValidChange, value]);

  const clear = useCallback(() => {
    setPasteError(null);
    setInternalError(null);
    setValue("");
    inputRef.current?.focus();
  }, [setValue]);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear,
    validate,
    getValue: () => value,
  }));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasteError(null);
    setValue(event.target.value);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (event.target.value.trim()) validate();
    onBlur?.();
  };

  const handlePaste = async () => {
    if (isDisabled) return;

    try {
      const text = await navigator.clipboard.readText();
      setPasteError(null);
      setValue(text.trim());
      inputRef.current?.focus();
    } catch {
      setPasteError("Unable to access clipboard. Paste manually.");
    }
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="relative">
        <motion.div
          layout
          className={cn(
            "relative flex items-center gap-1 rounded-2xl border bg-background/80 p-1 backdrop-blur-sm transition-colors",
            error
              ? "border-destructive/50"
              : "border-white/20 dark:border-white/10",
            isFocused && !error && "border-primary/40",
            isDisabled && "opacity-60",
          )}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-primary/30"
            initial={false}
            animate={{
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1 : 0.98,
            }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <Input
            ref={inputRef}
            id={inputId}
            name={name}
            type="url"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            disabled={isDisabled}
            placeholder={placeholder}
            aria-label={ariaLabel}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "h-11 flex-1 border-0 bg-transparent px-3 shadow-none focus-visible:ring-0 sm:h-12 sm:px-4 sm:text-base",
              showActions && hasValue && "pr-1",
              inputClassName,
            )}
          />

          {showActions && (
            <div className="flex shrink-0 items-center gap-0.5 pr-1">
              {loading && (
                <div className="flex h-9 w-9 items-center justify-center">
                  <Loader2
                    className="h-4 w-4 animate-spin text-muted-foreground"
                    aria-hidden
                  />
                </div>
              )}

              {!loading && hasValue && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={clear}
                  disabled={isDisabled}
                  aria-label="Clear URL"
                  className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}

              {!loading && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handlePaste}
                  disabled={isDisabled}
                  aria-label="Paste from clipboard"
                  className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground"
                >
                  <ClipboardPaste className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="px-1 text-sm text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

export { instagramUrlSchema };
