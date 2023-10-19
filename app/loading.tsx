import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div>
      <Skeleton height={200} className="bg-dark-500" />
      <Skeleton
        className="mt-4"
        count={10}
        baseColor="#1f2937"
        style={{
          backgroundColor: "#1f2937",
        }}
      />
    </div>
  );
}
