import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalResults, onPageChange }) => {
  const totalPages = Math.ceil(totalResults / 10);
  
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-12 pb-8">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-slate-800 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors border border-slate-700"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <div className="flex items-center gap-2">
        <span className="text-slate-400">Page</span>
        <span className="font-bold text-blue-400">{currentPage}</span>
        <span className="text-slate-400 text-xs">of</span>
        <span className="text-white font-medium">{totalPages}</span>
      </div>

      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-slate-800 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors border border-slate-700"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Pagination;
