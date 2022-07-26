using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace FrontWebApp
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
            //routes.MapRoute(
            //    name: "Students",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Students", action = "Index", id = UrlParameter.Optional }
            //);
            //routes.MapRoute(
            //    name: "Teachers",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Teachers", action = "Index", id = UrlParameter.Optional }
            //);
            //routes.MapRoute(
            //    name: "Modules",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Modules", action = "Index", id = UrlParameter.Optional }
            //);
        }
    }
}
