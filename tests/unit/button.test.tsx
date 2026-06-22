import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders button text", () => {
    render(<Button>Submit </Button>);

    expect(
      screen.getByRole("button", {
        name: "Submit",
      }),
    ).toBeInTheDocument();
  });
});
