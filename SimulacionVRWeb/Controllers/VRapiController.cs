using SimulacionVRWeb.Models.Bussines;
using SimulacionVRWeb.Models.Entities;
using SimulacionVRWeb.Models.Persistent;
using System;
using System.Collections.Generic;
using System.Data;
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
        public HttpResponseMessage Login(String UserName, String Password)
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
            List<ProgramaApi> _list = bTR.list_ProgramaApi(TrabajadorId);
            return Request.CreateResponse(HttpStatusCode.OK, _list);

        }

        [HttpGet]
        [Route("api/v1.0/VR/Get_Report_Sesiones")]
        public HttpResponseMessage Get_Report_Sesiones(int TrabajadorId)
        {
            try
            {
                DataSet data = new DataSet();
                DataSet dataNew = new DataSet();
                B_Resultado bTR = new B_Resultado();
                data = bTR.list_ResultsaApi(TrabajadorId);
                dataNew.DataSetName = "data";
                List<temp> _list = Get_Sumulaciones(data);
                foreach (temp item in _list)
                {
                    DataTable table = new DataTable();
                    table.Columns.Add("Aciertos");
                    table.Columns.Add("Fallos");
                    table.Columns.Add("Concentracion");
                    table.Columns.Add("Nombre");
                    string aciertos = data.Tables[0].Compute("Sum(R_Aciertos)", "SimulacionId=" + item.SimulacionId + "").ToString(); ;
                    string fallos = data.Tables[0].Compute("Sum(R_Fallos)", "SimulacionId=" + item.SimulacionId + "").ToString();
                    string concen = data.Tables[0].Compute("Sum(R_NivelConcentracion)", "SimulacionId=" + item.SimulacionId + "").ToString();

                    object[] dato = { aciertos, fallos, concen, item.SimulacionName };
                    table.Rows.Add(dato);
                    table.TableName = item.SimulacionName;
                    dataNew.Tables.Add(table);

                }
                return Request.CreateResponse(HttpStatusCode.OK, dataNew);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }



        }

        [HttpPost]
        [Route("api/v1.0/VR/Get_Insert_Result")]
        public HttpResponseMessage Get_Insert_Result([FromBody] Resultado data)
        {
            P_Resultado res = new P_Resultado();
            String resp = res.InsertResultado(data);
            //TrabajadorApi tr = bTR.LoginApi(UserName, Password);
            return Request.CreateResponse(HttpStatusCode.OK, resp);

        }

        private List<temp> Get_Sumulaciones(DataSet data)
        {
            List<temp> _list = new List<temp>();
            int count = 0;
            if (data.Tables.Count > 0)
            {
                foreach (DataRow item in data.Tables[0].Rows)
                {
                    if (IsCorrect(Convert.ToInt32(item.ItemArray[8])) && count < 3)
                    {
                        int tempID = Convert.ToInt32(item.ItemArray[8]);
                        _list.Add(new temp(tempID, item.ItemArray[7].ToString()));
                        count++;
                    }
                }
            }
            bool IsCorrect(int id)
            {
                bool s = true;
                foreach (temp item in _list)
                {
                    if (item.SimulacionId == id)
                    {
                        s = false;
                    }
                }
                return s;
            }
            return _list;
        }


        //reporte de participantes por sesion
        [HttpGet]
        [Route("api/v1.0/VR/Get_Report_Sesiones_Values")]
        public HttpResponseMessage Get_Report_Sesiones_Values(int TrabajadorId)
        {
            try
            {
                DataSet data = new DataSet();
                DataSet dataNew = new DataSet();
                B_Resultado bTR = new B_Resultado();
                data = bTR.list_ResultsaApi(TrabajadorId);
                dataNew.DataSetName = "data";

                foreach (DataRow item in data.Tables[0].Rows)
                {
                    DataTable table = new DataTable();
                    table.Columns.Add("Aciertos");
                    table.Columns.Add("Fallos");
                    table.Columns.Add("Duracion");
                    table.Columns.Add("Nombre");

                    object[] dato = { item.ItemArray[1].ToString(), item.ItemArray[3].ToString(), item.ItemArray[2].ToString(), item.ItemArray[7].ToString() };
                    table.Rows.Add(dato);
                    table.TableName = item.ItemArray[7].ToString() + "-" + (item.ItemArray[6].ToString().Substring(0, 10));
                    dataNew.Tables.Add(table);
                }
                return Request.CreateResponse(HttpStatusCode.OK, dataNew);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }
    }

    class temp
    {
        public int SimulacionId { get; set; }
        public String SimulacionName { get; set; }

        public temp(int simulacionId, string simulacionName)
        {
            SimulacionId = simulacionId;
            SimulacionName = simulacionName;
        }
    }

}