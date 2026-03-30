import React from 'react';
import { Search } from 'lucide-react';
import './SearchInput.css';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export default function SearchInput({ className, ...props }: SearchInputProps) {
    return (
        <div className={`search-container ${className || ''}`}>
            <Search className="search-icon" />
            <input
                type="text"
                className="search-input"
                placeholder="Search..."
                {...props}
            />
        </div>
    );
}