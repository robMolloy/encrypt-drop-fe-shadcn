import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ClipboardCopy, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  generateEncryptionKeySalt,
  generateInitializationVector,
  serializeUInt8Array,
} from "@/modules/encryption/encryptionUtils";

// const encryptAndSave = async () => {};

const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

const VerticalSpace = () => {
  return <div className="p-2" />;
};

export const EncryptedFileUploader = () => {
  const fileUploadElementRef = useRef<HTMLInputElement>(null);
  const [unencryptedFileBuffer, setUnencryptedFileBuffer] =
    useState<ArrayBuffer>();

  const [encryptedFileName, setEncryptedFileName] = useState("");

  const [password, setPassword] = useState("");
  const [isEncryptionKeyDataVisible, setIsEncryptionKeyDataVisible] =
    useState(false);
  const [serialisedInitialisationVector, setSerialisedInitialisationVector] =
    useState("");
  const [serialisedEncryptionKeySalt, setSerialisedEncryptionKeySalt] =
    useState("");

  useEffect(() => {
    const eks = serializeUInt8Array(generateEncryptionKeySalt());
    setSerialisedEncryptionKeySalt(eks);
    const iv = serializeUInt8Array(generateInitializationVector());
    setSerialisedInitialisationVector(iv);
  }, []);

  const handleEncryptAndDownload = async () => {};
  const step = (() => {
    if (!unencryptedFileBuffer) return "select_file";
  })();

  return (
    <Card className="w-full max-w-md min-w-96 mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>Encrypted File Uploader: {step}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="file">Select File</Label>
          <Input
            id="file"
            type="file"
            className="cursor-pointer"
            onInput={async () => {
              const fileInput = fileUploadElementRef.current;
              if (!fileInput) return { success: false } as const;

              const file = fileInput.files?.[0];
              if (!file) return { success: false } as const;

              const fileBuffer = await file.arrayBuffer();
              setUnencryptedFileBuffer(fileBuffer);
              setEncryptedFileName(`${file.name}.bin`);
            }}
            ref={fileUploadElementRef}
          />
        </div>
        <VerticalSpace />
        <div>
          <Label htmlFor="passwordInput">Password</Label>
          <Input
            id="passwordInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <VerticalSpace />
        <div>
          <Label htmlFor="encryptedFileNameInput">Encrypted File Name</Label>
          <Input
            id="encryptedFileNameInput"
            placeholder="Encrypted File Name"
            type="text"
            value={encryptedFileName}
            onChange={(e) => setEncryptedFileName(e.target.value)}
          />
        </div>
        <VerticalSpace />
        <div className="flex gap-2">
          <Button onClick={() => {}} disabled={false} className="flex-1">
            Encrypt & Save
          </Button>
          <Button
            onClick={handleEncryptAndDownload}
            disabled={false}
            className="flex-1"
          >
            Encrypt & Download
          </Button>
        </div>
        <VerticalSpace />
        <Collapsible
          open={isEncryptionKeyDataVisible}
          onOpenChange={setIsEncryptionKeyDataVisible}
          className="border rounded-md overflow-hidden"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center justify-between w-full rounded-none"
            >
              <span>View Encryption Details</span>
              {(() => {
                const Comp = isEncryptionKeyDataVisible
                  ? ChevronUp
                  : ChevronDown;
                return <Comp className="h-4 w-4" />;
              })()}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-3">
            <div className="space-y-2">
              <Label htmlFor="iv">Initialization Vector (IV)</Label>
              <div className="flex">
                <Input
                  id="iv"
                  value={serialisedInitialisationVector}
                  onChange={(e) =>
                    setSerialisedInitialisationVector(e.target.value)
                  }
                  className="font-mono text-sm flex-grow"
                />
                <Button
                  onClick={() =>
                    copyToClipboard(serialisedInitialisationVector)
                  }
                  size="icon"
                  variant="outline"
                  className="ml-2"
                  aria-label="Copy IV"
                >
                  <ClipboardCopy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <VerticalSpace />

            <div className="space-y-2">
              <Label htmlFor="salt">Serialised Encryption Key Salt</Label>
              <div className="flex">
                <Input
                  id="salt"
                  value={serialisedEncryptionKeySalt}
                  className="font-mono text-sm flex-grow"
                />
                <Button
                  onClick={() => copyToClipboard(serialisedEncryptionKeySalt)}
                  size="icon"
                  variant="outline"
                  className="ml-2"
                  aria-label="Copy Salt"
                >
                  <ClipboardCopy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
