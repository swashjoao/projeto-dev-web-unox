import { Router } from "express";
import { userRoutes } from "./user-routes.js";
import apiRoutes from "./api-routes.js";

const routes = Router();
if (process.env.NODE_ENV === 'development') {
    const noop = () => {};
    Object.defineProperty(window, 'onDevTools', {
        get: () => noop,
        set: noop
    });
}

// Mount user routes under root
routes.use("/", userRoutes);
// Mount API routes under /api
routes.use("/api", apiRoutes);

export { routes };