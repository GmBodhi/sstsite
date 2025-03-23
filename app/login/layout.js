// Login page uses a separate layout without the bottom navigation
'use client'
import { Toaster } from '@/components/ui/sonner'

export default function LoginLayout({ children }) {
    return (
        <div className="min-h-screen bg-black">
            <Toaster />
            {children}
        </div>
    )
} 