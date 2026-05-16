import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="max-w-xl space-y-4">
      <p className="text-muted-foreground">この日の記録はありません。</p>
      <Link
        href="/calendar"
        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
      >
        カレンダーへ戻る
      </Link>
    </div>
  );
}
