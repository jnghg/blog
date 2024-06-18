import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Page from "../app/page";

describe("Page", () => {
  it("페이지 렌더링", () => {
    const { container } = render(<Page />);

    expect(container).toBeInTheDocument();
  });
});
