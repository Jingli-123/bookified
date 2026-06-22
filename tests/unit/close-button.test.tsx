import CloseButton from "@/components/ui/close-button";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  it("calls onClick when clicked", async () => {

    const user = userEvent.setup();

    const handleClick = jest.fn();

    render(
      <CloseButton
        onClose={handleClick}
      />
    );

    await user.click(
      screen.getByRole("button")
    );

    expect(handleClick).toHaveBeenCalledTimes(1);

  });

});