﻿using SimulacionVRWeb.Models.Entities;
using SimulacionVRWeb.Models.Persistent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SimulacionVRWeb.Models.Bussines
{
    public class B_Participante
    {

        public List<Participante> list_participante(Participante _Participante)
        {
            List<Participante> listEntidad = null;
            P_Participante dao = new P_Participante();
            listEntidad = dao.list_participante(_Participante);
            return listEntidad;
        }
    }
}