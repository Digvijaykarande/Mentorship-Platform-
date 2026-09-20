import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-xl font-bold tracking-tight"
    >
      Loyanox<span className="text-primary"> Mentor</span>
    </Link>
  );
}