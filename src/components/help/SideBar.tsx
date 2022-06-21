import Link from "next/link";
import { useStateContext } from "../../context/StateContext";

const SideBar: React.FC = () => {
  return (
    <div className="fixed translate-y-10 w-44 h-screen overflow-auto px-4 border-r-2">
      <nav>
        <ul className="flex flex-col gap-2 pt-8 text-xl">
          <li className="font-bold border-b-2">GetStarted</li>
          <NavItem name="使い方" href="/help/howTo" />
          <NavItem name="チュートリアル" href="/help/tutorial" />
          <li className="font-bold border-b-2">Blocks</li>
          <NavItem name="Constant" href="/help/constant" />
          <NavItem name="Gain" href="/help/gain" />
          <NavItem name="Arithmetic" href="/help/arithmetic" />
          <NavItem name="Integrator" href="/help/integrator" />
          <NavItem name="Scope" href="/help/scope" />
        </ul>
      </nav>
    </div>
  );
};
export default SideBar;

type NavItemProps = {
  name: string;
  href: string;
};
const NavItem: React.FC<NavItemProps> = ({ name, href }) => {
  const {
    state: { currentHelpPage },
    action,
  } = useStateContext();
  return (
    <li
      className={`pl-2 ${
        currentHelpPage === name && "border-l-2 border-l-sky-500 text-sky-500 font-bold"
      }`}
    >
      <Link href={href}>
        <a onClick={() => action({ type: "CHANGE_HELP_PAGE", page: name })}>{name}</a>
      </Link>
    </li>
  );
};
