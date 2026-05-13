import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">設定</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">アカウント</CardTitle>
          <CardDescription>アカウント設定（準備中）</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">近日公開予定</p>
        </CardContent>
      </Card>
    </div>
  );
}
