import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
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
