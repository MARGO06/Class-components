import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { ThemeProvider } from '../src/hooks/ThemeContext';
import { SearchPart } from '../src/components/searchPart/SearchPart';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('SearchPart', () => {
  const push = vi.fn();
  beforeEach(() => {
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      push,
      query: { search: 'lukas' },
    });
  });
  it('clicking the Search button saves the entered value to the local storage', () => {
    const onSearchClickMoc = vi.fn();
    render(
      <ThemeProvider>
        <SearchPart onSearchClick={onSearchClickMoc} />
      </ThemeProvider>,
    );

    const input = screen.getAllByRole('textbox') as HTMLInputElement[];
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input[0], { target: { value: 'lukas' } });
    fireEvent.click(button);
    expect(push).toHaveBeenCalledWith(`/?search=lukas&page=1`);
  });

  it('the component retrieves the value from the local storage upon mounting', () => {
    const onSearchClickMoc = vi.fn();
    render(
      <ThemeProvider>
        <SearchPart onSearchClick={onSearchClickMoc} />
      </ThemeProvider>,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('lukas');
  });
});
