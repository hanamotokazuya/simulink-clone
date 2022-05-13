export type Links = {
  [key in string]?: {
    from: PortOfBlock;
    to: PortOfBlock;
  };
};
export type PortOfBlock = {
  [blockId in string]: number;
};
