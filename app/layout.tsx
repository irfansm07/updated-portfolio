import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shaik Mohammad Irfan – Front-End Developer & Python Programmer',
  description:
    'Portfolio of Shaik Mohammad Irfan – a motivated Front-End Developer and Python Programmer specializing in responsive, user-centric web applications. Open to opportunities.',
  keywords: ['Front-End Developer', 'React', 'Next.js', 'Python', 'Portfolio', 'Web Developer', 'Irfan', 'VIT Bhopal'],
  openGraph: {
    title: 'Shaik Mohammad Irfan – Front-End Developer',
    description: 'Building the future, one pixel at a time.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
