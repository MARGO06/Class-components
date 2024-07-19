import { render, screen, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PeopleResult } from 'src/components/peoplePart/PeoplePart';
import { MemoryRouter } from 'react-router-dom';
import { mockDataPeople } from 'src/views/informationPage/MockData';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('react-router-dom')>()),
    useNavigate: () => mockNavigate,
  };
});

describe('PeoplePart', () => {
  it('that the card component renders the relevant card data', async () => {
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
      const descriptionElement = within(linkElement[0]).getByTestId('description:Frank');

      expect(nameElement).toHaveTextContent('Frank');
      expect(descriptionElement).toHaveTextContent(
        'This person was born in the year 785. Male has blue eyes,blond hair, weighs 123 kg, and is148 cm tall.',
      );
    });
  });
});
