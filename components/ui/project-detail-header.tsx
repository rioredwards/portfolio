import { DetailHeader } from "./detail-header";

interface ProjectDetailHeaderProps {
  title: string;
  slug: string;
  links?: { text: string; url: string; icon?: string }[];
  icon?: string;
  category: string;
  skills: string[];
}

export function ProjectDetailHeader(props: ProjectDetailHeaderProps) {
  return (
    <DetailHeader
      title={props.title}
      slug={props.slug}
      basePath="/work"
      links={props.links}
      icon={props.icon}
    />
  );
}
