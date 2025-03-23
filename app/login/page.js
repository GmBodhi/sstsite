'use client'
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginComponent from '@/components/LoginComponent';
import { useAuth } from '@/lib/hooks/useAuth';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useAuth();
  
  // Get the returnUrl from query parameters
  const returnUrl = searchParams.get('returnUrl');

  // Redirect to returnUrl or home page if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      if (returnUrl) {
        router.push(decodeURIComponent(returnUrl));
      } else {
        router.push('/');
      }
    }
  }, [isAuthenticated, isLoading, router, returnUrl]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <Head>
        <title>Login - സർഗം ചിത്രം താളം</title>
      </Head>

      <motion.div
        className="max-w-md w-full px-6 py-8 bg-gradient-to-b from-gray-900 to-black rounded-xl shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Image
            src="/sst.png"
            width={150}
            height={75}
            alt="SST Logo"
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-white mb-2">Login with Etlab</h1>
        </div>

        <div className="flex justify-center mb-6">
          <LoginComponent returnUrl={returnUrl} />
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Need help? <br/> Contact support at <a href="tel:+918129264370" className="text-red-500 hover:underline">+91 81292 64370</a>
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="mt-8 text-center text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <p>സർഗം ചിത്രം താളം &copy; {new Date().getFullYear()}</p>
      </motion.div>
    </div>
  );
} 