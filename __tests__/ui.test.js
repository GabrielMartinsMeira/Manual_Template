import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../src/components/Header';
import ManualTypeCard from '../src/components/ManualTypeCard';
import { FaDesktop } from 'react-icons/fa';
import { ThemeProvider } from '../src/components/ThemeProvider';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
}));

describe('UI Components', () => {
  describe('Header', () => {
    it('renders theme toggle switch and language dropdown', () => {
      render(
        <ThemeProvider>
          <Header language="pt" />
        </ThemeProvider>
      );

      // Check language dropdown is present
      expect(screen.getByText('PT-BR')).toBeInTheDocument();

      // Check theme switch is present
      const themeSwitch = document.getElementById('themeSwitch');
      expect(themeSwitch).toBeInTheDocument();

      // Click theme switch
      fireEvent.click(themeSwitch);
      
      // In the context provider, it sets data-bs-theme on document.body
      // Wait for React to process the state change.
      expect(document.body.getAttribute('data-bs-theme')).toBe('dark');
    });
  });

  describe('ManualTypeCard', () => {
    it('renders correctly and responds to click', () => {
      const mockOnClick = jest.fn();
      
      render(
        <ManualTypeCard 
          title="Test Manual" 
          description="Test description" 
          icon={FaDesktop} 
          theme="light" 
          onClick={mockOnClick} 
        />
      );

      expect(screen.getByText('Test Manual')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();

      const card = screen.getByText('Test Manual').closest('button');
      fireEvent.click(card);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
