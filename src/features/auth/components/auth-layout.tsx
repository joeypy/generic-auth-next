import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  linkDescription: string;
}

export function AuthLayout({
  children,
  title,
  subtitle,
  linkText,
  linkHref,
  linkDescription,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {subtitle}{" "}
            <Link
              href={linkHref}
              className="font-medium text-primary hover:text-primary/80"
            >
              {linkText}
            </Link>
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
