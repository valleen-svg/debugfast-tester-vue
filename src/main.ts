import { createApp, reactive } from 'vue';import DebugFast from 'debugfast-js';
import { debugfastPlugin } from 'debugfast-js/vue';
import App from './App.vue';
import './style.css';

// Initialize DebugFast
const apiKey = import.meta.env.DEBUGFAST_API_KEY;
if (!apiKey) {
  throw new Error('DEBUGFAST_API_KEY must be set in the environment.');
}

DebugFast.init({
  apiKey,
  apiEndpoint: 'https://ingestion.debugfa.st/v1/events',
  captureScreenshot: true,
  captureConsole: true,
  captureNetwork: true,
  captureDom: true,
  captureUserActions: true,
  debug: true,
  beforeSend: (report) => {
    console.log('DebugFast Report:', report);
    return report;
  },
});

// Demo store: attached to every report via the state capture API
const settings = reactive({ theme: 'dark', locale: 'fr', apiKey: 'demo-secret' });
DebugFast.registerStore('settings', () => settings, 'custom');

// Set user info
DebugFast.setUser({
  id: 'vue-test-user-123',
  email: 'vue-test@example.com',
  name: 'Vue Test User',
});

const app = createApp(App);

// Install the DebugFast Vue plugin
app.use(debugfastPlugin, {
  captureComponentInfo: true,
});

app.mount('#app');
