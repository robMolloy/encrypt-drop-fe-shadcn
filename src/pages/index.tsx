import { EncryptedFileUploader } from "@/components/customComponents/EncryptedFileUploader";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center py-12">
      <div>
        <EncryptedFileUploader />
      </div>
    </main>
  );
}
