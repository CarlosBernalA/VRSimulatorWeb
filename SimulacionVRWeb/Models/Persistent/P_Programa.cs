using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Persistent
{
    public class P_Programa : Connection
    {
        public List<ProgramaApi> list_ProgramaApi(int TrabajadorID)
        {
            List<ProgramaApi> listEntidad = new List<ProgramaApi>();
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Get_Program_by_participante", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@TrabajadorId", SqlDbType.Int).Value = TrabajadorID;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    ProgramaApi entidad = null;
                    listEntidad = new List<ProgramaApi>();
                    while (reader.Read())
                    {
                        entidad = new ProgramaApi(reader.GetInt32(0), reader.GetString(1), reader.GetInt32(2), reader.GetValue(3).ToString(), reader.GetValue(4).ToString(), reader.GetValue(5).ToString(), reader.GetString(6), reader.GetValue(7).ToString(), reader.GetValue(8).ToString(), reader.GetString(9),reader.GetInt32(10));
                       
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

        public List<Programa> list_programa(Programa _Programa)
        {
            List<Programa> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Get_Programa", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@FechaInicio", SqlDbType.Date).Value = _Programa.FechaInicio;
                command.Parameters.Add("@FechaFin", SqlDbType.Date).Value = _Programa.FechaFin;

                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Programa entidad = null;
                    listEntidad = new List<Programa>();
                    while (reader.Read())
                    {
                        entidad = new Programa(reader.GetInt32(0), reader.GetString(1), Convert.ToString(reader.GetDateTime(2)), Convert.ToString(reader.GetTimeSpan(3)), Convert.ToString(reader.GetTimeSpan(4)), reader.GetString(5), reader.GetString(6), reader.GetInt32(7), reader.GetInt32(8));
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