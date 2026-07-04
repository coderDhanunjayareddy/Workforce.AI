import { LogOut, UserRound } from "lucide-react";

import { Avatar, Button, Dropdown } from "@/components/ui";
import { useSession } from "@/providers/SessionProvider";

export function UserMenu() {
  const { session, setSession } = useSession();
  const name = session ? `${session.user.firstName} ${session.user.lastName}` : "Guest";
  return (
    <Dropdown
      trigger={
        <button className="flex items-center gap-2 rounded-[12px] p-1 hover:bg-[var(--surface-elevated)]" type="button">
          <Avatar name={name} />
        </button>
      }
    >
      <div className="p-2">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-[var(--text-secondary)]">{session?.user.role}</p>
        <div className="mt-3 space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <UserRound className="h-4 w-4" /> Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setSession(null)}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>
    </Dropdown>
  );
}
