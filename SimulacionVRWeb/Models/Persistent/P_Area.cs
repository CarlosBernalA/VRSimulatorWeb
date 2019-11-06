using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Persistent
{
    public class P_Area: Connection
    {
        //CONSULTA LISTAR AREAS
        public List<Area> list_area()
        {
            List<Area> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Get_Area", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    Area entidad = null;
                    listEntidad = new List<Area>();
                    while (reader.Read())
                    {
                        entidad = new Area(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetInt32(0));                        
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