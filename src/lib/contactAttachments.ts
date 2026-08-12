export const CONTACT_FILE_ACCEPT = ".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.xls,.xlsx";
export const MAX_CONTACT_FILES = 3;
export const MAX_CONTACT_FILE_SIZE = 5 * 1024 * 1024;
export const MAX_CONTACT_TOTAL_SIZE = 10 * 1024 * 1024;

export type ContactAttachment = {
  filename: string;
  content: string;
};

const allowedExtensions = new Set([
  "pdf", "jpg", "jpeg", "png", "webp", "doc", "docx", "xls", "xlsx",
]);

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error(`Nie udało się odczytać pliku „${file.name}”.`));
    reader.readAsDataURL(file);
  });
}

export async function prepareContactAttachments(files: File[]): Promise<ContactAttachment[]> {
  if (files.length > MAX_CONTACT_FILES) {
    throw new Error(`Możesz dodać maksymalnie ${MAX_CONTACT_FILES} pliki.`);
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > MAX_CONTACT_TOTAL_SIZE) {
    throw new Error("Łączny rozmiar załączników nie może przekraczać 10 MB.");
  }

  return Promise.all(files.map(async file => {
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    if (!allowedExtensions.has(extension)) {
      throw new Error(`Format pliku „${file.name}” nie jest obsługiwany.`);
    }
    if (file.size > MAX_CONTACT_FILE_SIZE) {
      throw new Error(`Plik „${file.name}” przekracza limit 5 MB.`);
    }

    const dataUrl = await readAsDataUrl(file);
    return { filename: file.name, content: dataUrl.split(",")[1] || "" };
  }));
}
