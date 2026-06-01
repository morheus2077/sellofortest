import { Spinner } from "@/components/ui/spinner";

// app/loading.js
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-12 h-12 size-10">
        <Spinner 
        
        />
      </div>
    </div>
  );
}