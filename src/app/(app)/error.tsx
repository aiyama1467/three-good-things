"use client";

import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
      <h2 className="text-lg font-semibold">エラーが発生しました</h2>
      <Button variant="outline" onClick={reset}>
        もう一度試す
      </Button>
    </div>
  );
}
