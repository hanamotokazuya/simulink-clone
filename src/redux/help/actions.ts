export const CHANGE_HELP_PAGE = "CHANGE_HELP_PAGE" as const;
export const changeHelpPageAction = (page: string) => {
  return {
    type: CHANGE_HELP_PAGE,
    payload: {
      page,
    },
  };
};
