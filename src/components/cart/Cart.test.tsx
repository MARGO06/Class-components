import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { mockDataPerson } from 'src/views/informationPage/MockData';
import { Cart } from 'src/components/cart/Cart';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('react-router-dom')>()),
    useNavigate: () => mockNavigate,
  };
});

describe('Cart', () => {
  it('the detailed card component correctly displays the detailed card data', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockDataPerson,
    } as Response;

    global.fetch = vi.fn(() => Promise.resolve(mockResponse));

    render(
      <MemoryRouter>
        <Cart
          name={mockDataPerson.name}
          birth_year={mockDataPerson.birth_year}
          created={mockDataPerson.created}
          edited={mockDataPerson.edited}
          eye_color={mockDataPerson.eye_color}
          gender={mockDataPerson.gender}
          hair_color={mockDataPerson.hair_color}
          height={mockDataPerson.height}
          homeworld={mockDataPerson.homeworld}
          mass={mockDataPerson.mass}
          skin_color={mockDataPerson.skin_color}
          url={mockDataPerson.url}
        />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Name: Frank')).toBeInTheDocument();
      expect(screen.getByText('Birthday: 785')).toBeInTheDocument();
      expect(screen.getByText('Created: 159')).toBeInTheDocument();
      expect(screen.getByText('Edited: 148')).toBeInTheDocument();
      expect(screen.getByText('Eye color: blue')).toBeInTheDocument();
      expect(screen.getByText('Gender: male')).toBeInTheDocument();
      expect(screen.getByText('Hair color: blond')).toBeInTheDocument();
      expect(screen.getByText('Height: 148')).toBeInTheDocument();
      expect(screen.getByText('Home world: Mars')).toBeInTheDocument();
      expect(screen.getByText('Weight: 123')).toBeInTheDocument();
      expect(screen.getByText('Skin color: light')).toBeInTheDocument();
    });
  });

  it('clicking the close button hides the component', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockDataPerson,
    } as Response;

    global.fetch = vi.fn(() => Promise.resolve(mockResponse));

    render(
      <MemoryRouter>
        <Cart
          name={mockDataPerson.name}
          birth_year={mockDataPerson.birth_year}
          created={mockDataPerson.created}
          edited={mockDataPerson.edited}
          eye_color={mockDataPerson.eye_color}
          gender={mockDataPerson.gender}
          hair_color={mockDataPerson.hair_color}
          height={mockDataPerson.height}
          homeworld={mockDataPerson.homeworld}
          mass={mockDataPerson.mass}
          skin_color={mockDataPerson.skin_color}
          url={mockDataPerson.url}
        />
      </MemoryRouter>,
    );

    await waitFor(() => {
      const closeButton = screen.getByTestId('button close');
      fireEvent.click(closeButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/RS-School_React/?search=&page=1');
  });
});
