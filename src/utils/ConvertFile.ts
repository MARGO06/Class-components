export const convertToBase64 = async (file: File): Promise<string | ArrayBuffer | null> => {
  const customReader = new FileReader();

  const result = await new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    customReader.onload = () => resolve(customReader.result);
    customReader.onerror = (error) => reject(error);
    customReader.readAsDataURL(file);
  });

  return result;
};
