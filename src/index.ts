import { Embed } from "./interfaces";
import "./styles/index.scss";

export default class EmbedWidget implements Embed {
  url: string;
  button: HTMLButtonElement;
  container: HTMLDivElement;
  initialText: string;
  state: string;
  constructor(url: string, text: string, extraClass?: string) {
    this.url = url;
    this.state = "closed";
    this.initialText = text;
    this.button = document.createElement("button");
    this.container = document.createElement("div");
    if (extraClass) {
      this.button.classList.add(extraClass);
      this.container.classList.add(extraClass);
    }
    this.start();
  }
  toggle() {
    if (this.state === "open") {
      this.close();
    } else {
      this.open();
    }
  }
  open() {
    this.state = "loading";
    this.updateButton();
    this.appendFrame();
  }
  close() {
    this.state = "closed";
    this.updateButton();
  }
  focusFrame() {
    const iframe = <HTMLElement>document.querySelector(".embed-widget-iframe");
    if (iframe) iframe.focus();
  }
  appendFrame() {
    if (document.querySelector(".embed-widget-iframe")) {
      this.state = "open";
      this.updateButton();
      this.focusFrame();
      return;
    }
    this.container.innerHTML = `<iframe class="embed-widget-iframe" src="${
      this.url
    }"></iframe>`;
    if (document.body) document.body.appendChild(this.container);
    const iframe = document.querySelector(".embed-widget-iframe");
    if (iframe) {
      iframe.addEventListener("load", () => {
        this.state = "open";
        this.updateButton();
        this.focusFrame();
      });
    }
  }
  updateClasses() {
    if (this.button) {
      this.button.classList.remove(`embed-widget-button--open`);
      this.button.classList.remove(`embed-widget-button--loading`);
      this.button.classList.remove(`embed-widget-button--closed`);
      this.button.classList.add(`embed-widget-button--${this.state}`);
    }
    if (this.container) {
      this.container.classList.remove(`embed-widget-container--open`);
      this.container.classList.remove(`embed-widget-container--loading`);
      this.container.classList.remove(`embed-widget-container--closed`);
      this.container.classList.add(`embed-widget-container--${this.state}`);
    }
  }
  updateButton() {
    if (this.state === "closed") {
      this.button.innerHTML = this.initialText;
    } else if (this.state === "loading") {
      this.button.innerHTML = `<span>Loading...</span><svg viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M55 25a5 5 0 0 1-10 0V5c0-3 2-5 5-5s5 2 5 5v20zm0 70a5 5 0 0 1-10 0V75c0-3 2-5 5-5s5 2 5 5v20zM25 45a5 5 0 0 1 0 10H5a5 5 0 0 1 0-10h20zm70 0a5 5 0 0 1 0 10H75a5 5 0 0 1 0-10h20zM36 29a5 5 0 0 1-7 7L15 22c-2-2-2-6 0-7 2-2 5-2 7 0l14 14zm49 49a5 5 0 0 1-7 7L64 71a5 5 0 0 1 0-7 5 5 0 0 1 7 0l14 14zM29 64a5 5 0 0 1 7 7L22 85a5 5 0 0 1-7-7l14-14zm49-49c2-2 5-2 7 0s2 5 0 7L71 36a5 5 0 0 1-7-7l14-14z"/></svg>`;
    } else if (this.state === "open") {
      this.button.innerHTML = `<span>Close</span><svg viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" fill-rule="nonzero" d="M73.9 28.1a3.9 3.9 0 0 0-5.5 0L51 45.6 33.6 28a3.8 3.8 0 0 0-5.5 5.5L45.6 51 28 68.4a3.8 3.8 0 1 0 5.5 5.5L51 56.3 68.4 74a3.8 3.8 0 0 0 5.5 0c1.5-1.6 1.5-4 0-5.5L56.4 51l17.4-17.4c1.5-1.5 1.5-4 0-5.5"></path></svg>`;
    }
    this.updateClasses();
  }
  destroy() {
    if (this.button.parentNode) this.button.parentNode.removeChild(this.button);
    if (this.container.parentNode)
      this.container.parentNode.removeChild(this.container);
  }
  start() {
    this.updateButton();
    this.button.addEventListener("click", () => this.toggle());
    this.button.classList.add("embed-widget-button");
    if (document.body) document.body.appendChild(this.button);
    this.container.classList.add("embed-widget-container");
  }
}

(<any>window).EmbedWidget = EmbedWidget;
