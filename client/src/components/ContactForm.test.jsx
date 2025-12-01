import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from './ContactForm';

describe('Componente ContactForm', () => {
  
  it('debería renderizar todos los campos del formulario', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument();
  });

  it('debería permitir escribir en los campos de texto', () => {
    render(<ContactForm />);
    
    const nombreInput = screen.getByLabelText(/Nombre/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const mensajeInput = screen.getByLabelText(/Mensaje/i);
    
    fireEvent.change(nombreInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });
    fireEvent.change(mensajeInput, { target: { value: 'Hola, necesito información' } });
    
    expect(nombreInput).toHaveValue('Juan Pérez');
    expect(emailInput).toHaveValue('juan@example.com');
    expect(mensajeInput).toHaveValue('Hola, necesito información');
  });

  it('debería mostrar error cuando se envía el formulario vacío', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /Enviar/i });
    fireEvent.click(submitButton);
    
    // Esperamos que aparezca algún mensaje de error
    await waitFor(() => {
      const nombreInput = screen.getByLabelText(/Nombre/i);
      expect(nombreInput).toBeInvalid();
    });
  });

  it('debería deshabilitar el botón mientras se envía el formulario', async () => {
    render(<ContactForm />);
    
    const nombreInput = screen.getByLabelText(/Nombre/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const mensajeInput = screen.getByLabelText(/Mensaje/i);
    const submitButton = screen.getByRole('button', { name: /Enviar/i });
    
    // Llenamos el formulario
    fireEvent.change(nombreInput, { target: { value: 'Juan' } });
    fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });
    fireEvent.change(mensajeInput, { target: { value: 'Mensaje de prueba' } });
    
    // Enviamos
    fireEvent.click(submitButton);
    
    // Verificar que se muestra el mensaje de éxito
    await waitFor(() => {
      expect(screen.getByText(/Mensaje enviado correctamente/i)).toBeInTheDocument();
    });
  });
});
