if (!customElements.get("s-slider-pin-points")) {
  customElements.define(
    "s-slider-pin-points",
    class SectionSliderPinPoints extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {}
      disconnectedCallback() {}
    }
  );
}
