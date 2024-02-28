import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Square from "../Square";

const mockUpdateBoard = jest.fn();

describe("Testing square", () => {
  it("Should render a square", () => {
    render(
      <Square
        value={null}
        index={0}
        board={new Array(9).fill(null)}
        updateBoard={mockUpdateBoard}
      />
    );

    const element = screen.getByTestId("square");

    expect(element.style.width).toBe(element.style.height);
  });

  it("Should render nothing inside the square", () => {
    render(
      <Square
        value={null}
        index={0}
        board={new Array(9).fill(null)}
        updateBoard={mockUpdateBoard}
      />
    );

    const element = screen.getByTestId("square");

    expect(element.textContent).toBe("");
  });

  it("Should render 'X' inside the square", () => {
    render(
      <Square
        value={"X"}
        index={0}
        board={new Array(9).fill(null)}
        updateBoard={mockUpdateBoard}
      />
    );

    const element = screen.getByTestId("square");

    expect(element.textContent).toBe("X");
  });

  it("Should call updateBoard on click", async () => {
    render(
      <Square
        value={null}
        index={0}
        board={new Array(9).fill(null)}
        updateBoard={mockUpdateBoard}
      />
    );

    const element = screen.getByTestId("square");

    await userEvent.click(element);

    expect(mockUpdateBoard).toHaveBeenCalled();
  });

  it("Once set the value should not change", async () => {
    render(
      <Square
        value={"X"}
        index={0}
        board={new Array(9).fill(null)}
        updateBoard={mockUpdateBoard}
      />
    );

    const element = screen.getByTestId("square");

    expect(element.textContent).toBe("X");

    await userEvent.click(element);

    expect(element.textContent).toBe("X");
  });
});
