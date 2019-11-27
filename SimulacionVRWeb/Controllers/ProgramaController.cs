using SimulacionVRWeb.Models.Bussines;
using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace SimulacionVRWeb.Controllers
{
    public class ProgramaController : Controller
    {
        // GET: Programa
        public ActionResult Programa()
        {
            return View();
        }
        public String list_programa(Programa_S_C _Programa)
        {
            B_Programa b_Programa = new B_Programa();
            List<Programa> _list = b_Programa.list_programa(new Programa(_Programa.FechaInicio, _Programa.FechaFin));
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(_list);
            return json;
        }
        public String Managment_Programa(Programa_S _Programa)
        {
            B_Programa b_Programa = new B_Programa();
            Programa_Result a = b_Programa.Managment_Programa(new Programa(_Programa.ProgramaId, _Programa.TrabajadorRolId, _Programa.pr_Descripcion, _Programa.SimulacionId, _Programa.LocalId, _Programa.FechaPrograma, _Programa.HoraInicio, _Programa.HoraFin, _Programa.Estado), _Programa.Action);
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(a);
            return json;
        }
        public String report_programa_cantidad_participante()
        {
            B_Programa b_Programa = new B_Programa();
            List<Programa_Report_Cantidad_Participantes> _list = b_Programa.report_programa_cantidad_participantes();
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(_list);
            return json;
        }
    }
}