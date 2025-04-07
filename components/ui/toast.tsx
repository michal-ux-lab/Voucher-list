"use client"

import React, { useEffect, useState, useRef } from 'react'
import { CheckCircle2, XCircle, AlertCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'warning'

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose: () => void
}

const toastIcons = {
  success: <CheckCircle2 className="w-5 h-5 text-[#008A0E]" />,
  error: <XCircle className="w-5 h-5 text-[#B33434]" />,
  warning: <AlertCircle className="w-5 h-5 text-[#B35F34]" />
}

const toastStyles = {
  success: 'bg-[#E5F3E9] border-[#008A0E]',
  error: 'bg-[#FFEDED] border-[#B33434]',
  warning: 'bg-[#FFF5E9] border-[#B35F34]'
}

const toastBorderColors = {
  success: '#008A0E',
  error: '#B33434',
  warning: '#B35F34'
} as const

export default function Toast({ message, type = 'success', duration = 2000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Start the progress animation
    if (progressRef.current) {
      progressRef.current.style.transition = `transform ${duration}ms linear`
      // Force a reflow to ensure the transition starts
      progressRef.current.getBoundingClientRect()
      progressRef.current.style.transform = 'translateX(-100%)'
    }

    // Set up the timer for toast dismissal
    const dismissTimer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, 500) // Increased to match animation duration
    }, duration)

    return () => {
      clearTimeout(dismissTimer)
    }
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div 
      className={cn(
        "relative flex items-start gap-3 p-4 rounded-xl border shadow-lg overflow-hidden",
        toastStyles[type],
        isExiting 
          ? "animate-toast-exit" 
          : "animate-toast-enter"
      )}
      style={{ 
        width: '400px',
        animationFillMode: 'forwards'
      }}
    >
      <style jsx>{`
        @keyframes toastEnter {
          0% {
            opacity: 0;
            transform: translateX(16px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes toastExit {
          0% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-8px);
          }
        }
        :global(.animate-toast-enter) {
          animation: toastEnter 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        :global(.animate-toast-exit) {
          animation: toastExit 500ms cubic-bezier(0.4, 0, 1, 1) forwards;
        }
      `}</style>

      {/* Icon */}
      {toastIcons[type]}

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm text-[#111827]">{message}</p>
      </div>

      {/* Close Button */}
      <button 
        onClick={() => {
          setIsExiting(true)
          setTimeout(() => {
            setIsVisible(false)
            onClose()
          }, 500) // Match exit animation duration
        }}
        className="text-[#70747D] hover:text-[#111827] transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden">
        <div 
          ref={progressRef}
          className="h-full w-full transform-gpu"
          style={{ 
            backgroundColor: toastBorderColors[type],
            transform: 'translateX(0)',
            willChange: 'transform'
          }}
        />
      </div>
    </div>
  )
}
