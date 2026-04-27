import { Avatar } from "./Avatar";
import { Logo } from "./Logo";

type Props = {
  userInitials?: string;
};

export function MobileNav({ userInitials = "CD" }: Props) {
  return (
    <nav className="bg-orange-50 w-full px-4 h-14 flex items-center justify-between shrink-0">
      <Logo />
      <Avatar initials={userInitials} size={32} />
    </nav>
  );
}
