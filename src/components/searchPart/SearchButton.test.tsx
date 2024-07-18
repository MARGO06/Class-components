import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchPart } from 'src/components/searchPart/SearchPart';

describe('SearchPart', () => {
  it('clicking the Search button saves the entered value to the local storage', () => {
    const onSearchClickMoc = vi.fn();
    render(
      <BrowserRouter>
        <SearchPart onSearchClick={onSearchClickMoc} />
      </BrowserRouter>,
    );

    const input = screen.getAllByRole('textbox') as HTMLInputElement[];
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input[0], { target: { value: 'lukas' } });
    fireEvent.click(button);
    expect(localStorage.getItem('searchName')).toBe('lukas');
  });

  it('the component retrieves the value from the local storage upon mounting', () => {
    const onSearchClickMoc = vi.fn();
    localStorage.setItem('searchName', 'lukas');
    render(
      <BrowserRouter>
        <SearchPart onSearchClick={onSearchClickMoc} />
      </BrowserRouter>,
    );

    const input = screen.getAllByRole('textbox') as HTMLInputElement[];
    expect(input[0].value).toBe('lukas');
  });
});
