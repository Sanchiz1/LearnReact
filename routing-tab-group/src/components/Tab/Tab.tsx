import { To } from "react-router";
import useRoutingTab from "../../hooks/useRoutingTab";
import Button from "../Button/Button";

type Props = {
  name: string;
  to: To;
}

const Tab = ({ name, to }: Props) => {
  const { navigate, selected } = useRoutingTab(to);

  return (
    <Button color="info" onClick={navigate} aria-selected={selected} disabled={selected}>
      {name}
    </Button>
  );
}

export default Tab;