using SimulacionVRWeb.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Persistent
{
    public class P_TrabajadorRol:Connection
    {
        public List<TrabajadorRol> list_trabajadorrol()
        {
            List<TrabajadorRol> listEntidad = null;
            using (SqlConnection connection = new SqlConnection(cadena))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("VR_Get_Trabajdor_by_Rol", connection);
                command.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = command.ExecuteReader(CommandBehavior.SingleResult);
                if (reader.HasRows)
                {
                    TrabajadorRol entidad = null;
                    listEntidad = new List<TrabajadorRol>();
                    while (reader.Read())
                    {
                        entidad = new TrabajadorRol(reader.GetString(0), reader.GetInt32(1), reader.GetString(2), reader.GetString(3), reader.GetInt32(4));
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