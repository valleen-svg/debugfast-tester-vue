/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEBUGFAST_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
