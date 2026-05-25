import { createApp } from "vue";
import App from "./App.vue";
import "./Main.css";
import { FrappeUI, setConfig, frappeRequest } from "frappe-ui";

setConfig("resourceFetcher", frappeRequest);

const app = createApp(App);
app.use(FrappeUI);
app.mount("#app");
