using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace SimulacionVRWeb
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

           

            routes.MapRoute(
                name: "login",
                url: "login",
                defaults: new {controller = "Home", action = "Login"}
             );
            routes.MapRoute(
            name: "local",
            url: "local",
            defaults: new { controller = "Local", action = "Local" }
        );

        routes.MapRoute(
            name: "rol",
            url: "rol",
            defaults: new { controller = "AsignacionRol", action = "Rol" }
        );

        routes.MapRoute(
            name: "area",
            url: "area",
            defaults: new { controller = "Area", action = "Area" }
        );

        routes.MapRoute(
            name: "programa",
            url: "programa",
            defaults: new { controller = "Programa", action = "Programa" }
        );

        routes.MapRoute(
            name: "trabajador",
            url: "trabajador",
            defaults: new { controller = "Trabajador", action = "Trabajador" }
        );

        routes.MapRoute(
            name: "asignacionrol",
            url: "asignacionrol",
            defaults: new { controller = "AsignacionRol", action = "AsignacionRol" }
        );

        routes.MapRoute(
            name: "principal",
            url: "principal",
            defaults: new { controller = "Home", action = "Home" }
        );

        routes.MapRoute(
            name: "simulacion",
            url: "simulacion",
            defaults: new { controller = "Simulacion", action = "Simulacion" }
        );

        routes.MapRoute(
            name: "tiposimulacion",
            url: "tiposimulacion",
            defaults: new { controller = "Simulacion", action = "TipoSimulacion" }
        );

        routes.MapRoute(
            name: "",
            url: "",
            defaults: new { controller = "Home", action = "Login" }
        );
            routes.MapRoute(
               name: "Default",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "Home", action = "Login", id = UrlParameter.Optional }
           );
        }
    }
}
