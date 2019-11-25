using SimulacionVRWeb.Models.Bussines;
using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static SimulacionVRWeb.Models.Entities.Trabajador;

namespace SimulacionVRWeb.Controllers
{
    public class TrabajadorController : Controller
    {
        // GET: Trabajador
        public ActionResult Trabajador()
        {
            return View();
        }
        public String list_trabajador()
        {
            B_Trabajador b_Trabajador = new B_Trabajador();
            List<Trabajador> _list = b_Trabajador.list_trabajador();
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(_list);
            return json;
        }
        public String Managment_Trabajador(Trabajador_S _Trabajador)
        {
            B_Trabajador b_Trabajador = new B_Trabajador();
            Trabajador_Result a = b_Trabajador.Managment_Trabajador(new Trabajador(_Trabajador.TrabajadorId, _Trabajador.tr_DNI, _Trabajador.tr_Nombre, _Trabajador.tr_Apellidos, _Trabajador.are_Nombre, _Trabajador.AreaId, _Trabajador.tr_InicioTrabajo, _Trabajador.tr_Sexo, _Trabajador.tr_FechaNacimiento, _Trabajador.tr_Direccion, _Trabajador.UserName, _Trabajador.Password, _Trabajador.tr_Estado), _Trabajador.Action);
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(a);
            return json;
        }
        public String login(Trabajador_S_login _Trabajador)
        {
            B_Trabajador b_Trabajador = new B_Trabajador();
            Trabajador_Result a = b_Trabajador.login(new Trabajador(_Trabajador.UserName, _Trabajador.Password));
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(a);
            return json;
        }
        public String list_participante(Participante_S _Participante)
        {
            B_Participante b_Participante = new B_Participante();
            List<Participante> _list = b_Participante.list_participante(new Participante(_Participante.ProgramaId));
            var jsonSerialiser = new JavaScriptSerializer();
            var json = jsonSerialiser.Serialize(_list);
            return json;
        }
    }
}