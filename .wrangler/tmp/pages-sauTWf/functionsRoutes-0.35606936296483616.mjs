import { onRequestPost as __api_login_ts_onRequestPost } from "C:\\Users\\jammer\\Desktop\\jdks\\functions\\api\\login.ts"
import { onRequestPost as __api_publish_ts_onRequestPost } from "C:\\Users\\jammer\\Desktop\\jdks\\functions\\api\\publish.ts"
import { onRequestPost as __api_upload_ts_onRequestPost } from "C:\\Users\\jammer\\Desktop\\jdks\\functions\\api\\upload.ts"

export const routes = [
    {
      routePath: "/api/login",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_login_ts_onRequestPost],
    },
  {
      routePath: "/api/publish",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_publish_ts_onRequestPost],
    },
  {
      routePath: "/api/upload",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_upload_ts_onRequestPost],
    },
  ]