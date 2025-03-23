'use client'
import ProfileComponent from '@/components/ProfileComponent';
import BottomNavBarComponent from '@/components/BottomNavBarComponent';
import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Profile() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    
    // Redirect to login page if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login?returnUrl=' + encodeURIComponent('/profile'));
        }
    }, [isAuthenticated, isLoading, router]);
    
    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl text-white">Loading...</p>
            </div>
        );
    }
    
    // Don't render the actual page content if not authenticated
    if (!isAuthenticated) {
        return null; // This prevents the page content from flashing before redirect
    }
    
    return (
        <div>
            <h1 className="text-white text-5xl font-bold pt-14 pb-4 px-5">Profile</h1>
            <ProfileComponent />
            <BottomNavBarComponent />
        </div>
    );
}
