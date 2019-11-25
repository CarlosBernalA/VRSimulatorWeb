using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Persistent
{
    public class P_Participante: Connection
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
                        entidad = new Participante(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3));
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