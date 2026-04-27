import type { Event } from "@/features/events/types";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type Mock, beforeEach, describe, expect, it, vi } from "vitest";
import { LeadForm } from "./LeadForm";
import type { LeadFormData } from "@/shared/schemas/leadSchema";

const mockEvent: Event = {
  id: 1,
  title: "Evento de Prueba Javeriana",
  description: "Descripción del evento",
  location: "Auditorio Central",
  category: "Pregrado",
  date: "2023-10-10",
  imageUrl: "",
};

describe("LeadForm", () => {
  let onSubmitMock: Mock<(data: LeadFormData) => void>;
  let onCloseMock: Mock<() => void>;

  beforeEach(() => {
    onSubmitMock = vi.fn();
    onCloseMock = vi.fn();
  });

  it("should render the form with the correct event title", () => {
    render(
      <LeadForm
        event={mockEvent}
        onSubmit={onSubmitMock}
        onClose={onCloseMock}
      />,
    );

    expect(screen.getByText("Registrar Interesado")).toBeInTheDocument();
    expect(screen.getByText("Evento de Prueba Javeriana")).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it("should show validation errors when submitting empty fields", async () => {
    const user = userEvent.setup();
    render(
      <LeadForm
        event={mockEvent}
        onSubmit={onSubmitMock}
        onClose={onCloseMock}
      />,
    );

    const submitBtn = screen.getByRole("button", { name: /Registrar Lead/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText("El nombre completo es requerido"),
      ).toBeInTheDocument();
      expect(screen.getByText("El email es requerido")).toBeInTheDocument();
    });

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it("should show validation error when email is not @javeriana.edu.co", async () => {
    const user = userEvent.setup();
    render(
      <LeadForm
        event={mockEvent}
        onSubmit={onSubmitMock}
        onClose={onCloseMock}
      />,
    );

    await user.type(screen.getByLabelText(/Nombre Completo/i), "Juan Perez");
    await user.type(screen.getByLabelText(/Email/i), "juan@gmail.com");

    const submitBtn = screen.getByRole("button", { name: /Registrar Lead/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText("El email debe terminar en @javeriana.edu.co"),
      ).toBeInTheDocument();
    });

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it("should call onSubmit and onClose when valid data is submitted", async () => {
    const user = userEvent.setup();
    render(
      <LeadForm
        event={mockEvent}
        onSubmit={onSubmitMock}
        onClose={onCloseMock}
      />,
    );

    await user.type(screen.getByLabelText(/Nombre Completo/i), "Juan Perez");
    await user.type(screen.getByLabelText(/Email/i), "juan@javeriana.edu.co");
    await user.type(screen.getByLabelText(/Teléfono/i), "3001234567");

    const submitBtn = screen.getByRole("button", { name: /Registrar Lead/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });

    // The data passed to onSubmit should have the full name transformed (capitalized)
    expect(onSubmitMock).toHaveBeenCalledWith({
      fullName: "Juan Perez", // Should be capitalized by Zod
      email: "juan@javeriana.edu.co",
      phone: "3001234567",
      eventId: mockEvent.id,
      eventTitle: mockEvent.title,
    });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
