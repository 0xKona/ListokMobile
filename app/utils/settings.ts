export const formatOverviewName = (string: string) => {
  const firstName = string?.split(' ')[0].toLowerCase();
  const secondaryInitial = string?.split(' ')[1]?.[0];
  return `${
    firstName.charAt(0).toUpperCase() + firstName.slice(1)
  } ${secondaryInitial}.`;
};
