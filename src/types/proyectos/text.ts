export type ProjectTextPart = {
  text: string;
  bold?: boolean;
};

export type ProjectSection = {
  title: string;
  parts: ProjectTextPart[];
};