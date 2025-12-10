import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-surface-900 rounded-t-3xl z-50 max-h-[85vh] overflow-hidden"
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-surface-700 rounded-full" />
            </div>
            {title && (
              <div className="flex items-center justify-between px-6 pb-4 border-b border-surface-800">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-surface-800 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            )}
            <div className="overflow-y-auto max-h-[calc(85vh-80px)]">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

