using SimulacionVRWeb.Models.Bussines;
using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SimulacionVRWeb.Controllers
{
    public class VRapiController : ApiController
    {
        [HttpGet]
        [Route("api/v1.0/VR/Login")]
        public HttpResponseMessage Login(String UserName,String Password)
        {
            B_Trabajador bTR = new B_Trabajador();
            TrabajadorApi tr = bTR.LoginApi(UserName, Password);
            return Request.CreateResponse(HttpStatusCode.OK, tr);
        }

        [HttpGet]
        [Route("api/v1.0/VR/Get_Program")]
        public HttpResponseMessage Get_Program(int TrabajadorId)
        {
            B_Programa bTR = new B_Programa();
            List<ProgramaApi> _list= bTR.list_ProgramaApi(TrabajadorId);
            return Request.CreateResponse(HttpStatusCode.OK, _list);
            
        }

        [HttpGet]
        [Route("api/v1.0/VR/Get_Report_Sesiones")]
        public HttpResponseMessage Get_Report_Sesiones(int TrabajadorId)
        {
            B_Resultado bTR = new B_Resultado();
            List<ResultReport> _list = bTR.list_ResultsaApi(TrabajadorId);
            return Request.CreateResponse(HttpStatusCode.OK, _list);
            
        }        

        [HttpPost]
        [Route("api/v1.0/VR/Get_Insert_Result")]
        public HttpResponseMessage Get_Insert_Result([FromBody] Resultado data)
        {
            B_Trabajador bTR = new B_Trabajador();
            //TrabajadorApi tr = bTR.LoginApi(UserName, Password);
            //return Request.CreateResponse(HttpStatusCode.OK, tr);
            return null;
        }        
    }
}