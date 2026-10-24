import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 bg-[#F5F6F8] border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="flex items-center gap-1 hover:text-[#003566] transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              {isLast || !item.path ? (
                <span className="font-semibold text-[#00264D] truncate">{item.name}</span>
              ) : (
                <Link to={item.path} className="hover:text-[#003566] transition-colors truncate">
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
