import { To, useLocation, useNavigate, useResolvedPath } from "react-router";

const useRoutingTab = (to: To) => {
  const navigate = useNavigate();

  const { pathname: toPath } = useResolvedPath(to);
  const { pathname: currentPath } = useLocation();

  const selected = currentPath.startsWith(toPath);

  return {
    navigate: () => navigate(to),
    currentPath,
    selected,
  }
}

export default useRoutingTab;