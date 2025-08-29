export const absoluteImageUrl = (path: string) => {
  const imageURL = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${path}`;

  return imageURL;
};
