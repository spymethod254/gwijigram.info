import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { ProjectFile } from '../types';

export async function downloadProjectAsZip(
  projectName: string,
  files: ProjectFile[]
): Promise<void> {
  const zip = new JSZip();
  const folderName = projectName.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const root = zip.folder(folderName) || zip;

  // Add all files
  for (const file of files) {
    root.file(file.path, file.content);
  }

  // Generate blob
  const content = await zip.generateAsync({ type: 'blob' });
  
  // Create download link
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${folderName}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // Trigger celebration confetti
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#38bdf8', '#10b981', '#f59e0b', '#ec4899']
    });
  } catch {
    // Confetti is purely decorative
  }
}
