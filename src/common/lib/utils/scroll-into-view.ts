export const scrollIntoView = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) element.scrollIntoView({ behavior: "smooth" });
};
