export const validateFile = (file: File, errorShow: (message: string | null) => void): boolean => {
  const validExtensions = ['image/jpeg', 'image/png'];
  const maxSize = 5 * 1024 * 1024;
  if (!validExtensions.includes(file.type)) {
    errorShow('Only PNG and JPEG images are allowed');
    return false;
  }
  if (file.size > maxSize) {
    errorShow('File size must be less than 5MB');
    return false;
  }
  errorShow(null);
  return true;
};
