import { render, screen, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PeopleResult } from 'src/components/peoplePart/PeoplePart';
import { MemoryRouter } from 'react-router-dom';
import { mockDataPeople } from 'src/views/informationPage/MockData';

describe('PeoplePart', () => {
  it('the component renders the specified number of cards if LS is empty', async () => {
    localStorage.setItem('searchName', '');

    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockDataPeople,
    } as Response;

    global.fetch = vi.fn(() => Promise.resolve(mockResponse));

    render(
      <MemoryRouter>
        <PeopleResult peopleState={{ people: mockDataPeople }} />
      </MemoryRouter>,
    );

    await waitFor(() => {
      const linkElement = screen.getAllByRole('link');
      const nameElement = within(linkElement[0]).getByTestId('name:Frank');
      const nameElement2 = within(linkElement[1]).getByTestId('name:Henry');
      expect(nameElement).toBeInTheDocument();
      expect(nameElement2).toBeInTheDocument();
      expect(linkElement).toHaveLength(2);
    });
  });

  it('the component renders the specified number of cards if LS is not empty', async () => {
    localStorage.setItem('searchName', 'Frank');

    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => ({ people: [mockDataPeople[0]] }),
    } as Response;

    global.fetch = vi.fn(() => Promise.resolve(mockResponse));

    render(
      <MemoryRouter>
        <PeopleResult peopleState={{ people: [mockDataPeople[0]] }} />
      </MemoryRouter>,
    );

    await waitFor(() => {
      const linkElement = screen.getAllByRole('link');
      const nameElement = within(linkElement[0]).getByTestId('name:Frank');
      expect(nameElement).toBeInTheDocument();
      expect(linkElement).toHaveLength(1);
    });
  });
});
