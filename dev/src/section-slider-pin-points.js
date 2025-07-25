if (!customElements.get("s-slider-pin-points")) {
  customElements.define(
    "s-slider-pin-points",
    class SectionSliderPinPoints extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        this.swiperEl = this.querySelector(".js-slider-pin-points__slider");
        this.addEventListener("click", this.handleClick);
        setTimeout(this.initSlider, 0);
      }
      disconnectedCallback() {
        this.removeEventListener("click", this.handleClick);
        this.swiperEl?.swiper?.destroy(true, true);
      }

      handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const target = event.target;
        if (target.closest(".js-slider-pin-points__slider-btn-next")) {
          this.swiperEl?.swiper?.slideNext(300);
        } else if (target.closest(".js-slider-pin-points__slider-btn-prev")) {
          this.swiperEl?.swiper?.slidePrev(300);
        } else if (target.closest(".js-slider-pin-points__click-item")) {
          const activeButtonIndex = target.closest(".js-slider-pin-points__click-item").dataset.index;
          this.swiperEl?.hasAttribute("data-loop") ? this.swiperEl?.swiper?.slideToLoop(+activeButtonIndex, 300) : this.swiperEl?.swiper?.slideTo(+activeButtonIndex, 300);
        }
      };
      initSlider = () => {
        const swiperParams = {
          autoplay: this.swiperEl?.hasAttribute("data-autoplay"),
          loop: this.swiperEl?.hasAttribute("data-loop"),
          navigation: false,
        };

        Object.assign(this.swiperEl, swiperParams);

        this.swiperEl.initialize();
        this.swiperEl?.swiper?.slideTo(0, 300);
        this.swiperEl?.swiper?.on("slideChange", this.handleSlideChange);
      };

      handleSlideChange = (swiper) => {
        const newActiveBtn = this.querySelector(`.js-slider-pin-points__click-item[data-index="${swiper.realIndex}"]`);
        this.querySelector(".js-slider-pin-points__click-item.is-active")?.classList.remove("is-active");
        newActiveBtn?.classList.add("is-active");
      };
    }
  );
}
