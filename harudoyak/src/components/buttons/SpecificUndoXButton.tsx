import { useRouter } from "next/router";
import Image from "next/image";

interface UndoButtonProps {
  icon: string;
  altText?: string;
}

const SpeicificUndoXButton: React.FC<UndoButtonProps> = ({
  icon,
  altText = "닫기",
}) => {
  const router = useRouter();

  return (
    <>
      <button type="button" onClick={() => router.push("/my-page")}>
        <Image src={icon} alt={altText} />
      </button>
    </>
  );
};

export default SpeicificUndoXButton;
