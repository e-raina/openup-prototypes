import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { SearchInput } from "./SearchInput";

type NavItem = {
  label: string;
  href?: string;
  active?: boolean;
  badge?: string;
};

type Props = {
  items?: NavItem[];
  rightItems?: NavItem[];
  userInitials?: string;
};

const defaultItems: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "Explore", href: "#" },
  { label: "Sessions", href: "#" },
  { label: "AI Guide", href: "#", active: true, badge: "Beta" },
];

const defaultRightItems: NavItem[] = [{ label: "My progress", href: "#" }];

export function Navbar({
  items = defaultItems,
  rightItems = defaultRightItems,
  userInitials = "CD",
}: Props) {
  return (
    <nav className="bg-orange-50 w-full">
      <div className="mx-auto w-full max-w-[1440px] px-16 flex items-center gap-8">
        <div className="flex items-center gap-8 flex-1 min-w-0">
          <Logo />
          <div className="flex items-center gap-4">
            {items.map((item) => (
              <NavLink
                key={item.label}
                href={item.href}
                active={item.active}
                trailing={item.badge ? <Badge>{item.badge}</Badge> : undefined}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="w-[261px]">
          <SearchInput />
        </div>

        <div className="flex items-center gap-8 justify-end">
          {rightItems.map((item) => (
            <NavLink key={item.label} href={item.href} active={item.active}>
              {item.label}
            </NavLink>
          ))}
          <Avatar initials={userInitials} />
        </div>
      </div>
    </nav>
  );
}
