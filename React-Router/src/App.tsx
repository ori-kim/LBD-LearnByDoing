import { useSyncExternalStore } from "react";
import { String } from "./component/A";

const RouteManager = () => {
  return {
    getState: () => window.location.pathname,
    push: (path: string) => {
      if (window.location.pathname === path) return;

      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
    },
    subscribe: (callback: (path: string) => void) => {
      window.addEventListener("popstate", () => callback(window.location.pathname));
    },
    unSubscribe: (callback: (path: string) => void) => {
      window.removeEventListener("popstate", () => callback(window.location.pathname));
    },
    adapter: (onStoreChange: () => void) => () => {
      window.addEventListener("popstate", onStoreChange);
    },
    match: (path: string) => {
      const pathArr = path.split("/");
      const currentPathArr = window.location.pathname.split("/");

      const map: Record<string, string> = {};

      if (pathArr.length !== currentPathArr.length) return false;

      for (let i = 0; i < pathArr.length; i++) {
        if (!pathArr[i].startsWith(":") && pathArr[i] !== currentPathArr[i]) return false;

        if (pathArr[i].startsWith(":")) {
          const key = pathArr[i].replace(":", "");

          map[key] = currentPathArr[i];
        }
      }

      return true;
    },
  };
};

const useRouter = () => {
  const { adapter, getState, match } = RouteManager();

  const path = useSyncExternalStore(adapter, getState);

  return { path, match };
};

export function App() {
  const { match } = useRouter();

  return (
    <>
      <Link to="/">home</Link>
      <Link to="/detail">detail</Link>
      <Link to="/detail/123">detail</Link>

      {match("/") && <String>i'm main</String>}
      {match("/detail") && <String>i'm detail</String>}
      {match("/detail/:id") && <String>i'm detail with id</String>}
    </>
  );
}

export function Link({ to, children }: { to: string; children: React.ReactNode }) {
  const move = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    RouteManager().push(path);
  };

  return (
    <a href={to} onClick={(e) => move(to, e)}>
      {children}
    </a>
  );
}
