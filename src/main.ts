import "./public-path";
import { App as AppType, createApp } from "vue";
import {
  Router,
  RouterHistory,
  createRouter,
  createWebHistory,
} from "vue-router";
import App from "./App.vue";
import routes from "./router";

const dom: DomType = {
  app: null,
  history: null,
  router: null,
};

function render({ container = document }: QkCustomProps) {
  dom.app = createApp(App);
  dom.history = createWebHistory(
    window.__POWERED_BY_QIANKUN__ ? "/vue" : process.env.BASE_URL
  );
  dom.router = createRouter({
    history: dom.history,
    routes,
  });

  dom.app.use(dom.router);

  const wrap = container.querySelector("#app");
  wrap && dom.app.mount(wrap);
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

interface QkCustomProps {
  container?: HTMLDivElement | Document;
  num?: number;
  util?: Record<PropertyKey, unknown>;
}

type DomType = {
  app: AppType<Element> | null;
  history: RouterHistory | null;
  router: Router | null;
};

export async function bootstrap(props: QkCustomProps) {
  console.log(props);
}

export async function mount(props: QkCustomProps) {
  render(props);
}

export async function unmount() {
  dom.app?.unmount();
  dom.history?.destroy();

  dom.app = null;
  dom.history = null;
  dom.router = null;
}
