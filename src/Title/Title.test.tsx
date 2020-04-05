import React from "react";
import { render } from "@testing-library/react";
import Title, { TitleContainer } from "./Title";

describe(`renders title with the correct heading`, () => {
  [1, 2, 3, 4, 5, 6].forEach((level) => {
    test(`h${level}`, () => {
      const { baseElement } = render(<Title level={level as any} />);
      expect(
        baseElement.querySelector(`h${level}`)?.nodeName.toLowerCase()
      ).toBe(`h${level}`);
    });
  });
});

describe(`classnames`, () => {
  test(`adds the default classname`, () => {
    const { baseElement } = render(<Title level={1} />);
    expect(
      baseElement.querySelector(`h1`)?.classList.contains(TitleContainer)
    ).toBeTruthy();
  });
  test(`allows a custom classname to be passed`, () => {
    const { baseElement } = render(<Title level={1} className={`test`} />);
    expect(
      baseElement.querySelector(`h1`)?.classList.contains(TitleContainer)
    ).toBeTruthy();
    expect(
      baseElement.querySelector(`h1`)?.classList.contains(`test`)
    ).toBeTruthy();
  });
});
