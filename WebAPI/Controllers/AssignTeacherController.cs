using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;
using System.Data.SqlTypes;

namespace WebAPI.Controllers
    //Assigning Teachers to Moduls 
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignTeacherController : ControllerBase
    {
        public SqlCommand cmd = new SqlCommand();
        private readonly IConfiguration _configuration;
        public AssignTeacherController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost]
        [Route("AddModule")]
        public JsonResult Post(AssignTeacher teacher_mod)
        {
            try
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "sp_TeacherModule";
                SqlParameter paramTeacherId = new SqlParameter("@TeacherId", teacher_mod.TeacherId);
                SqlParameter paramModuleId = new SqlParameter("@ModuleId", teacher_mod.ModuleId);
                cmd.Parameters.Add(paramTeacherId);
                cmd.Parameters.Add(paramModuleId);
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("SchoolAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    using (cmd)
                    {
                        myReader = cmd.ExecuteReader();
                        table.Load(myReader); ;

                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult("Added Successfully");
            }
            catch (DBConcurrencyException dbe)
            {
                Console.Write(dbe.Message);
                return new JsonResult("Error Adding Module");
            }
        }
        [HttpDelete]
        [Route("DeleteAssignment")]
        public JsonResult Delete(AssignTeacher teacher_mod)
        {
            try
            {
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = "DELETE FROM Teacher_Modules WHERE TeacherId = '" + teacher_mod.TeacherId + "'AND ModuleId ='" + teacher_mod.ModuleId + "'";
                SqlParameter paramStudentId = new SqlParameter("@StudentId", teacher_mod.TeacherId);
                SqlParameter paramModuleId = new SqlParameter("@ModuleId", teacher_mod.ModuleId);
                cmd.Parameters.Add(paramStudentId);
                cmd.Parameters.Add(paramModuleId);
                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("SchoolAppCon");
                SqlDataReader myReader;
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    cmd.Connection = myCon;
                    using (cmd)
                    {
                        myReader = cmd.ExecuteReader();
                        table.Load(myReader); ;

                        myReader.Close();
                        myCon.Close();
                    }
                }

                return new JsonResult("Deleted Successfully");
            }
            catch (DBConcurrencyException dbe)
            {
                Console.Write(dbe.Message);
                return new JsonResult("Error Deleting Module");
            }
        }
    }
}
