using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Persistent
{
    public class P_Participante : Connection
    {

        public List<Participante> list_participante(Participante _Participante)
        {
            List<Participante> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Get_Participante", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@ProgramaId", SqlDbType.Int).Value = _Participante.ProgramaId;

                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Participante entidad = null;
                    listEntidad = new List<Participante>();
                    while (reader.Read())
                    {
                        entidad = new Participante(reader.GetInt32(0), reader.GetInt32(1), reader.GetInt32(2), reader.GetString(3), reader.GetString(4), reader.GetString(5));
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }
        public Participante_Result Managment_Participante(Participante _Participante, int Action)
        {
            Participante_Result resu = new Participante_Result();
            using (SqlConnection connection = new SqlConnection(cadena))
            {

                try
                {
                    String id = "";
                    connection.Open();
                    SqlCommand command = new SqlCommand("VR_Managment_Participante", connection);
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add("@ParticipanteId", SqlDbType.Int).Value = _Participante.ParticipanteId;
                    command.Parameters.Add("@TrabajadorId", SqlDbType.Int).Value = _Participante.TrabajadorId;
                    command.Parameters.Add("@ProgramaId", SqlDbType.Int).Value = _Participante.@ProgramaId;
                    command.Parameters.Add("@Estado", SqlDbType.Int).Value = _Participante.@Estado;
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
        public List<Rpt_Participante_Aciertos_Fallos> report_participante_aciertoss_fallos()
        {
            List<Rpt_Participante_Aciertos_Fallos> listEntidad = new List<Rpt_Participante_Aciertos_Fallos>();
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Report_Participante_Result", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Rpt_Participante_Aciertos_Fallos entidad = null;
                    listEntidad = new List<Rpt_Participante_Aciertos_Fallos>();
                    while (reader.Read())
                    {
                        entidad = new Rpt_Participante_Aciertos_Fallos(reader.GetString(0), reader.GetInt32(3), reader.GetInt32(4));

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