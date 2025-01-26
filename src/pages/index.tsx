import { EncryptedFileUploader } from "@/components/customComponents/EncryptedFileUploader";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="h-full">
        <EncryptedFileUploader />
      </div>
    </main>
  );
}
