import MapView from "@/components/MapView";
import UploadForm from "@/components/UploadForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadForm />
      {/* <MapView/> */}
    </main>
  );
}
