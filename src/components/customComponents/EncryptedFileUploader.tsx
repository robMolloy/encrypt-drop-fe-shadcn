import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const EncryptedFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [key, setKey] = useState("");
  const [password, setPassword] = useState("");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [encryptionData, setEncryptionData] = useState<{
    iv: Uint8Array;
    salt: Uint8Array;
  } | null>(null);

  console.log(`EncryptedFileUploader.tsx:${/*LL*/ 18}`, {
    file,
    setIsEncrypting,
    setIsUploading,
    setUploadedUrl,
    setEncryptionData,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleEncryptAndSave = async () => {
    // if (!file || !key || !password) {
    //   alert("Please select a file and provide both key and password");
    //   return;
    // }
    // setIsEncrypting(true);
    // try {
    //   const { encryptedBlob, iv, salt } = await encryptFile(
    //     file,
    //     key,
    //     password
    //   );
    //   setEncryptionData({ iv, salt });
    //   const encryptedFile = new File(
    //     [encryptedBlob],
    //     `${file.name}.encrypted`,
    //     { type: "application/octet-stream" }
    //   );
    //   setIsUploading(true);
    //   const formData = new FormData();
    //   formData.append("file", encryptedFile);
    //   formData.append("encryptionKey", key);
    //   formData.append("iv", JSON.stringify(Array.from(iv)));
    //   formData.append("salt", JSON.stringify(Array.from(salt)));
    //   const result = await uploadFile(formData);
    //   if (result.success) {
    //     setUploadedUrl(result.url);
    //     alert("File encrypted and uploaded successfully!");
    //   } else {
    //     alert("Failed to upload encrypted file");
    //   }
    // } catch (error) {
    //   console.error("Error during encryption or upload:", error);
    //   alert("An error occurred during encryption or upload");
    // } finally {
    //   setIsEncrypting(false);
    //   setIsUploading(false);
    // }
  };

  const handleEncryptAndDownload = async () => {
    // if (!file || !key || !password) {
    //   alert("Please select a file and provide both key and password");
    //   return;
    // }
    // setIsEncrypting(true);
    // try {
    //   const { encryptedBlob, iv, salt } = await encryptFile(
    //     file,
    //     key,
    //     password
    //   );
    //   setEncryptionData({ iv, salt });
    //   const url = URL.createObjectURL(encryptedBlob);
    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download = `${file.name}.encrypted`;
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    //   URL.revokeObjectURL(url);
    // } catch (error) {
    //   console.error("Error during encryption:", error);
    //   alert("An error occurred during encryption");
    // } finally {
    //   setIsEncrypting(false);
    // }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Encrypted File Uploader
      </h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="file">Select File</Label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="key">Encryption Key</Label>
          <Input
            id="key"
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="flex space-x-4">
          <Button
            onClick={handleEncryptAndSave}
            disabled={isEncrypting || isUploading}
            className="flex-1"
          >
            {isEncrypting
              ? "Encrypting..."
              : isUploading
              ? "Uploading..."
              : "Encrypt & Save"}
          </Button>
          <Button
            onClick={handleEncryptAndDownload}
            disabled={isEncrypting}
            className="flex-1"
          >
            {isEncrypting ? "Encrypting..." : "Encrypt & Download"}
          </Button>
        </div>
        {uploadedUrl && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Encrypted file uploaded:</p>
            <a
              href={uploadedUrl}
              className="text-blue-500 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {uploadedUrl}
            </a>
          </div>
        )}
        {encryptionData && (
          <div className="mt-4 space-y-2">
            <div>
              <Label htmlFor="iv">Initialization Vector (IV)</Label>
              <div className="flex mt-1">
                <Input
                  id="iv"
                  value={JSON.stringify(Array.from(encryptionData.iv))}
                  readOnly
                  className="font-mono text-sm flex-grow"
                />
                <Button
                  onClick={() =>
                    copyToClipboard(
                      JSON.stringify(Array.from(encryptionData.iv))
                    )
                  }
                  className="ml-2 px-2"
                  aria-label="Copy IV"
                >
                  {/* <ClipboardCopy className="h-4 w-4" /> */}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="salt">Salt</Label>
              <div className="flex mt-1">
                <Input
                  id="salt"
                  value={JSON.stringify(Array.from(encryptionData.salt))}
                  readOnly
                  className="font-mono text-sm flex-grow"
                />
                <Button
                  onClick={() =>
                    copyToClipboard(
                      JSON.stringify(Array.from(encryptionData.salt))
                    )
                  }
                  className="ml-2 px-2"
                  aria-label="Copy Salt"
                >
                  {/* <ClipboardCopy className="h-4 w-4" /> */}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
