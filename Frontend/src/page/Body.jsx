import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HostedZone } from "./HostedZone";
import  Login  from "./signIn";
import { Record } from "./DNSRecord";

export const Body = () => {
    const appRouter = createBrowserRouter([
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/Dashboard",
        element: <HostedZone />,
      },
      {
        path: "/Record/:Id/:name",
        element:<Record/> ,
      },
    ]);

    return (
      <div>
        <RouterProvider router={appRouter} />
      </div>
    );

}