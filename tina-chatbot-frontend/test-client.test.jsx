//@vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import MessageBubble from "./src/components/MessageBubble";
import { describe, it, expect } from "vitest";

describe("Frontend MessageBubble Presentation UI tests", () => {
  it("should correctly display the raw text string message sent to it", () => {
    //Arrange
    const sampleMsg = {
      role: "user",
      content: "Hello Tina, checking insurance",
    };

    //Act: Renders component
    render(<MessageBubble msg={sampleMsg} />);

    //Assert: Search the screen environment for your exact string text
    const textElement = screen.getByText("Hello Tina, checking insurance");

    expect(textElement).toBeDefined();
  });

  it("should display the correct label tag text when Tina speaks", () => {
    //Arrange
    const sampleMsg = { role: "assistant", content: "Welcome to Turners" };

    //Act
    render(<MessageBubble msg={sampleMsg} />);

    //Assert: Confirm the label flips to Tina dynamically
    const labelElement = screen.getByText("Tina");

    expect(labelElement).toBeDefined();
  });
});
