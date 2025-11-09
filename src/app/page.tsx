"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { authClient } from "@/shared/lib/auth/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingSwap } from "@/shared/components/ui/loading-swap";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  // Show loading state while checking session
  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const signOut = async () => {
    setLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          console.log("Signed out successfully");
          toast.success("Signed out successfully");
          router.push("/");
        },
        onError: (error) => {
          console.error("Error signing out:", error);
          toast.error("Error signing out", {
            description: error.error?.message || "An unknown error occurred",
          });
        },
        finally: () => {
          setLoading(false);
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Generic Auth Next
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A modern authentication system built with Next.js, Drizzle ORM, and
            Clean Architecture
          </p>
        </div>

        {/* User Information Section - Show when logged in */}
        {session?.user && (
          <div className="max-w-2xl mx-auto mb-16">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={session.user.image || ""} />
                    <AvatarFallback className="text-2xl font-semibold">
                      {session.user.name?.charAt(0)?.toUpperCase() ||
                        session.user.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl text-gray-900">
                  Welcome back, {session.user.name || session.user.email}!
                </CardTitle>
                <CardDescription className="text-lg">
                  You are successfully logged in
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex justify-center gap-2">
                  <Badge variant="secondary" className="px-3 py-1">
                    {session.user.emailVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Email: {session.user.email}</p>
                  {session.user.name && <p>Name: {session.user.name}</p>}
                </div>
                <Button onClick={signOut} variant="outline" className="mt-4">
                  <LoadingSwap isLoading={loading}>Sign Out</LoadingSwap>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Sign In/Sign Up Cards - Only show when not logged in */}
        {!session?.user && (
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Access your existing account</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Welcome back! Sign in to your account to continue.
                </p>
                <Link href="/auth/signin">
                  <Button className="w-full">Sign In</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Join us today</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  New here? Create an account to get started with our platform.
                </p>
                <Link href="/auth/signup">
                  <Button variant="outline" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Clean Architecture
              </h3>
              <p className="text-gray-600 text-sm">
                Modular design following SOLID principles
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Modern UI</h3>
              <p className="text-gray-600 text-sm">
                Built with shadcn/ui and Tailwind CSS
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Type Safety</h3>
              <p className="text-gray-600 text-sm">
                Full TypeScript support with Zod validation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
