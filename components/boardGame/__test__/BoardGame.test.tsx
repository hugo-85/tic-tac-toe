import { render, screen } from "@testing-library/react";
import BoardGame from "../BoardGame";
import userEvent from "@testing-library/user-event";

describe("Testing Board Game", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn(function mock(
      this: HTMLDialogElement
    ) {
      this.open = true;
    });

    HTMLDialogElement.prototype.showModal = jest.fn(function mock(
      this: HTMLDialogElement
    ) {
      this.open = true;
    });

    HTMLDialogElement.prototype.close = jest.fn(function mock(
      this: HTMLDialogElement
    ) {
      this.open = false;
    });
  });

  beforeEach(() => {
    render(<BoardGame />);
  });

  it("Should render 'Tic Tac Toe' title", () => {
    const element = screen.getByText("Tic Tac Toe");

    expect(element).toBeInTheDocument();
  });

  it("Should render a Reset game button", () => {
    const element = screen.getByRole("button");

    expect(element).toBeInTheDocument();
  });

  it("Should render 9 squares", () => {
    const element = screen.getAllByTestId("square");

    expect(element.length).toEqual(9);
  });

  it("Should render a turn section", () => {
    const element = screen.getByText(
      (content, element) =>
        element?.tagName.toLowerCase() === "strong" &&
        content.startsWith("Turn")
    );

    expect(element).toBeInTheDocument();
  });

  it("Modal should be hidden by default", () => {
    const element = screen.getByRole("dialog", { hidden: true });

    expect(element).toBeInTheDocument();
  });

  it("Should show a draw modal", async () => {
    const positions = [0, 1, 2, 5, 3, 8, 4, 6, 7];

    const elements = screen.queryAllByTestId("square");

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i];
      const squareElement = elements[position];

      await userEvent.click(squareElement);
    }

    screen.getByRole("dialog", { hidden: false });

    expect(screen.getByText("Its a draw")).toBeInTheDocument();
  });

  it("Should show a win modal", async () => {
    const positions = [0, 1, 4, 2, 8];

    const elements = screen.queryAllByTestId("square");

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i];
      const squareElement = elements[position];

      await userEvent.click(squareElement);
    }

    screen.getByRole("dialog", { hidden: false });

    expect(
      screen.getByRole("heading", { name: "Winner is X !!!!" })
    ).toBeInTheDocument();
  });

  it("Should clean the board when the reset button is clicked", async () => {
    const positions = [0, 1, 2, 5, 3, 8];

    const squareElements = screen.queryAllByTestId("square");

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i];
      const squareElement = squareElements[position];

      await userEvent.click(squareElement);
    }

    const btnElement = screen.getByRole("button", { name: "Reset game" });

    await userEvent.click(btnElement);

    const squareElementsContent = squareElements.map(
      (element) => element.textContent
    );

    const blankSquares = squareElementsContent.filter(
      (content) => content === ""
    );

    expect(blankSquares.length).toBe(9);
  });
});
