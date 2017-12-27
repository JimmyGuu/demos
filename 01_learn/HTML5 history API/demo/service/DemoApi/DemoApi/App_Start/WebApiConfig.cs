using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace DemoApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            var allowedMethods = ConfigurationManager.AppSettings["cors: allowedMethods"];
            var allowedOrigin = ConfigurationManager.AppSettings["cors: allowedOrigin"];
            var allowedHeaders = ConfigurationManager.AppSettings["cors: allowedHeaders"];
            var geduCors = new EnableCorsAttribute(allowedMethods, allowedOrigin, allowedHeaders);

            config.EnableCors(geduCors);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
