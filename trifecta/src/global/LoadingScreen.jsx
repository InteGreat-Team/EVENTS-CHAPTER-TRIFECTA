
export function LoadingScreen() {
  return (
    <div className="bg-green rounded-[10px] mb-4 flex flex-row items-center justify-center gap-3 px-4 py-3 text-center text-white">
      <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
      </svg>
      <p className="ml-0 text-[12px] md:text-[14px] lg:ml-0">
        Loading... Please wait...
      </p>
    </div>
  );
}