import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { X, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function TagInput({ 
  placeholder = "Type and press Enter...", 
  tags = [], 
  setTags, 
  className 
}) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef(null)

  const addTag = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()])
      }
      setInputValue("")
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div 
      className={cn(
        "flex flex-wrap items-center gap-2 p-2 rounded-2xl border border-slate-100 bg-slate-50/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-600/10 transition-all min-h-[56px]",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag, index) => (
        <Badge 
          key={index}
          variant="secondary"
          className="pl-3 pr-1 py-1 rounded-xl bg-white border-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1 group/tag animate-in zoom-in-95 duration-200"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              removeTag(tag)
            }}
            className="p-0.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={addTag}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-slate-900 min-w-[120px] placeholder:text-slate-400 placeholder:font-normal"
      />
    </div>
  )
}
