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
        public Programa_Result Managment_Programa(Programa _Programa, int Action)
        {
            Programa_Result resu = new Programa_Result();
            using (SqlConnection connection = new SqlConnection(cadena))
            {

                try
                {
                    String id = "";
                    connection.Open();
                    SqlCommand command = new SqlCommand("VR_Managment_Programa", connection);
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add("@ProgramaId", SqlDbType.Int).Value = _Programa.ProgramaId;
                    command.Parameters.Add("@TrabajadorRolId", SqlDbType.Int).Value = _Programa.TrabajadorRolId;
                    command.Parameters.Add("@pr_Descripcion", SqlDbType.VarChar).Value = _Programa.pr_Descripcion;
                    command.Parameters.Add("@SimulacionId", SqlDbType.Int).Value = _Programa.SimulacionId;
                    command.Parameters.Add("@LocalId", SqlDbType.Int).Value = _Programa.LocalId;
                    command.Parameters.Add("@FechaPrograma", SqlDbType.Date).Value = _Programa.FechaPrograma;
                    command.Parameters.Add("@HoraInicio", SqlDbType.Time).Value = _Programa.HoraInicio;
                    command.Parameters.Add("@HoraFin", SqlDbType.Time).Value = _Programa.HoraInicio;
                    command.Parameters.Add("@Estado", SqlDbType.Int).Value = _Programa.Estado;
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
    }


}