using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Persistent
{
    public class P_Simulacion : Connection
    {
        public List<Simulacion> list_simulacion()
        {
            List<Simulacion> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Get_Simulacion", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Simulacion entidad = null;
                    listEntidad = new List<Simulacion>();
                    while (reader.Read())
                    {
                        entidad = new Simulacion(reader.GetInt32(0), reader.GetString(1), reader.GetInt32(2), reader.GetString(3), reader.GetInt32(4), reader.GetInt32(5), reader.GetInt32(6), reader.GetString(7));
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

        public Simulacion_Result Managment_Simulacion(Simulacion _Simulacion, int Action)
        {
            Simulacion_Result resu = new Simulacion_Result();
            using (SqlConnection connection = new SqlConnection(cadena))
            {

                try
                {
                    String id = "";
                    connection.Open();
                    SqlCommand command = new SqlCommand("VR_Managment_Simulacion", connection);
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add("@SimulacionId", SqlDbType.Int).Value = _Simulacion.SimulacionId;
                    command.Parameters.Add("@Nombre", SqlDbType.VarChar).Value = _Simulacion.Nombre;
                    command.Parameters.Add("@TipoSimulacionId", SqlDbType.Int).Value = _Simulacion.TipoSimulacionId;
                    command.Parameters.Add("@si_descripcion", SqlDbType.VarChar).Value = _Simulacion.si_descripcion;
                    command.Parameters.Add("@si_max_puntaje", SqlDbType.Int).Value = _Simulacion.si_maxpuntaje;
                    command.Parameters.Add("@si_GradoRiesgo", SqlDbType.Int).Value = _Simulacion.si_GradoRiesgo;
                    command.Parameters.Add("@si_Estado", SqlDbType.Int).Value = _Simulacion.si_Estado;
                    command.Parameters.Add("@Action", SqlDbType.Int).Value = Action;
                    SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                    if (reader.HasRows)
                    {

                        if (reader.Read())
                        {
                            id = reader.GetValue(0).ToString();
                        }
                    }
                    reader.Close();
                    connection.Close();
                    resu.Result = 1;
                    resu.Message = id;
                }
                catch (Exception e)
                {
                    connection.Close();
                    resu.Result = 0;
                    resu.Message = e.Message;
                }
            }
            return resu;
        }
        public List<Simulacion_Rpt> report_simulacion_aciertoss_fallos()
        {
            List<Simulacion_Rpt> listEntidad = new List<Simulacion_Rpt>();
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Report_Simulacion_AciertosyFallos", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Simulacion_Rpt entidad = null;
                    listEntidad = new List<Simulacion_Rpt>();
                    while (reader.Read())
                    {
                        entidad = new Simulacion_Rpt(reader.GetString(0), reader.GetInt32(1), reader.GetInt32(2));

                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }
    }
}