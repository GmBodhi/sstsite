'use client'
import ProfileComponent from '@/components/ProfileComponent';
import BottomNavBarComponent from '@/components/BottomNavBarComponent';

export default function Profile() {
    return (
        <div>
            <h1 className="text-white text-5xl font-bold pt-14 pb-4 px-5">Profile</h1>
            <ProfileComponent />
            <BottomNavBarComponent />
        </div>
    );
}
