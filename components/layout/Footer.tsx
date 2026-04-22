export function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-surface-50 py-6 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-initia-500 to-initia-700 flex items-center justify-center">
            <span className="text-white font-bold text-[10px]">O</span>
          </div>
          <span className="text-sm text-surface-500">
            OmniHub - Initia Cross-Minitia Asset Manager
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-surface-500">
          <span>Built on Initia</span>
          <span>|</span>
          <span>Docs</span>
          <span>|</span>
          <span>GitHub</span>
        </div>
      </div>
    </footer>
  );
}
