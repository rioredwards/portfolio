import { Shield as ShieldType } from "@/lib/dataTypes";
import { MotionSVGFromUrl } from "./SVGFromUrl";

interface Props {
  shield: ShieldType;
  [key: string]: unknown; // For other props that might be passed
}

function formatShieldUrl(shield: ShieldType) {
  return `https://img.shields.io/badge/${shield.text}-${shield.backgroundColor}?style=${shield.style}&logo=${shield.logoName}&logoColor=${shield.logoColor}`;
}

const Shield: React.FC<Props> = (prop) => {
  const shield = prop.shield as ShieldType;
  return <MotionSVGFromUrl title={shield.name} url={formatShieldUrl(shield)} />;
};

export default Shield;
