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
                        entidad = new Area(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetInt32(3));                        
                        listEntidad.Add(entidad);
                    }
                }
                reader.Close();
                connection.Close();
            }
            return listEntidad;
        }

        public Area_Result Managment_Area(Area _area,int Action)
        {
            Area_Result resu = new Area_Result();
            using (SqlConnection connection = new SqlConnection(cadena))
            {

                try
                {
                    String id="";
                    connection.Open();
                    SqlCommand command = new SqlCommand("VR_Managment_Area", connection);
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add("@AreaId", SqlDbType.Int).Value = _area.AreaId;
                    command.Parameters.Add("@are_Nombre", SqlDbType.VarChar).Value = _area.are_Nombre;
                    command.Parameters.Add("@are_Descripcion", SqlDbType.VarChar).Value = _area.are_Descripcion;
                    command.Parameters.Add("@are_Estado", SqlDbType.Int).Value = _area.are_Estado;
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
                    resu.Message = id ;
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